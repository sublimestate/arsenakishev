# Site Improvements Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mobile hamburger nav, hero fade-in animations, custom 404 page, shimmer loading skeletons, and next/image blur placeholders.

**Architecture:** All changes are CSS + component-level. No new dependencies. Animations use CSS keyframes with `prefers-reduced-motion` support. Loading skeletons use Next.js `loading.tsx` convention. Mobile nav uses React `useState`.

**Tech Stack:** Next.js 15 App Router, React 19, plain CSS (`styles/app.css`), `next/image`

**Spec:** `docs/superpowers/specs/2026-03-17-site-improvements-design.md`

---

## Chunk 1: Mobile Hamburger Nav + Hero Animation

### Task 1: Add hamburger button and mobile menu toggle to NavBar

**Files:**
- Modify: `components/NavBar.tsx`
- Modify: `styles/app.css:42-82` (nav styles), `styles/app.css:879-917` (mobile media query)

- [ ] **Step 1: Add hamburger button and state to NavBar.tsx**

Replace the entire `components/NavBar.tsx` with:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/writing', label: 'Writing' },
  { path: '/projects', label: 'Projects' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [open])

  return (
    <header className="site-nav" ref={navRef}>
      <Link href="/" className="brand">
        Arsen Akishev
      </Link>
      <button
        className="hamburger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span className={`hamburger-bar${open ? ' open' : ''}`} />
        <span className={`hamburger-bar${open ? ' open' : ''}`} />
        <span className={`hamburger-bar${open ? ' open' : ''}`} />
      </button>
      <nav className={`nav-links${open ? ' open' : ''}`} aria-hidden={!open ? true : undefined}>
        {navLinks.map((link) => {
          const isActive =
            link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Add hamburger CSS and update mobile media query in app.css**

Add these styles after the `.nav-link.active` block (after line 82 in `styles/app.css`):

```css
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  flex-direction: column;
  gap: 4px;
  z-index: 101;
}

.hamburger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-strong);
  border-radius: 2px;
  transition: transform 250ms ease, opacity 250ms ease;
}

.hamburger-bar.open:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}

.hamburger-bar.open:nth-child(2) {
  opacity: 0;
}

.hamburger-bar.open:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

@media (prefers-reduced-motion: reduce) {
  .hamburger-bar {
    transition: none;
  }
}
```

Then replace the **second** `@media (max-width: 720px)` block (lines 886-917, the one starting with `.site { padding: ...}` — NOT the first one at lines 879-884 which handles `.article-header`) with:

```css
@media (max-width: 720px) {
  .site {
    padding: 3rem 1.5rem 2.5rem;
  }

  .hamburger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    margin-top: 0.75rem;
    background: rgba(10, 12, 28, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    backdrop-filter: blur(20px);
    z-index: 100;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    transition: max-height 300ms ease, opacity 200ms ease;
  }

  .nav-links.open {
    max-height: 400px;
    opacity: 1;
    pointer-events: auto;
  }

  .nav-links .nav-link {
    padding: 0.65rem 1rem;
    border-radius: 0.75rem;
    width: 100%;
  }

  .experience-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-card {
    padding: 2rem;
  }

  .language-list {
    padding-left: 0.9rem;
  }

  .about-details {
    grid-template-columns: 1fr;
  }

  .article-card,
  .experience-card {
    backdrop-filter: none;
  }
}
```

- [ ] **Step 3: Verify mobile nav works**

Run: `npm run dev`
Test: Resize browser below 720px. Confirm hamburger appears, links are hidden, clicking hamburger shows dropdown, clicking a link closes the menu, clicking outside closes it. Verify desktop nav is unchanged above 720px.

- [ ] **Step 4: Commit**

```bash
git add components/NavBar.tsx styles/app.css
git commit -m "feat: add mobile hamburger nav with dropdown menu"
```

---

### Task 2: Add hero fade-in animations

**Files:**
- Modify: `app/(site)/page.tsx`
- Modify: `styles/app.css`

- [ ] **Step 1: Add fade-up keyframes and classes to app.css**

Add before the `.hero` block (before line 103):

```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  opacity: 0;
  animation: fadeUp 0.6s ease-out forwards;
}

.fade-up-1 { animation-delay: 0.1s; }
.fade-up-2 { animation-delay: 0.3s; }
.fade-up-3 { animation-delay: 0.5s; }
.fade-up-4 { animation-delay: 0.7s; }

@media (prefers-reduced-motion: reduce) {
  .fade-up {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
```

- [ ] **Step 2: Add fade-up classes to hero elements in page.tsx**

In `app/(site)/page.tsx`, update the hero section elements:

```tsx
<header className="hero" id="home">
  <p className="eyebrow fade-up fade-up-1">Arsen Akishev · Backend Software Engineer</p>
  <h1 className="fade-up fade-up-2">Engineering backend platforms with AWS, Node.js, and PostgreSQL.</h1>
  <p className="lede fade-up fade-up-3">{summary}</p>
  <ul className="metric-grid fade-up fade-up-4">
```

Only these 4 elements change — the rest of `page.tsx` stays identical.

- [ ] **Step 3: Verify animation plays on page load**

Run: `npm run dev`
Test: Navigate to the home page. Confirm elements stagger in from bottom with a subtle fade. Verify no flash of unstyled content.

- [ ] **Step 4: Commit**

```bash
git add app/\(site\)/page.tsx styles/app.css
git commit -m "feat: add staggered fade-in animation to hero section"
```

---

## Chunk 2: Custom 404 Page

### Task 3: Create custom 404 page

**Files:**
- Create: `app/not-found.tsx`
- Modify: `styles/app.css`

- [ ] **Step 1: Add 404 page styles to app.css**

Add at the end of `styles/app.css` (before the media query block):

```css
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.not-found-code {
  font-size: clamp(4rem, 10vw, 6rem);
  font-weight: 700;
  line-height: 1;
  margin: 0;
  background: linear-gradient(135deg, var(--accent), #38bdf8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.not-found-page h2 {
  margin: 1rem 0 0.75rem;
  font-size: 1.5rem;
  color: var(--text-strong);
}

.not-found-page p {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 400px;
}
```

- [ ] **Step 2: Create app/not-found.tsx**

```tsx
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import { contactLinks } from '@/data/profile'

const socialLinks = contactLinks.filter((l) => l.label !== 'Email')

export default function NotFound() {
  return (
    <div className="site">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <NavBar />

      <main className="page-wrapper">
        <div className="not-found-page">
          <div>
            <p className="not-found-code">404</p>
            <h2>Page not found</h2>
            <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <Link href="/" className="btn ghost">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Arsen Akishev. Built with Next.js.</p>
        <div className="footer-links">
          <a href="mailto:arsenakishev@gmail.com">arsenakishev@gmail.com</a>
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 3: Verify 404 page renders**

Run: `npm run dev`
Test: Navigate to `http://localhost:3000/some-nonexistent-page`. Confirm the 404 page renders with gradient "404" text, nav bar, footer, and "Back to home" button works.

- [ ] **Step 4: Commit**

```bash
git add app/not-found.tsx styles/app.css
git commit -m "feat: add custom 404 page with glassmorphism design"
```

---

## Chunk 3: Shimmer Loading Skeletons

### Task 4: Add shimmer skeleton CSS and Skeleton component

**Files:**
- Create: `components/Skeleton.tsx`
- Modify: `styles/app.css`

- [ ] **Step 1: Add shimmer keyframes and skeleton styles to app.css**

Add at the end of `styles/app.css` (before the media query block):

```css
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.skel {
  border-radius: 0.5rem;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 75%
  );
  background-size: 400px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.skel-card {
  border-radius: 1.25rem;
  padding: 1.75rem;
  background: rgba(10, 12, 28, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .skel {
    animation: none;
    background: rgba(255, 255, 255, 0.06);
  }
}
```

- [ ] **Step 2: Create components/Skeleton.tsx**

```tsx
export function SkeletonLine({ width = '100%', height = '14px', style }: {
  width?: string
  height?: string
  style?: React.CSSProperties
}) {
  return <div className="skel" style={{ width, height, ...style }} />
}

export function SkeletonCard({ children, style }: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div className="skel-card" style={style}>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Skeleton.tsx styles/app.css
git commit -m "feat: add shimmer skeleton component and CSS"
```

---

### Task 5: Add loading.tsx files for all site routes

**Files:**
- Create: `app/(site)/loading.tsx`
- Create: `app/(site)/experience/loading.tsx`
- Create: `app/(site)/writing/loading.tsx`
- Create: `app/(site)/projects/loading.tsx`
- Create: `app/(site)/about/loading.tsx`

- [ ] **Step 1: Create app/(site)/loading.tsx (generic/home fallback)**

```tsx
import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="page">
      <header className="hero">
        <SkeletonLine width="280px" height="12px" style={{ marginBottom: '0.75rem' }} />
        <SkeletonLine width="80%" height="40px" style={{ marginBottom: '0.5rem' }} />
        <SkeletonLine width="60%" height="40px" style={{ marginBottom: '1.25rem' }} />
        <SkeletonLine width="90%" height="16px" style={{ marginBottom: '0.5rem' }} />
        <SkeletonLine width="70%" height="16px" style={{ marginBottom: '2rem' }} />
        <ul className="metric-grid">
          {[1, 2, 3].map((i) => (
            <li key={i} style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'rgba(12,15,32,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <SkeletonLine width="120px" height="24px" style={{ marginBottom: '0.35rem' }} />
              <SkeletonLine width="80px" height="14px" />
            </li>
          ))}
        </ul>
      </header>
    </div>
  )
}
```

- [ ] **Step 2: Create app/(site)/experience/loading.tsx**

```tsx
import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function ExperienceLoading() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <SkeletonLine width="120px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="70%" height="32px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="50%" height="16px" />
        </div>
        <div className="experience-list">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <SkeletonLine width="160px" height="20px" />
                <SkeletonLine width="100px" height="16px" />
              </div>
              <SkeletonLine width="200px" height="16px" style={{ marginBottom: '0.75rem' }} />
              <SkeletonLine width="100%" height="14px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonLine width="85%" height="14px" />
            </SkeletonCard>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Create app/(site)/writing/loading.tsx**

```tsx
import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function WritingLoading() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <SkeletonLine width="100px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="65%" height="32px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="55%" height="16px" />
        </div>
        <div className="article-list">
          {[1, 2].map((i) => (
            <SkeletonCard key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <SkeletonLine width="60%" height="20px" />
                <SkeletonLine width="120px" height="16px" />
              </div>
              <SkeletonLine width="100%" height="14px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonLine width="80%" height="14px" />
            </SkeletonCard>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Create app/(site)/projects/loading.tsx**

```tsx
import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function ProjectsLoading() {
  return (
    <div className="page">
      <section className="section projects">
        <div className="section-header">
          <SkeletonLine width="100px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="50%" height="32px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="55%" height="16px" />
        </div>
        <div className="project-grid">
          {[1, 2].map((i) => (
            <SkeletonCard key={i} style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <SkeletonLine width="140px" height="20px" style={{ marginBottom: '0.5rem' }} />
                <SkeletonLine width="100%" height="14px" style={{ marginBottom: '0.4rem' }} />
                <SkeletonLine width="75%" height="14px" />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[1, 2, 3].map((j) => (
                  <SkeletonLine key={j} width="70px" height="26px" style={{ borderRadius: '999px' }} />
                ))}
              </div>
            </SkeletonCard>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 5: Create app/(site)/about/loading.tsx**

```tsx
import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function AboutLoading() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="about-photo-wrapper">
          <div className="skel" style={{ width: '100%', height: '100%', minHeight: '300px' }} />
        </div>
        <div className="about-copy">
          <SkeletonLine width="100px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="80%" height="36px" style={{ marginBottom: '1rem' }} />
          <SkeletonLine width="140px" height="42px" style={{ borderRadius: '999px' }} />
        </div>
      </section>

      <section className="section about-details">
        <SkeletonCard>
          <SkeletonLine width="120px" height="24px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="200px" height="14px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonLine width="180px" height="14px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonLine width="140px" height="14px" />
        </SkeletonCard>
        <SkeletonCard>
          <SkeletonLine width="120px" height="24px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="240px" height="14px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonLine width="200px" height="14px" />
        </SkeletonCard>
      </section>
    </div>
  )
}
```

- [ ] **Step 6: Verify loading skeletons appear during navigation**

Run: `npm run dev`
Test: Navigate between pages using the nav. Use Chrome DevTools Network tab to throttle to "Slow 3G" to make skeletons visible longer. Confirm each page shows its skeleton shape briefly during route transitions.

- [ ] **Step 7: Commit**

```bash
git add app/\(site\)/loading.tsx app/\(site\)/experience/loading.tsx app/\(site\)/writing/loading.tsx app/\(site\)/projects/loading.tsx app/\(site\)/about/loading.tsx
git commit -m "feat: add shimmer loading skeletons for all site pages"
```

---

## Chunk 4: Image Optimization

### Task 6: Replace img tags with next/image and blur placeholders

**Files:**
- Modify: `app/(site)/about/page.tsx`

**Image dimensions (measured from files):**
- `arsen_photo.jpg`: 3024 × 4032
- `daisy_photo.jpg`: 2316 × 3088
- `barsik_photo.jpg`: 3024 × 4032

- [ ] **Step 1: Generate blur placeholder data URIs**

Install `sharp` as a dev dependency and generate blur placeholders:

```bash
npm install --save-dev sharp
```

Then run this script to generate base64 blur data URIs:

```bash
node -e "
const sharp = require('sharp');
const images = ['arsen_photo.jpg', 'daisy_photo.jpg', 'barsik_photo.jpg'];
(async () => {
  for (const img of images) {
    const buf = await sharp('public/' + img).resize(10, 10).blur().jpeg({ quality: 30 }).toBuffer();
    console.log(img + ': data:image/jpeg;base64,' + buf.toString('base64'));
  }
})();
"
```

Save each output string — you'll paste them into the code in Step 2. After generating, you can optionally uninstall sharp:

```bash
npm uninstall sharp
```

- [ ] **Step 2: Update about/page.tsx to use next/image**

Replace `app/(site)/about/page.tsx`:

```tsx
import Image from 'next/image'
import { languagesList, education } from '@/data/profile'
import WorldMap from '@/components/WorldMap'

const profileBlur = 'BLUR_DATA_URL_HERE'
const daisyBlur = 'BLUR_DATA_URL_HERE'
const barsikBlur = 'BLUR_DATA_URL_HERE'

export default function About() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="about-photo-wrapper">
          <Image
            src="/arsen_photo.jpg"
            alt="Portrait of Arsen Akishev"
            width={756}
            height={1008}
            className="about-photo"
            placeholder="blur"
            blurDataURL={profileBlur}
            sizes="(max-width: 720px) 100vw, 360px"
            priority
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">About me</p>
          <h1>{'Born in Kyrgyzstan and raised in NYC.'}</h1>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn ghost">
            View Resume
          </a>
        </div>
      </section>

      <section className="section about-details">
        <div className="about-panel">
          <h2>Languages</h2>
          <ul className="language-list">
            {languagesList.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <div className="about-panel">
          <h2>Education</h2>
          <ul className="education-list">
            {education.map((item) => (
              <li key={item.school}>
                <h3>{item.school}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section world-traveler">
        <div className="section-header">
          <p className="eyebrow">World Traveler</p>
          <h2>Places I&apos;ve explored.</h2>
          <p>From the bustling streets of New York to the historic landmarks of Paris, each journey has shaped my perspective.</p>
        </div>
        <WorldMap />
      </section>

      <section className="section pet-lover">
        <div className="section-header">
          <p className="eyebrow">Pet Lover</p>
          <h2>My furry companions.</h2>
          <p>These wonderful pets have brought joy and companionship into my life.</p>
        </div>
        <div className="pet-grid">
          <div className="pet-card">
            <Image
              src="/daisy_photo.jpg"
              alt="Daisy the dog"
              width={200}
              height={200}
              className="pet-photo"
              placeholder="blur"
              blurDataURL={daisyBlur}
              sizes="200px"
            />
            <h3>Daisy</h3>
            <p className="pet-type">Dog</p>
          </div>
          <div className="pet-card">
            <Image
              src="/barsik_photo.jpg"
              alt="Barsik the cat"
              width={200}
              height={200}
              className="pet-photo"
              placeholder="blur"
              blurDataURL={barsikBlur}
              sizes="200px"
            />
            <h3>Barsik</h3>
            <p className="pet-type">Cat</p>
          </div>
        </div>
      </section>

      <section className="section gym-stats">
        <div className="section-header">
          <p className="eyebrow">Gym Stats</p>
          <h2>Lifting numbers.</h2>
        </div>
        <div className="gym-grid">
          <div className="gym-card">
            <span className="gym-lift">Bench Press</span>
            <span className="gym-weight">135 lbs</span>
          </div>
          <div className="gym-card">
            <span className="gym-lift">Deadlift</span>
            <span className="gym-weight">195 lbs</span>
          </div>
          <div className="gym-card">
            <span className="gym-lift">Squat</span>
            <span className="gym-weight gym-weight--na">I don&apos;t squat</span>
          </div>
        </div>
      </section>
    </div>
  )
}
```

**Notes:**
- Using `width`/`height` props (not `fill`) — simpler and works well since the existing CSS already handles sizing via `object-fit: cover` and wrapper constraints. The spec suggested `fill` but `width`/`height` is more straightforward here and avoids needing wrapper `position: relative` changes.
- Profile photo uses `width={756} height={1008}` (3024/4 × 4032/4) to give next/image the aspect ratio. Actual rendered size is controlled by CSS.
- Pet photos use `width={200} height={200}` matching the CSS `max-width` and `height`.
- Profile photo gets `priority` since it's above the fold.
- Replace `BLUR_DATA_URL_HERE` with the actual base64 strings from Step 1.

- [ ] **Step 3: Verify images render with blur placeholders**

Run: `npm run dev`
Test: Navigate to `/about`. Confirm all three images load correctly. Use DevTools Network tab to throttle and observe blur placeholder showing briefly before full image loads. Verify `object-fit: cover` and border-radius still work correctly.

- [ ] **Step 4: Run build to confirm no errors**

Run: `npm run build`
Expected: Build completes successfully with no image-related warnings.

- [ ] **Step 5: Commit**

```bash
git add app/\(site\)/about/page.tsx
git commit -m "feat: optimize images with next/image and blur placeholders"
```

---

## Final Verification

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Clean build, no errors or warnings.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No lint errors.

- [ ] **Step 3: Manual smoke test**

Test all 5 features:
1. Resize to mobile → hamburger nav works, dropdown opens/closes
2. Home page → hero elements fade in on load
3. Navigate to `/nonexistent` → 404 page shows with gradient text
4. Navigate between pages → shimmer skeletons flash during transitions
5. About page → images show blur placeholders during load
