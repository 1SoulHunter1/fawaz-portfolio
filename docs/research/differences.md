# Differences — Portavia Clone vs Original

> **Date:** 2026-06-20
> **Original:** https://portavia.framer.website
> **Clone branch:** `portavia-refinement`

---

## Severity Legend
- **Critical** — Breaks core UX, immediately noticeable, must fix
- **Major** — Visible difference affecting perceived quality
- **Minor** — Subtle, only noticeable on side-by-side comparison

---

## Critical Differences

*None remaining — all critical layout and structure issues have been resolved.*

---

## Major Differences

### 1. Page Transitions Missing
- **Original:** Smooth opacity fade between routes (~200ms)
- **Clone:** Hard navigation with no transition
- **Impact:** Site feels less polished during navigation
- **Fix:** Add `motion/react` page transition wrapper in layout

### 2. Lenis Smooth Scroll Not Active
- **Original:** Uses Lenis (`html.lenis` class present), buttery smooth scroll behavior
- **Clone:** `SmoothScroll.tsx` component exists and wraps content, but scroll may not feel identical
- **Impact:** Scroll feel differs from original
- **Fix:** Verify Lenis is initializing correctly and matching original config

### 3. CTA Button Circle-Fill Only on Some Buttons
- **Original:** All CTA links (Browse All Projects, Browse All Insights, My Story, Load More) likely have hover effects
- **Clone:** Circle-fill hover only on Contact button (navbar) and Submit button (form). Other CTA links only have `hover:opacity-80`.
- **Impact:** Inconsistent interaction polish
- **Fix:** Apply `CtaButton` component with circle-fill to all CTA links

### 4. About Page — Services Are Static Lists, Not Accordion
- **Original:** About page services section uses the same accordion pattern as homepage
- **Clone:** About page services show all items expanded (static lists with checkmarks), no accordion behavior
- **Impact:** Less interactive, doesn't match original
- **Fix:** Use `ServicePanel`-style accordion or add expand/collapse to the list items

### 5. About Page — Sticky Scroll Right Column Width
- **Original:** Sticky Wrap is exactly 640px wide, cards centered within
- **Clone:** Right column uses `flex-1` (fills remaining space), may not match exact 640px
- **Impact:** Card positioning differs from original
- **Fix:** Set explicit `w-[640px]` on sticky column

### 6. Contact Form — No Backend
- **Original:** Framer form handler processes submissions
- **Clone:** `handleSubmit` is a no-op (`e.preventDefault()` only)
- **Impact:** Form doesn't actually work
- **Fix:** Add form handler (email API, Formspree, etc.)

---

## Minor Differences

### 7. Badge Size
- **Original:** 123px circle
- **Clone:** 80px base / 120px at lg breakpoint (~3px smaller)
- **Fix:** Change lg size to `lg:h-[123px] lg:w-[123px]`

### 8. Badge Wave Icon — Static vs Lottie
- **Original:** Lottie animated waving hand
- **Clone:** Static SVG `WaveHandIcon`
- **Impact:** Wave doesn't animate independently of carousel
- **Fix:** Integrate Lottie player with original animation

### 9. FAQ Section — Sticky Title Position
- **Original:** FAQ left column is `position: sticky` at `top: 100px`
- **Clone:** Left column is not sticky (static positioning)
- **Fix:** Add `sticky top-[100px]` to FAQ title column

### 10. Homepage Project Section Title
- **Original:** "Featured Projects" as H2 (60px)
- **Clone:** "FEATURED PROJECTS" — correct text and size
- **No difference** — matches

### 11. Testimonial Grid Layout
- **Original:** 3-column grid: `360px 360px 360px`, gap 20px
- **Clone:** `md:grid-cols-3` with `gap-5` (20px)
- **Match** — grid structure is correct

### 12. Star Icon Color
- **Original:** Stars in testimonials are purple/indigo
- **Clone:** `text-[rgb(106,113,223)]` — matches

### 13. Footer Height
- **Original:** ~205px total section (including padding)
- **Clone:** `py-6` with responsive content — close match

