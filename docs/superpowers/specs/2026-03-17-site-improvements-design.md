# Site Improvements Design Spec

**Date:** 2026-03-17
**Scope:** 5 UX/UI improvements to the portfolio site

---

## 1. Mobile Hamburger Nav

**What:** Replace the stacked nav links on mobile (<720px) with a hamburger icon that toggles a dropdown menu.

**Implementation:**
- Add a hamburger button (`<button>`) to `NavBar.tsx`, hidden on desktop via CSS, visible below 720px
- On tap, toggle an `open` state that shows/hides the nav links in a vertical dropdown
- The hamburger icon animates to an X when open (CSS transforms on three `<span>` bars). Respects `prefers-reduced-motion` (instant swap, no transition).
- Dropdown slides down with a CSS transition (`max-height` + `opacity`)
- Clicking a nav link closes the menu
- Clicking outside the menu closes it
- The existing `.nav-links` container is hidden on mobile by default, shown when `.nav-links.open`
- Dropdown gets `z-index: 100` to reliably overlay all page content

**Accessibility:**
- Hamburger button: `aria-label="Toggle navigation"`, `aria-expanded={open}`
- Nav container on mobile: `aria-hidden={!open}` when closed

**CSS changes in `app.css`:**
- Add `.hamburger` button styles (hidden above 720px via `display: none`)
- Modify the existing `@media (max-width: 720px)` rule: change `.site-nav` from `flex-direction: column` to keep `flex-direction: row` with `justify-content: space-between` (brand left, hamburger right)
- Inside that media query: hide `.nav-links` by default (`display: none`), show when `.nav-links.open` (`display: flex; flex-direction: column`)
- Dropdown: glassmorphism background matching site aesthetic, vertical link layout with larger tap targets (padding ~0.65rem 1rem)

**Files touched:** `components/NavBar.tsx`, `styles/app.css`

---

## 2. Hero Fade-In Animation

**What:** Add staggered fade-up entrance animations to the hero section elements on page load.

**Implementation:**
- Define a `@keyframes fadeUp` animation in `app.css`: `from { opacity: 0; transform: translateY(20px) }` to `{ opacity: 1; transform: translateY(0) }`
- Apply `.fade-up` class to hero children with staggered delays via `.fade-up-1` through `.fade-up-4`:
  - Eyebrow (`.fade-up-1`): 0.1s delay
  - H1 (`.fade-up-2`): 0.3s delay
  - Lede paragraph (`.fade-up-3`): 0.5s delay
  - Metric grid (`.fade-up-4`): 0.7s delay
- Elements start with `opacity: 0` and animate in on load
- Animation runs once, `animation-fill-mode: forwards`, duration `0.6s ease-out`
- `@media (prefers-reduced-motion: reduce)`: set all `.fade-up` elements to `opacity: 1; transform: none; animation: none`

**Files touched:** `app/(site)/page.tsx` (add classes), `styles/app.css` (add keyframes + classes)

---

## 3. Custom 404 Page

**What:** A clean, minimal 404 page matching the site's glassmorphism dark theme.

**Implementation:**
- Create `app/not-found.tsx` (root-level — this is the only location Next.js App Router uses as the global catch-all 404)
- Since root `not-found.tsx` only gets the root layout (no nav/footer), manually render the site shell inside it: import `NavBar`, wrap content in `<div className="site">` with glow elements and footer, matching the structure of `app/(site)/layout.tsx`
- Content: large gradient "404" text, "Page not found" heading, brief description, "Back to home" link
- The 404 number uses `background: linear-gradient(135deg, var(--accent), #38bdf8)` with `-webkit-background-clip: text`
- Centered vertically using flexbox with `min-height` on the content area

**Files touched:** `app/not-found.tsx` (new), `styles/app.css` (add `.not-found-page` styles)

---

## 4. Shimmer Loading Skeletons

**What:** Add skeleton loading screens with an animated shimmer sweep to main site pages. These show during client-side route transitions. Since this is a static site with data from `data/profile.js`, skeletons will only flash briefly during navigation — they provide visual continuity rather than masking slow data fetches.

**Implementation:**
- Create a reusable `components/Skeleton.tsx` component that renders configurable placeholder shapes (line, block, card variants)
- Define `@keyframes shimmer` in `app.css`: sweeps a lighter gradient band across skeleton elements
- Create `loading.tsx` files in route directories (Next.js convention — automatic Suspense boundaries):
  - `app/(site)/loading.tsx` — fallback skeleton for any site page without its own loading file (serves as the home page skeleton too)
  - `app/(site)/experience/loading.tsx` — experience card skeletons
  - `app/(site)/writing/loading.tsx` — article card skeletons
  - `app/(site)/projects/loading.tsx` — project card skeletons
  - `app/(site)/about/loading.tsx` — about page skeleton with photo placeholder + card placeholders
- Route-specific `loading.tsx` files override the parent `app/(site)/loading.tsx` for their routes
- Skeleton CSS: `.skel` base class with `background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)`, `background-size: 400px 100%`, `animation: shimmer 1.5s ease-in-out infinite`
- Skeleton card wrapper: `.skel-card` with the site's standard glassmorphism card styles
- `@media (prefers-reduced-motion: reduce)`: disable shimmer animation, show static gray placeholders

**Files touched:** `components/Skeleton.tsx` (new), 5 `loading.tsx` files (new), `styles/app.css`

---

## 5. Image Optimization with Blur Placeholders

**What:** Replace raw `<img>` tags with Next.js `<Image>` component, using blur placeholders.

**Images to convert:**
- `about/page.tsx`: `arsen_photo.jpg` (profile photo), `daisy_photo.jpg`, `barsik_photo.jpg` (pet photos)

**Implementation:**
- Import `Image` from `next/image`
- Before converting, measure actual image dimensions from the files in `/public`
- For the profile photo (`about-photo` class): use `<Image>` with `fill` prop + `style={{ objectFit: 'cover' }}` inside a wrapper div with `position: relative` and explicit dimensions. This preserves the current CSS-driven sizing approach where the wrapper controls dimensions.
- For pet photos (`pet-photo` class): same approach — `fill` prop inside a `position: relative` wrapper, `style={{ objectFit: 'cover' }}`
- Generate `blurDataURL` strings: create tiny base64 data URIs for each image (can use `plaiceholder` package or manually create ~10x10px encoded versions)
- Set descriptive `alt` attributes for accessibility
- Add `sizes` prop for responsive behavior (e.g., `sizes="(max-width: 720px) 100vw, 360px"` for profile photo)
- Pass `className` through to preserve existing styling

**Files touched:** `app/(site)/about/page.tsx`

---

## Technical Notes

- All animations and transitions respect `prefers-reduced-motion: reduce`
- No new dependencies required
- Loading skeletons use Next.js file-based `loading.tsx` convention (automatic Suspense boundaries)
- Mobile nav state managed with React `useState` — no external state library needed
