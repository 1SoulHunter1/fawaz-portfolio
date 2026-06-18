# Portavia Clone — Full Audit

> Compared: https://portavia.framer.website (original) vs current codebase on `portavia-refinement` branch
> Date: 2026-06-18

---

## 1. Missing Pages & Routes

The clone only has `src/app/page.tsx` (homepage). The original has **10+ distinct routes**:

| Route | Status | Description |
|-------|--------|-------------|
| `/` | **EXISTS** | Homepage |
| `/about` | **MISSING** | About Me — bio, journey timeline, tech stack, 5-step design process, contact form |
| `/projects` | **MISSING** | All projects listing — 4 featured cards + "More Projects" grid with additional projects |
| `/projects/summer-vibes-festival-campaign` | **MISSING** | Project detail — hero, metadata (date/role/duration/tools), Problem/Solution/Challenges/Summary sections, image gallery, related projects |
| `/projects/coral-spiral-abstract` | **MISSING** | Project detail (same layout) |
| `/projects/shopease-redesign-sprint` | **MISSING** | Project detail (same layout) |
| `/projects/black-geometric-prisms` | **MISSING** | Project detail (same layout) |
| `/blogs` | **MISSING** | Blog listing — "Most Viewed" featured post + grid of 6+ blog posts |
| `/blogs/5-design-trends-that-will-define-2024` | **MISSING** | Blog post — numbered content sections (1–5), images, related articles |
| `/blogs/how-to-streamline-your-design-workflow` | **MISSING** | Blog post (same layout) |
| `/blogs/[additional-posts]` | **MISSING** | At least 4 more blog posts visible on /blogs listing: "The Power of Typography in Web Design", "The Role of Color Psychology in Branding", "Mastering UI/UX Design: Key Principles for Success", "Balancing Creativity and Functionality in Design" |

Additional projects visible on `/projects` "More Projects" grid:
- Pantone Very Peri Poster Design
- Intrada Brand Boutique E-Gift Card Design
- Videaaken
- Immobitech Identity Rollout

---

## 2. Missing Sections (on pages that exist)

### Homepage — all major sections are present:
- [x] Navbar
- [x] Hero
- [x] Services ("What I Can Do For You")
- [x] About Me
- [x] Featured Projects
- [x] Testimonials ("What My Clients Say")
- [x] FAQ
- [x] Blog ("Design Insights & Ideas")
- [x] Contact ("Let's Work Together")
- [x] Footer

### About Page (`/about`) — entirely missing. Sections it contains:
- [ ] Hero with "ABOUT ME" heading, name "DUNCAN ROBERT", portrait photo
- [ ] Bio paragraph + social links (X, Instagram, Behance, Dribbble)
- [ ] "WHAT I CAN DO FOR YOU" (services repeated, condensed list)
- [ ] "DISCOVER MY JOURNEY IN DESIGN" — career timeline (Art Director, Senior UI/UX Designer, UI Designer, Graphic Designer) with years and company names
- [ ] "MY TECH STACK" — tools/skills grid section
- [ ] "DESIGN WITH STRATEGY AND CREATIVITY" — 5-step numbered process cards (01. Research & Strategy, 02. Concept & Ideation, 03. Feedback & Refinement, 04. Testing & Optimization, 05. Launch & Delivery)
- [ ] "LET'S WORK TOGETHER" contact section (same as homepage)
- [ ] Footer

### Project Detail Pages (`/projects/[slug]`) — entirely missing. Sections:
- [ ] Hero with project title, cover image
- [ ] Metadata bar: Date, Role, Duration, Platform/Tools
- [ ] "PROBLEM" section
- [ ] "SOLUTION" section
- [ ] "CHALLENGES" section
- [ ] "SUMMARY" section
- [ ] Project image gallery
- [ ] "MORE PROJECTS" related projects grid (6 items, 2×3)
- [ ] "GET HIRE" CTA button
- [ ] Footer

### Projects Listing (`/projects`) — entirely missing. Sections:
- [ ] "FEATURED PROJECTS" heading + subtitle
- [ ] 4 featured project cards (same as homepage)
- [ ] "MORE PROJECTS" heading + grid of additional project cards
- [ ] Footer

### Blog Listing (`/blogs`) — entirely missing. Sections:
- [ ] "DESIGN INSIGHTS & IDEAS" heading + subtitle
- [ ] "MOST VIEWED" featured article (large card)
- [ ] Grid of 6+ blog post cards (2-column, mixed sizes)
- [ ] Footer

### Blog Post (`/blogs/[slug]`) — entirely missing. Sections:
- [ ] Title + metadata (category badge, date)
- [ ] Hero image
- [ ] Numbered content sections (e.g., "1. 3D Lettering and Bubble Type", etc.)
- [ ] Section images
- [ ] "YOU MAY ALSO LIKE" related articles (2-column)
- [ ] Footer

