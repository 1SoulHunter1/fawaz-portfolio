# Portavia Clone vs Original — Side-by-Side Differences

> **Generated:** 2026-06-19
> **Original:** https://portavia.framer.website
> **Clone:** http://localhost:3000 (branch: `portavia-refinement`)
> **Status:** Documentation only — do not fix yet.

---

## Table of Contents

1. [Global / Cross-Page Issues](#1-global--cross-page-issues)
2. [Homepage (/)](#2-homepage-)
3. [About Page (/about)](#3-about-page-about)
4. [Projects Listing (/projects)](#4-projects-listing-projects)
5. [Blogs Listing (/blogs)](#5-blogs-listing-blogs)
6. [Project Detail (/projects/[slug])](#6-project-detail-projectsslug)
7. [Blog Detail (/blogs/[slug])](#7-blog-detail-blogsslug)
8. [Animations & Interactions](#8-animations--interactions)
9. [Responsiveness](#9-responsiveness)

---

## 1. Global / Cross-Page Issues

### 1.1 Navbar — Position & Behavior

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Position | Fixed pill, stays visible on scroll | `position: static`, scrolls out of view | **Critical** |
| Width | 508px (shows all nav links + Contact CTA) | 234px (appears collapsed, avatar+badge only at rest) | **Critical** |
| Scroll behavior | Pill width collapses to avatar+badge while actively scrolling, re-expands when scrolling pauses or at page top | No scroll behavior — static element | **Critical** |
| Nav link hover | Color transition to lime (`#d0ff71`) | No hover color transition | Medium |
| Contact button | White bg, rounded-full (`border-radius: 99px`) | Matches | OK |
| Background | `rgba(15, 15, 15, 0.9)`, `border-radius: 28px` | Same bg, same pill shape | OK |

### 1.2 Typography Casing

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Text casing | Mixed case (natural capitalization: "what I can do for you") | All uppercase throughout (`WHAT I CAN DO FOR YOU`) | Low |

> The original uses sentence/title case for section headings. The clone applies `uppercase` CSS globally. This is a stylistic choice already in the codebase — not necessarily a bug, but differs from original.

### 1.3 Custom Cursor (MouseFollower)

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Default dot | 16px lime circle | 16px lime circle | OK |
| Arrow variant | 70px circle with white arrow SVG, appears on cards | 70px circle with white arrow SVG, appears on cards | OK |
| Blend variant | 16px with `mix-blend-mode: color-burn` on CTAs | 16px with `mix-blend-mode: color-burn` on CTAs | OK |
| Lerp trailing | ~0.12 factor | 0.12 factor | OK |

> Custom cursor implementation matches original closely.

---

## 2. Homepage (/)

### 2.1 Hero Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| H1 Y position | y=300 (closer to top) | y=476 (~176px lower) | **High** |
| H1 font | 120px, fw 700, Antonio | 120px, fw 700, Antonio | OK |
| Hero entrance animation | 3D flip card, heading slide-in, staggered entrance | No entrance animation — content appears immediately | **High** |
| Hero card | Static pre-tilted 3D transform (no mouse parallax) | No 3D card present in hero | **High** |
| Hero subtitle/badge | Present (role badge below heading) | Present | OK |

### 2.2 Services Section ("What I Can Do For You")

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Layout | **Single-column stacked list** — all items at x=154, spaced ~83px apart (y: 1048→1131→1214→1297) | **2x2 grid** — items at x=138/714, y: 1073/1073/1355/1355 | **Critical** |
| Heading font-size | 60px | 60px | OK |
| Item font-size | 32px | 32px | OK |
| Service descriptions | Each item has a paragraph description visible | Same | OK |
| Item numbering | "1. ui/ux design" (lowercase) | "1. UI/UX DESIGN" (uppercase) | Low |

> The services section layout is fundamentally different. Original is a single-column vertical list with each service stacked. Clone uses a 2-column grid.

### 2.3 About/Stats Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| H2 "About me" position | y=1557 | y=1767 (~210px lower) | Medium |
| Stats counters | Animated (CountUp on scroll) | Animated (CountUp implemented) | OK |
| Avatar image | Present next to bio text | Present | OK |

### 2.4 Featured Projects Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Project card title tag | **H2** | **H3** | Medium |
| Card width | 1120px | 1152px (slightly wider, minor) | Low |
| Sticky stacking | Cards stack with `position: sticky` | Cards stack with `position: sticky; top: 80px` | OK |
| Card title font | 60px, fw 700 | 60px, fw 700 | OK |
| "Browse All Projects" CTA | Lime text link with arrow | Lime bordered pill button with arrow | Medium |

> Original "Browse All Projects" is a simple text link. Clone wraps it in a bordered pill button.

### 2.5 Testimonials Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Section title | "What My Clients Say", y=6209 | "WHAT MY CLIENTS SAY", y=6386 | Low |
| Testimonial font-size | 14px for quotes | Matches | OK |
| Satisfaction percentage | Animated CountUp | Animated CountUp | OK |

### 2.6 FAQ Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Heading font-size | **60px** | **48px** | **High** |
| Heading text | "Frequently Asked Questions" | "FREQUENTLY ASKED QUESTIONS" | Low |
| FAQ item font-size | 12px (Framer internal, renders larger visually) | 16px | Low |
| Accordion behavior | Click to expand/collapse | Click to expand/collapse (grid-rows) | OK |

### 2.7 Blog Section (Homepage)

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Cards layout | 2 cards side-by-side (w=540 each, x=154/734) | 2 cards side-by-side (similar) | OK |
| Card height | h=491 | Similar | OK |
| "Browse All Insights" CTA | Lime text link | Lime text link with arrow | OK |

### 2.8 Contact/CTA Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Heading | "Let's work together", y=9027, 60px | "LET'S WORK TOGETHER", y=8718, 60px | Low |
| CTA button hover | Circle-fill effect (inset animation) | No circle-fill — standard hover | **High** |
| Form fields | Present | Present | OK |

---

## 3. About Page (/about)

### 3.1 Hero / Header

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| H1 "About me" | y=134, fs=120px | y=223, fs=120px (~89px lower) | Medium |
| H1 letter-spacing | -3.6px | Not verified (check) | Low |

### 3.2 Author Name

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| "Duncan Robert" tag | **H3** | **H2** | Medium |
| Color | White (`rgb(255,255,255)`) | **Lime** (`rgb(208,255,113)`) | **High** |
| Font-size | 32px | 32px | OK |

### 3.3 Right Column Images

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Image count | **4 stacked images** (each 340x476, at x=824) scrolling vertically | **1 single image** (420x560, at x=804) | **Critical** |
| Scroll behavior | Images stack/parallax as you scroll through the about hero section | Static single image | **Critical** |

> Original has a repeating/scrolling column of 4 portrait images on the right side of the about hero. Clone shows only one static image.

### 3.4 Services Section ("What I Can Do For You")

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Layout | **Single-column stacked list** (all at x=154, y: 1142→1225→1308→1391, ~83px spacing) | **2x2 grid** (x=138/714, y: 1141/1141/1423/1423) | **Critical** |

> Same grid-vs-list layout mismatch as homepage.

### 3.5 Experience/Journey Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Item spacing | ~85px apart (y: 2029→2114→2198→2283) | ~145px apart (y: 2072→2216→2361→2506) | **High** |
| Line-height | 41.6px | 48px | Medium |

> Clone has nearly double the vertical spacing between experience items.

### 3.6 Tech Stack Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Icon size | 56x56px | 56x56px | OK |
| Grid layout | 5 icons in a row | 3 icons per row (2 rows) | Medium |
| Position | y=2586 (heading) | y=2788 (heading, ~200px lower) | Medium |

### 3.7 Process Cards Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Cards 01+02 | Side by side at y=3821 (01 at x=194, 02 at x=954) | Both at y=3819 (side by side) | OK |
| Cards 03 | Centered at x=574, y=4221 | At y=4536 | OK |
| Cards 04+05 | Side by side at y=4621 | At y=4536/5252 | Medium |
| Card images | 360x380 each | 486x365 / 243x182 (varying sizes) | **High** |
| Background colors | Alternating dark/light with process images | Alternating dark/light | OK |

### 3.8 CTA Section

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| "Let's work together" | y=5201 | y=5555 (~354px lower) | Medium |
| Portrait image | 340x476 at right side | 300x350 | Medium |

---

## 4. Projects Listing (/projects)

### 4.1 Page Header

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| H1 "Featured Projects" | y=180, fs=120px | y=176, fs=120px | OK |

### 4.2 Featured Project Cards

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Card title tag | **H2** | **H3** | Medium |
| Card width | 1120px | 1152px | Low |
| Card height | 747px | 768px | Low |
| Card X position | x=154 | x=138 | Low |
| Card border-radius | Verify | rounded-[20px] | OK |

### 4.3 "More Projects" Grid

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Grid columns | 2 columns (w=540 each) | 2 columns (w=564 each) | Low |
| Card positions | x=154/734 | x=138/726 | Low |
| Thumbnail height | 320px | ~320px (similar) | OK |

---

## 5. Blogs Listing (/blogs)

### 5.1 Page Header

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| H1 "Design Insights & Ideas" | y=180, fs=120px | y=176, fs=120px | OK |

### 5.2 Featured/Pinned Blog

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Card height | **h=650** (tall, image-heavy) | **h=266** (compact, less visual) | **High** |
| Card width | 1120px | 1152px | Low |
| Card Y position | y=453 | y=552 | Low |
| "Most Viewed" subheading | Not present | **Present** at y=477, fs=26px | Medium |
| Pinned blog title font | 32px | **40px** | Medium |

> The pinned/featured blog card is significantly shorter in the clone. Original has a much taller card with a prominent image. The clone also adds a "Most Viewed" heading that doesn't exist in the original.

### 5.3 Blog Grid

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Grid columns | 2 columns (w=540) | 2 columns (w=564) | Low |
| Card height | ~491px | ~530px | Low |

---

## 6. Project Detail (/projects/[slug])

### 6.1 Header

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| H1 font-size | 120px | 120px | OK |
| H1 Y position | y=227 | y=228 | OK |
| Category badge | "Graphic Design" at y=183 | "Graphic Design" at y=176 | OK |
| "New release" badge | Present at y=489 | Not present | Medium |

### 6.2 Project Meta (Year, Client, etc.)

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Meta Y position | y=578 | y=651 (~73px lower) | Low |
| Meta font-size | 18px | 18px | OK |

### 6.3 Content Images

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Hero image width | 1000px | 952px | Low |
| Side-by-side images | 480px each | 466px each | Low |

### 6.4 "More Projects" Grid

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Grid columns | **2 columns** (w=480 each) | **3 columns** (w=368 each) | **High** |
| Card thumbnail height | 320px | 245px | Medium |

> Original shows 2 related projects per row. Clone shows 3 per row, resulting in smaller thumbnails.

---

## 7. Blog Detail (/blogs/[slug])

### 7.1 Header

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| H1 font-size | **120px** | **88px** | **High** |
| Content heading H2 | 40px | 40px | OK |

> Blog detail page title is significantly smaller in the clone (88px vs 120px original).

### 7.2 Content Structure

| Aspect | Original | Clone | Severity |
|--------|----------|-------|----------|
| Content section headings | H2, 40px | H2, 40px | OK |
| "More to Discover" section | H3, 32px | H3, 32px | OK |
| Related blog grid | 2 columns | 2 columns | OK |

---

## 8. Animations & Interactions

### 8.1 Entrance Animations

| Feature | Original | Clone | Severity |
|---------|----------|-------|----------|
| Hero 3D flip card | Yes — card flips in on load | Not implemented | **High** |
| Hero heading slide-in | Yes — staggered text entrance | Not implemented | **High** |
| Page transition | Fade between routes | Fade between routes (template.tsx) | OK |
| Scroll reveals | Sections animate in on scroll | Sections animate in (ScrollReveal) | OK |
| Counter animations | Numbers count up on scroll | Numbers count up (CountUp component) | OK |

### 8.2 Hover Effects

| Feature | Original | Clone | Severity |
|---------|----------|-------|----------|
| CTA button circle-fill | Circle expands from center on hover (inset animation) | Standard color transition hover | **High** |
| Nav link lime hover | Links change to lime (`#d0ff71`) on hover | No color change | Medium |
| Project card image zoom | Scale on hover | Scale on hover | OK |
| Blog card image zoom | Scale on hover | Scale on hover | OK |
| "Browse All Projects" hover | Text glow/color | Border color + bg fill | Low |

### 8.3 Scroll Effects

| Feature | Original | Clone | Severity |
|---------|----------|-------|----------|
| Smooth scrolling (Lenis) | Yes — momentum scrolling | Yes — Lenis initialized | OK |
| Navbar scroll collapse | Pill collapses width while scrolling | Not implemented | **High** |
| About page image scroll | 4 images scroll/stack in right column | Not implemented (1 static image) | **Critical** |
| Sticky project cards | Cards stack on scroll | Cards stack on scroll | OK |

---

## 9. Responsiveness

> Not yet tested — desktop comparison only. Mobile/tablet comparison pending.

| Breakpoint | Status |
|------------|--------|
| Desktop (1440px) | Compared above |
| Tablet (768px) | Not yet compared |
| Mobile (375px) | Not yet compared |

---

## Summary — Issues by Severity

### Critical (layout fundamentally wrong)
1. **Navbar is static** — should be fixed pill that stays visible on scroll
2. **Services section uses 2x2 grid** — should be single-column stacked list
3. **About page right column** — should have 4 scrolling images, not 1 static image
4. **Navbar scroll collapse** — pill should collapse to avatar+badge while scrolling

### High (visually noticeable)
5. Hero section missing entrance animations (3D flip, heading slide-in)
6. Hero H1 is ~176px too low on homepage
7. CTA button missing circle-fill hover effect
8. FAQ heading is 48px — should be 60px
9. "Duncan Robert" on About page is lime — should be white
10. Experience/Journey items have ~2x too much vertical spacing
11. About page process card images are wrong sizes
12. Blog detail H1 is 88px — should be 120px
13. Blogs listing pinned card is too short (h=266 vs h=650)
14. Project detail "More Projects" grid is 3 columns — should be 2

### Medium
15. Project card titles use H3 — should be H2 (semantic)
16. Nav link hover should transition to lime color
17. "Duncan Robert" uses H2 — should be H3
18. Blogs listing has extra "Most Viewed" heading not in original
19. Pinned blog title font is 40px — should be 32px
20. Tech stack grid has 3 columns — original has 5 per row
21. About page CTA portrait image is smaller (300x350 vs 340x476)
22. "Browse All Projects" CTA on homepage is a pill button — original is a text link
23. Project detail missing "New release" badge

### Low
24. Text casing differences (clone uses uppercase globally)
25. Minor width differences (1152 vs 1120 content area)
26. Minor position offsets (few px differences in Y positions)
