import { NextRequest, NextResponse } from "next/server";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function fetchWithHeaders(
  url: string,
  extraHeaders: Record<string, string>
): Promise<{ html: string; finalUrl: string } | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, ...extraHeaders },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    return { html, finalUrl: res.url };
  } catch {
    return null;
  }
}

async function fetchGooglebot(url: string): Promise<{ html: string; finalUrl: string } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": GOOGLEBOT_UA,
        "Referer": "https://www.google.com/",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    return { html, finalUrl: res.url };
  } catch {
    return null;
  }
}

async function fetchWayback(url: string): Promise<{ html: string; finalUrl: string } | null> {
  try {
    const availRes = await fetch(
      `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!availRes.ok) return null;
    const data = await availRes.json();
    const snapshotUrl = data?.archived_snapshots?.closest?.url;
    if (!snapshotUrl) return null;

    const snapRes = await fetch(snapshotUrl, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (!snapRes.ok) return null;
    const html = await snapRes.text();
    return { html, finalUrl: snapshotUrl };
  } catch {
    return null;
  }
}

function extractArticle(html: string, url: string) {
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  return reader.parse();
}

export async function POST(req: NextRequest) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url field" }, { status: 400 });
  }

  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  let source: "direct" | "google-referrer" | "googlebot" | "wayback" = "direct";
  let article = null;
  let bestWordCount = 0;

  // 1. Try direct fetch
  const direct = await fetchWithHeaders(parsedUrl.href, {});
  if (direct) {
    article = extractArticle(direct.html, direct.finalUrl);
    bestWordCount = article?.textContent ? wordCount(article.textContent) : 0;
  }

  // 2. Try with Google referrer ("first click free") if content is thin
  if (bestWordCount < 200) {
    const googleRef = await fetchWithHeaders(parsedUrl.href, { "Referer": "https://www.google.com/" });
    if (googleRef) {
      const a = extractArticle(googleRef.html, googleRef.finalUrl);
      const wc = a?.textContent ? wordCount(a.textContent) : 0;
      if (a && wc > bestWordCount) {
        article = a;
        source = "google-referrer";
        bestWordCount = wc;
      }
    }
  }

  // 3. Try as Googlebot (publishers allow crawlers to index full content)
  if (bestWordCount < 200) {
    const googlebot = await fetchGooglebot(parsedUrl.href);
    if (googlebot) {
      const a = extractArticle(googlebot.html, googlebot.finalUrl);
      const wc = a?.textContent ? wordCount(a.textContent) : 0;
      if (a && wc > bestWordCount) {
        article = a;
        source = "googlebot";
        bestWordCount = wc;
      }
    }
  }

  // 4. Fallback to Wayback Machine if still thin
  if (bestWordCount < 200) {
    const wayback = await fetchWayback(parsedUrl.href);
    if (wayback) {
      const a = extractArticle(wayback.html, wayback.finalUrl);
      const wc = a?.textContent ? wordCount(a.textContent) : 0;
      if (a && wc > bestWordCount) {
        article = a;
        source = "wayback";
        bestWordCount = wc;
      }
    }
  }

  if (!article) {
    return NextResponse.json(
      { error: "Could not extract article content from the provided URL." },
      { status: 422 }
    );
  }

  const wc = wordCount(article.textContent ?? "");
  if (wc < 200) {
    return NextResponse.json(
      { error: "Article content is too short or could not be extracted properly." },
      { status: 422 }
    );
  }

  return NextResponse.json({
    title: article.title ?? null,
    byline: article.byline ?? null,
    content: article.content ?? null,
    excerpt: article.excerpt ?? null,
    siteName: article.siteName ?? null,
    source,
  });
}
