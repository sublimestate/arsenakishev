import { NextRequest, NextResponse } from "next/server";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export const maxDuration = 30;

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
      signal: AbortSignal.timeout(8000),
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
      signal: AbortSignal.timeout(8000),
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
      { signal: AbortSignal.timeout(6000) }
    );
    if (!availRes.ok) return null;
    const data = await availRes.json();
    const snapshotUrl = data?.archived_snapshots?.closest?.url;
    if (!snapshotUrl) return null;

    const snapRes = await fetch(snapshotUrl, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
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

type Source = "direct" | "google-referrer" | "googlebot" | "wayback";

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

  // Run all fetch strategies in parallel — stays well within Vercel's timeout
  const [directRes, googleRefRes, googlebotRes, waybackRes] = await Promise.all([
    fetchWithHeaders(parsedUrl.href, {}),
    fetchWithHeaders(parsedUrl.href, { "Referer": "https://www.google.com/" }),
    fetchGooglebot(parsedUrl.href),
    fetchWayback(parsedUrl.href),
  ]);

  const candidates: Array<{ fetched: { html: string; finalUrl: string }; source: Source }> = [
    { fetched: directRes!, source: "direct" },
    { fetched: googleRefRes!, source: "google-referrer" },
    { fetched: googlebotRes!, source: "googlebot" },
    { fetched: waybackRes!, source: "wayback" },
  ].filter((c) => c.fetched != null) as Array<{ fetched: { html: string; finalUrl: string }; source: Source }>;

  let best: { article: ReturnType<Readability["parse"]>; source: Source; wc: number } | null = null;

  for (const { fetched, source } of candidates) {
    const article = extractArticle(fetched.html, fetched.finalUrl);
    const wc = article?.textContent ? wordCount(article.textContent) : 0;
    if (article && wc > (best?.wc ?? 0)) {
      best = { article, source, wc };
    }
  }

  if (!best || !best.article) {
    return NextResponse.json(
      { error: "Could not extract article content from the provided URL." },
      { status: 422 }
    );
  }

  if (best.wc < 200) {
    return NextResponse.json(
      { error: "Article content is too short or could not be extracted properly." },
      { status: 422 }
    );
  }

  return NextResponse.json({
    title: best.article.title ?? null,
    byline: best.article.byline ?? null,
    content: best.article.content ?? null,
    excerpt: best.article.excerpt ?? null,
    siteName: best.article.siteName ?? null,
    source: best.source,
  });
}