### 14. Noise Overlay
- **Original:** `position: fixed`, `z-index: 0`, `opacity: 0.12`, pointer-events: auto
- **Clone:** `fixed inset-0 z-0 opacity-[0.12]` with `pointer-events-none`
- **Difference:** Clone has `pointer-events-none` (intentional improvement to prevent blocking clicks)

### 15. Project Detail Page — "More Projects" Count
- **Original:** Shows 6 related projects (compact cards)
- **Clone:** Shows up to 6 filtered projects — matches

### 16. Blog Detail Page — Newsletter CTA
- **Original:** Has newsletter subscription CTA card
- **Clone:** Has newsletter CTA card — matches layout

### 17. Mobile Navbar — Hamburger vs Scroll
- **Original:** Mobile nav shows avatar + "Available for work" pill + hamburger
- **Clone:** Same structure with hamburger toggle — matches

### 18. Project Detail Page Title Font
- **Original:** "Summer Vibes Festival Campaign" at 120px
- **Clone:** `lg:text-[120px]` — matches

---

## Typography Comparison

| Element | Original | Clone | Match |
|---------|----------|-------|-------|
| Font family (headings) | Antonio, sans-serif | `--font-antonio` via Google Fonts | Match |
| Font family (body) | Inter, sans-serif | `--font-inter` via Google Fonts | Match |
| H1 hero | 120px, 700 weight, 132px line-height | `lg:text-[120px] font-bold lg:leading-[132px]` | Match |
| H2 section | 60px, 700 weight, 78px line-height | `md:text-[60px] font-bold md:leading-[78px]` | Match |
| H3 accordion | 32px, 400 weight, 41.6px line-height | `lg:text-[32px] font-normal lg:leading-[41.6px]` | Match |
| Body text | 18px, 300 weight, 27px line-height | `text-lg font-light leading-[27px]` | Match |
| Small text | 14px, 300 weight | `text-sm font-light` | Match |

---

## Color Comparison

| Token | Original | Clone | Match |
|-------|----------|-------|-------|
| Background | `rgb(26, 26, 27)` / `#1a1a1b` | `bg-[#1a1a1b]` | Match |
| Navbar BG | `rgba(15, 15, 15, 0.9)` | `bg-[rgba(15,15,15,0.9)]` | Match |
| Primary text | `rgb(255, 255, 255)` | `text-white` | Match |
| Accent (lime) | `rgb(208, 255, 113)` / `#d0ff71` | `bg-[#d0ff71]` / `text-[#d0ff71]` | Match |
| Card bg (dark) | `rgb(48, 48, 48)` / `#303030` | `bg-[#303030]` | Match |
| Border | `rgb(51, 51, 51)` / `#333` | `border-[#333]` | Match |
| Muted text | `rgb(181, 181, 181)` / `#b5b5b5` | `text-[#b5b5b5]` | Match |
| Available dot | `rgb(11, 222, 102)` | `bg-[rgb(11,222,102)]` | Match |

---

## Layout Comparison

| Property | Original | Clone | Match |
|----------|----------|-------|-------|
| Max content width | 1200px | `max-w-[1200px]` | Match |
| Horizontal padding | ~24px (6 in Tailwind) | `px-6` | Match |
| Navbar border-radius | 28px | `rounded-[28px]` | Match |
| Navbar height | 56px | Auto (close to 56px) | Match |
| Navbar position | Fixed, top 20px, centered | `fixed top-4 left-1/2 -translate-x-1/2` | Match |
| Card border-radius | 20px | `rounded-[20px]` | Match |
| Section padding | ~80px vertical | `py-20` (80px) | Match |

---

## Summary

| Severity | Count | Key Items |
|----------|-------|-----------|
| **Critical** | 0 | — |
| **Major** | 6 | Page transitions, Lenis scroll, CTA fills, about services, sticky column width, form backend |
| **Minor** | 12 | Badge size, Lottie wave, FAQ sticky, various hover effects |
| **Total** | 18 | |