---

## 3. Missing Animations

### 3a. Custom Cursor / Mouse Follower
**Original:** A 16×16px lime-green (`#d0ff71`) circle follows the mouse cursor.
- `position: fixed`, `z-index: 13`, `pointer-events: none`, `border-radius: 99px`
- Likely grows/scales when hovering interactive elements (links, buttons)
- **Clone: Not implemented at all**

### 3b. Hero 3D Parallax / Card Flip
**Original:** The hero has TWO portrait images stacked with `transform-style: preserve-3d` and `matrix3d` transforms creating a 3D card-flip effect — the back-view image is rotated 180° and the front-view image sits on top. Both use complex perspective transforms that respond to mouse movement.
- Back view: `matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, -0.141667, -0.198333, -1, 0.000833333, -170, -238, 0, 1)`
- Front view: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0.141667, 0.198333, 1, -0.000833333, -170, -238, 0, 1)`
- **Clone:** Only renders the front-view image as a flat 2D element. The back-view image exists in `/public/images/portrait-back.jpeg` but is unused.

### 3c. Scroll-Triggered Entrance Animations
**Original:** Elements have `data-framer-appear-id` attributes indicating Framer's built-in scroll-triggered entrance animations (fade-in, slide-up, etc.). At least 4 animated groups detected:
- "Hi" wave element
- "DUNCAN ROBERT" + "DIGITAL" heading group
- "DESIGNER" + subtitle group
- Framer CTA banner
- **Clone:** Has CSS `@keyframes fade-in-up` and `@keyframes count-up` defined but NOT applied to any elements. No scroll-triggered animations are implemented.

### 3d. Counter Animations
**Original:** Stat counters start at 0 and animate to final values (12, 270, 50+, 98%, 200%) when scrolled into view.
- **Clone:** Has `AnimatedCounter` components using `IntersectionObserver` — **partially implemented**. The approach is correct but needs verification for timing match.

### 3e. Services Section Accordion
**Original:** Service categories (UI/UX, Graphic Design, Web Design, Branding) have expand/collapse accordion behavior with a `+` toggle icon. Only one category is expanded at a time.
- **Clone:** All 4 service categories are always fully expanded. No accordion toggle behavior exists.

### 3f. Navbar Link Text-Swap Animation
**Original:** Nav links show duplicate text (e.g., "HomeHome") — this is Framer's text-swap hover animation where text slides up on the Y-axis and identical text slides in from below, creating a rolling/flipping text effect.
- **Clone:** Uses plain CSS `hover:text-[#d0ff71]` color change only.

### 3g. "Hi" Wave Element Animation
**Original:** The "Hi" text with wave emoji (👋) appears inside a styled circle container with an animated rotating border or ring effect.
- **Clone:** Renders "Hi" and wave emoji as flat inline elements without the circular container or rotation animation.

### 3h. Framer Page Transitions
**Original:** Framer sites typically have smooth page transitions (fade, slide) when navigating between routes.
- **Clone:** No page transition animations.

---

## 4. Missing Hover Interactions

### 4a. Navbar Expand/Collapse
**Original:** Navbar is a pill shape (28px border-radius). On desktop it is expanded (507px) showing avatar + "Available for work" badge + nav links (Home, About, Projects, Blogs, Contact). The expand/collapse uses smooth spring-physics transitions.
- **Clone:** Uses CSS `group-hover:max-w-[500px]` to reveal links, which is a simpler CSS-only approach. The transition feels different from Framer's spring animation.

### 4b. Navbar Link Hover — Text Swap
**Original:** Each link has a Y-axis text-swap (rolling) animation on hover.
- **Clone:** Only changes text color to lime on hover.

### 4c. Project Card Hover
**Original:** Project cards have a dark overlay that transitions from `bg-black/40` to `bg-black/50`, and the image scales up on hover.
- **Clone:** Has `group-hover:scale-105` and `group-hover:bg-black/50` — **mostly implemented** but may need timing refinement (original uses Framer spring physics).

### 4d. CTA Button Hover (BROWSE ALL / MY STORY / SUBMIT)
**Original:** Pill-shaped buttons (`border-radius: 99px`) with arrow icons. On hover, background fills with lime color and text/arrow color inverts. Arrow likely has a slide/translate animation.
- **Clone "BROWSE ALL PROJECTS":** Has hover fill implemented (`hover:bg-[#d0ff71] hover:text-black`) — close to correct.
- **Clone "BROWSE ALL INSIGHTS":** Styled as a plain text link, NOT as a pill button. Missing the pill border + hover fill.
- **Clone "MY STORY":** Styled as plain text link, NOT as a pill button. Missing the pill border + hover fill.
- **Clone "SUBMIT":** Has hover fill — mostly correct.

### 4e. Social Icon Hover
**Original:** Circle icons with background transition.
- **Clone:** Has `hover:bg-[#d0ff71] hover:text-black` — **implemented**.

### 4f. Blog Card Hover
**Original:** Blog cards have border, image zoom, and subtle scale/shadow on hover.
- **Clone:** Has `hover:scale-[1.02]` and `group-hover:scale-105` on image — **partially implemented**. Missing border glow/highlight.

### 4g. FAQ Accordion Hover
**Original:** FAQ items have a hover highlight and the chevron rotates on expand.
- **Clone:** Has chevron rotation — **implemented**. Missing hover row highlight.

---

## 5. Missing Mouse Follower Behaviors

The entire mouse follower system is absent from the clone:

| State | Original Behavior | Clone |
|-------|-------------------|-------|
| Default | 16px lime circle follows cursor | Not implemented |
| Hover on links | Cursor likely grows (e.g., to 40–60px) | Not implemented |
| Hover on project images | Cursor may show "View" text or grow | Not implemented |
| Hover on buttons | Cursor may change blend mode or grow | Not implemented |
| Click state | Cursor may briefly shrink | Not implemented |

---

## 6. Responsive Behavior

### 6a. Navbar Mobile
**Original:** Has a hamburger menu that expands into a full navigation panel on mobile.
- **Clone:** Has a hamburger toggle with animated bars (X transform) and a dropdown panel — **implemented** but the dropdown styling may differ.

### 6b. Hero Section
**Original:** At mobile sizes, the hero likely stacks vertically with reduced font sizes.
- **Clone:** Uses `lg:text-[120px]` breakpoint for heading size (60px → 120px). Needs verification against original breakpoints.

### 6c. Services Grid
**Original:** 2-column grid on desktop, stacking on mobile.
- **Clone:** Uses `md:grid-cols-2` — **implemented**.

### 6d. Stats Cards
**Original:** 3-column grid on desktop.
- **Clone:** Uses `sm:grid-cols-3` — **implemented**.

### 6e. Testimonials Grid
**Original:** 3-column layout (testimonials | stats | testimonials).
- **Clone:** Uses `md:grid-cols-3` — **implemented**.

### 6f. FAQ Layout
**Original:** 2-column (heading left, accordion right) on desktop.
- **Clone:** Uses `md:grid-cols-[1fr_1.5fr]` — **implemented**.

### 6g. Blog Grid
**Original:** 2-column grid on desktop.
- **Clone:** Uses `md:grid-cols-2` — **implemented**.

### 6h. Contact Layout
**Original:** 2-column (image left, form right) on desktop.
- **Clone:** Uses `md:grid-cols-2` — **implemented**.

### 6i. Footer Layout
**Original:** 3-section horizontal layout (email+phone | socials | copyright).
- **Clone:** Uses `md:flex-row md:items-center md:justify-between` — **implemented** but layout structure differs from original (original has distinct rows for contact info and copyright).

---

## 7. Timing Differences

| Element | Original | Clone |
|---------|----------|-------|
| Navbar expand | Spring physics (~300ms with overshoot) | CSS `duration-300` linear |
| Project card image zoom | Framer spring (~500ms) | CSS `duration-500` |
| FAQ accordion open | Framer spring | CSS `duration-300` grid-rows transition |
| Counter animation | Unknown duration | 2000ms with 60 steps |
| Cursor follower lag | ~100ms spring delay | Not implemented |
| Page entrance animations | Staggered with ~100ms delay between elements | Not implemented |
| Blog card hover scale | Framer spring | CSS linear transition |
| Nav link text swap | ~200ms Y-axis slide | Not implemented |

---

## 8. Spacing Differences

| Element | Original | Clone |
|---------|----------|-------|
| Section max-width | ~1200px | 1200px ✓ |
| Section vertical padding | Varies | `py-20` (80px) uniform |
| Nav padding | `8px 10px` | `px-2.5 py-2` (10px 8px) — close |
| Nav height | 56px | Auto (~56px) — close |
| "BROWSE ALL" button padding | `6px 40px 8px` | `px-8 py-3` (32px 12px) — differs |
| Project card border-radius | 20px | 20px ✓ |
| Stat card border-radius | 20px | 20px ✓ |
| Testimonial card border-radius | 20px | 20px ✓ |
| Hero image size | 340×476px | 340×476px ✓ |
| Project card aspect ratio | ~3:2 (1120×746px) | `aspect-[3/2]` ✓ |
| Blog card image aspect | ~16:9 | `aspect-[16/9]` ✓ |

---

## 9. Typography Differences

| Element | Original | Clone | Match? |
|---------|----------|-------|--------|
| Font families | Inter + Antonio | Inter + Antonio | ✓ |
| Hero heading size | 120px | 60px (mobile) / 120px (lg) | ✓ |
| Hero heading weight | 700 | bold (700) | ✓ |
| Hero heading letter-spacing | -3.6px | -3.6px | ✓ |
| Hero heading line-height | 132px | 132px (lg) | ✓ |
| "DESIGNER" style | Outlined/stroke (visual) | `WebkitTextStroke: 1.5px white, color: transparent` | ✓ |
| Section heading size | 60px | 36px (mobile) / 60px (md) | ✓ |
| Service title size | 32px (Antonio) | 32px (Antonio) | ✓ |
| Body text size | 16px | 16px (`text-base`) | ✓ |
| Body text weight | 300 (light) | `font-light` (300) | ✓ |
| Muted text color | `rgb(181,181,181)` | `#b5b5b5` | ✓ |
| FAQ heading size | 48px on desktop | 48px (`md:text-[48px]`) | ✓ |
| FAQ question size | 20px (Antonio) | 20px (`md:text-[20px]`) | ✓ |
| "BROWSE ALL" button font | Antonio, ~26px | Antonio, 18px | ✗ Size differs |
| Stat counter size | 60px (Antonio, bold) | 60px (Antonio, bold) | ✓ |
| Nav link font | Inter, ~14px | Inter, 14px (`text-sm`) | ✓ |

---

## 10. Color Differences

| Token | Original | Clone | Match? |
|-------|----------|-------|--------|
| Background | `rgb(26,26,27)` / `#1a1a1b` | `#1a1a1b` | ✓ |
| Foreground/text | `rgb(255,255,255)` | `#ffffff` | ✓ |
| Accent/lime | `rgb(208,255,113)` / `#d0ff71` | `#d0ff71` | ✓ |
| Card background | `rgb(48,48,48)` / `#303030` | `#303030` | ✓ |
| Border | `rgb(51,51,51)` / `#333333` | `#333333` | ✓ |
| Muted text | `rgb(181,181,181)` / `#b5b5b5` | `#b5b5b5` | ✓ |
| Nav background | `rgba(15,15,15,0.9)` | `rgba(15,15,15,0.9)` | ✓ |
| Green dot | `rgb(11,222,102)` / `#0bde66` | `#d0ff71` (lime, not green) | ✗ |
| Star rating color | Visible in original | `rgb(106,113,223)` (blue-ish) | Needs verify |
| Footer background | `rgb(208,255,113)` | `#d0ff71` | ✓ |

---

## 11. Structural / Content Issues

### 11a. Hero Section
- **Missing:** Back-view portrait image (exists in `/public/images/portrait-back.jpeg` but not rendered)
- **Missing:** 3D card-flip effect between front/back images
- **Missing:** Animated SVG line/divider between "DIGITAL" and "DESIGNER" (if present in original)
- **Issue:** "Hi" text color is `#303030` in clone but may differ in original

### 11b. Services Section
- **Missing:** Accordion expand/collapse behavior (all items always visible)
- **Missing:** `+` / `-` toggle icon for accordion

### 11c. Projects Section
- **Issue:** Project card links point to `href="#"` instead of `/projects/[slug]`
- **Missing:** Proper routing to project detail pages

### 11d. Blog Section
- **Issue:** Blog card links point to `href="#"` instead of `/blogs/[slug]`
- **Missing:** Proper routing to blog post pages
- **Difference:** "BROWSE ALL INSIGHTS" styled as text link, not pill button

### 11e. Contact Section
- **Issue:** Form inputs use Name/Email in a stacked layout; original may have them side-by-side
- **Issue:** "Hi" wave circle element positioning may differ from original

### 11f. Footer
- **Difference:** Original footer has a more structured 3-row layout (contact row, divider, copyright row). Clone uses a single flex row.
- **Missing:** Footer "Social :" label text before social icons
- **Missing:** Proper divider/separator between footer sections

### 11g. Green Dot Color
- **Original:** Uses `rgb(11, 222, 102)` (`#0bde66`) — a vivid green
- **Clone:** Uses `#d0ff71` (lime/chartreuse) — matches accent color but not the original green dot

---

## Summary

| Category | Issues Found |
|----------|-------------|
| Missing pages/routes | 9 pages missing |
| Missing sections | 5 full page layouts missing |
| Missing animations | 8 animation systems missing |
| Missing hover interactions | 7 hover behaviors missing or incomplete |
| Missing mouse follower | Entire system absent |
| Responsive behavior | Mostly implemented, minor gaps |
| Timing differences | 8 timing mismatches |
| Spacing differences | 2 notable spacing issues |
| Typography differences | 1 font size mismatch |
| Color differences | 1 color mismatch (green dot) |
| Structural/content issues | 7 issues |
