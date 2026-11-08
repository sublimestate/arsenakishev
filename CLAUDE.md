# CLAUDE.md

## Project Overview

Personal portfolio and blog for Arsen Akishev. Built with Next.js 15 App Router, deployed on Vercel.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint (currently broken — Next.js 15 deprecated `next lint`)
```

## Architecture

**Route groups:**
- `app/(site)/` — Main site layout with nav + footer (Home, Writing, Experience, Projects, About)
- `app/(reader)/` — Standalone article reader layout (no nav/footer)
- `app/api/fetch-article/` — Server-side API route that fetches and parses article content via Readability + jsdom

**Key files:**
- `data/profile.js` — Single source of truth for all content (articles, experience, projects, contact links, etc.)
- `styles/app.css` — All styles; no CSS modules or Tailwind
- `components/NavBar.tsx` — Active-link detection via `usePathname`; hamburger menu on mobile (<720px)
- `components/Skeleton.tsx` — Reusable shimmer skeleton components (`SkeletonLine`, `SkeletonCard`)
- `components/WorldMap.tsx` — Interactive SVG map using `react-simple-maps`
- `app/not-found.tsx` — Custom 404 page (renders its own site shell since root layout has no nav/footer)
- `app/(site)/*/loading.tsx` — Route-specific shimmer loading skeletons (Next.js Suspense convention)

## Content Updates

All site content lives in `data/profile.js`. To update:
- **Articles** — add to `articles` array with `id`, `title`, `date`, `summary`, `content`
- **Experience** — add to `experiences` or `earlierRoles`
- **Projects** — add to `projects` array with `name`, `description`, `stack`, `href`
- **Resume** — replace `public/resume.pdf`

## Styling Conventions

- Plain CSS classes in `styles/app.css` — no utility classes, no CSS modules
- Dark theme using CSS custom properties (`--text`, `--text-strong`, `--muted`, `--accent`, `--surface`)
- Glassmorphism cards: `background: rgba(10, 12, 28, 0.85)` + `border: 1px solid rgba(255,255,255,0.08)` + `backdrop-filter: blur` (desktop only — disabled on mobile, see Mobile Performance)
- Pill buttons use `.btn.ghost`; muted nav links use `.nav-link`

## Mobile Performance

- **No `backdrop-filter` on mobile** — causes scroll jank on Safari. All `backdrop-filter` rules must be disabled inside `@media (max-width: 720px)`.
- **No `filter: blur()` on mobile** — the `.glow` elements are hidden on mobile (`display: none`) for the same reason.
- **No CSS animations on mobile** — `.fade-up` entrance animations are disabled at ≤720px to prevent rendering stalls.

## Images

- Use `next/image` with `placeholder="blur"` and `blurDataURL` for all photos (see `about/page.tsx` for pattern)
- Generate blur data URIs via: `npm i -D sharp && node -e "sharp('public/img.jpg').resize(10,10).blur().jpeg({quality:30}).toBuffer().then(b => console.log('data:image/jpeg;base64,' + b.toString('base64')))"`

## Rules
- Never push to GitHub without explicit permission from the user.

## Deployment

Pushes to `main` auto-deploy via Vercel. `jsdom` and `@mozilla/readability` are listed as `serverExternalPackages` in `next.config.ts` to avoid bundling issues on the edge.
