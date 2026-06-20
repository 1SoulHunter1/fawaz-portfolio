# Implementation Plan — Portavia Clone Refinement

> **Generated:** 2026-06-20
> **Source data:** `final-differences.md`, `DIFFERENCES_REPORT.md`, `RAW_FINDINGS/`, `animations.md`, `interactions.md`, full codebase read
> **Total issues:** 42 visual differences + 7 missing animations + 6 missing interactions = 55 items
> **Constraint:** Minimize regressions — each phase is self-contained, testable, and does not break prior work

---

## Execution Principles

1. **Global fixes first** — one change to container padding resolves ~12 issues across all pages
2. **Shared components before pages** — fixing `Footer.tsx` or `BlogCard.tsx` propagates to every page that uses them
3. **Layout before aesthetics** — structural fixes (side-by-side forms, grid ratios) before pixel-polish (border radius, text color)
4. **Animations after layout** — scroll-driven effects depend on correct section heights and positions
5. **Run `npm run check` after every phase** — lint + typecheck + build must pass before moving on
6. **Visual verify in browser after each phase** — compare with original at `portavia.framer.website`

---

## Phase 1 — Critical Issues (Global + Layout Breaks)

> These are the highest-leverage fixes. Two changes resolve ~16 issues across all 4 pages.

### 1.1 Global Container Padding

| Field | Value |
|-------|-------|
| **Priority** | P0 — highest impact single fix |
| **Effort** | Small (30 min) |
| **Resolves** | H3 (partial), M1, M2, M15, M16, plus all per-page left-offset entries (#11, #13, #22, #32, #38, #44, #53) |
| **Dependencies** | None |
| **Order** | First |

**Problem:** Every `px-6` (24px) content container should be `px-10` (40px) to match the original's effective padding within the 1200px max-width. This causes a 16px left offset on all content and makes all cards/images 32px too wide (1152 vs 1120px).

**Files:**
- `src/app/page.tsx` — no direct `px-6` (delegates to child components)
- `src/components/ProjectsSection.tsx:44` — `px-6` → `px-10`
- `src/components/TestimonialsSection.tsx:106` — `px-6` → `px-10`
- `src/components/FAQSection.tsx:51` — `px-6` → `px-10`
- `src/components/BlogSection.tsx:31` — `px-6` → `px-10`
- `src/components/ContactSection.tsx:21` — `px-6` → `px-10`
- `src/components/AboutSection.tsx:35` — `px-6` → `px-10`
- `src/components/Footer.tsx:25` — `px-6` → `px-10`
- `src/app/about/page.tsx:381` — Process section `px-6` → `px-10`
- `src/app/projects/page.tsx:24,51` — both sections `px-6` → `px-10`
- `src/app/blogs/page.tsx:24,39,49` — all sections `px-6` → `px-10`
- `src/components/AboutStickyScroll.tsx:39` — `px-6` → `px-10`
- `src/components/AboutPanel.tsx:43` — `px-6` → `px-10`
- `src/components/HeroPanel.tsx:19` — `px-6` → `px-10`

**Verification:**
1. `npm run check` — build must pass
2. Browse to `localhost:3000` — headings should now align at left=200.4px
3. Project cards should be 1120px wide, not 1152px
4. Check all 4 pages: homepage, `/about`, `/projects`, `/blogs`

**Regression risk:** LOW — padding change only; all content flows within the same container. The hero section uses a `gap-[370px]` layout that might need minor adjustment if the wider padding changes the available space. Check hero visually.

---

### 1.2 Footer Component — Missing Content

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Effort** | Medium (45 min) |
| **Resolves** | H1, #33, #42, #52, #60 (footer on all 4 pages) |
| **Dependencies** | 1.1 (padding fix) |
| **Order** | Second |

**Problem:** Footer is 88px tall vs original's 205px. The original has a multi-row layout:
- Row 1: Navigation links (Home, About, Projects, Blogs, Contact) spread horizontally
- Row 2: Email + Phone + Social icons
- Row 3: Copyright + Creator credit

Current footer only has a single row with email, phone, socials, and copyright crammed together.

**Files:**
- `src/components/Footer.tsx` — restructure layout to add nav links row, spacer/divider, and proper multi-row arrangement

**Verification:**
1. Footer should be ~205px tall
2. Check all 4 pages share the same updated footer
3. All links functional (Home, About, Projects, Blogs, Contact)
4. Mobile: footer should stack gracefully

**Regression risk:** LOW — Footer is a leaf component, no other component depends on its internals.

---

### 1.3 Contact Form — Name/Email Side-by-Side

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Effort** | Small (15 min) |
| **Resolves** | H2, #29 |
| **Dependencies** | 1.1 (padding affects column width) |
| **Order** | Third |

**Problem:** Name and Email inputs are stacked vertically. Original places them side-by-side in a row, each ~270px wide (half of ~560px form column minus gap).

**Files:**
- `src/components/ContactSection.tsx:48-70` — Wrap the Name and Email `div.flex-col` blocks in a `flex flex-row gap-6` wrapper on `md:` and above

**Verification:**
1. Desktop: Name and Email side-by-side, each ~50% width
2. Mobile: Name and Email stacked (responsive)
3. Focus border still works on both fields

**Regression risk:** LOW — isolated form layout change.

---

### 1.4 "Summer Vibes" Title Wrapping

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Effort** | Small (15 min) |
| **Resolves** | H3, #21, #47 |
| **Dependencies** | 1.1 (padding fix changes available width) |
| **Order** | Fourth (after padding fix — may self-resolve) |

**Problem:** "SUMMER VIBES FESTIVAL CAMPAIGN" wraps to 2 lines (156px) instead of 1 line (78px) at 60px font size. The title container `max-w-[756px]` may be too narrow after accounting for padding, or the title needs `whitespace-nowrap` or a wider container.

**Files:**
- `src/components/ProjectsSection.tsx:80` — The h2 has `max-w-[756px]`. This should be sufficient. After padding fix, verify if wrapping persists.
- `src/components/ProjectCard.tsx:61` — Same h2 with `max-w-[756px]` for featured variant
- If still wrapping: check if the original uses tighter letter-spacing or a slightly smaller font for this particular title

**Verification:**
1. After padding fix, check if title now fits on one line
2. If not, adjust max-width or letter-spacing
3. Check all 4 project titles remain readable

**Regression risk:** LOW — only affects project title containers.

---

### 1.5 Hero Heading Vertical Alignment

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Effort** | Medium (30 min) |
| **Resolves** | H8, #4, M4, M6, #5, #8 |
| **Dependencies** | 1.1 |
| **Order** | Fifth |

**Problem:** The h1 "DIGITAL" and "DESIGNER" headings are at different Y coordinates than the original. Left column text is flush-left instead of flush-right (~88px off). "Duncan Robert" text position is also off.

**Files:**
- `src/components/HeroPanel.tsx:19-42` — The flex layout uses `justify-center` and `gap-[370px]`. The left column (`lg:w-[415px]`) needs its text right-aligned to match the original. Check if `text-right` or `items-end` on the left column fixes the alignment.

**Verification:**
1. "DIGITAL" and "DESIGNER" should appear at the same Y coordinate as in the original
2. "Duncan Robert" should be right-aligned in the left column
3. Card still centers correctly between the two columns
4. Mobile layout unaffected

**Regression risk:** MEDIUM — hero layout is tightly coupled with the 3D card positioning. Test card position after changes.

---

## Phase 2 — Missing Sections & Structural Fixes

### 2.1 Blog Images — Border Radius

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Effort** | Small (15 min) |
| **Resolves** | H7, #55, M14 |
| **Dependencies** | None |
| **Order** | First in Phase 2 |

**Problem:** All blog card images have `borderRadius: 0px` — original uses `borderRadius: 20px`. Also, process step images on the about page have `borderRadius: 0px` vs original's 20px.

**Files:**
- `src/components/BlogCard.tsx:27` — Add `rounded-[20px]` to the image container div for pinned variant
- `src/components/BlogCard.tsx:58` — Add `rounded-[20px]` to the image container div for default variant
- `src/app/about/page.tsx:193-207` — Process card images already have `rounded-[20px]` on the wrapper div, but verify the `Image` itself picks it up via `overflow-hidden`

**Verification:**
1. `/blogs` page — all images have rounded corners
2. Homepage blog section — blog card images have rounded corners
3. `/about` page — process section images have rounded corners

**Regression risk:** LOW — purely visual, no layout impact.

---

### 2.2 Featured Blog Image Aspect Ratio

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Effort** | Small (15 min) |
| **Resolves** | H6, #54 |
| **Dependencies** | 2.1 |
| **Order** | Second |

**Problem:** Featured (pinned) blog image is `aspect-[16/9]` (1.78:1) producing 648px height. Original is 1120×500px (2.24:1 ratio).

**Files:**
- `src/components/BlogCard.tsx:25` — Change `aspect-[16/9]` to `aspect-[112/50]` or use a fixed height approach: `h-[500px]` instead of aspect ratio

**Verification:**
1. `/blogs` page — featured blog image should be ~500px tall, not ~648px
2. Image still covers the container fully (no stretching/letterboxing)

**Regression risk:** LOW — only affects pinned blog card variant.

---

### 2.3 About Page Service Accordion — Default Collapsed

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Effort** | Medium (30 min) |
| **Resolves** | H4, #39 |
| **Dependencies** | None |
| **Order** | Third |

**Problem:** About page services are rendered as always-expanded static lists (no accordion). Original shows them collapsed (83px per item) with click-to-expand. The about page should use the same accordion pattern as the homepage `ServicePanel`.

**Files:**
- `src/app/about/page.tsx:277-298` — Replace the static `StaggerReveal` of service items with an accordion component (either reuse the `ServicePanel` accordion pattern or create a local accordion state)

**Changes:**
1. Add `useState` for managing open/closed state per service item
2. Wrap each service item's `<ul>` in a `grid-rows-[0fr]/[1fr]` animated container
3. Add a click handler on the service title to toggle
4. Add chevron icon that rotates 180° when open

**Verification:**
1. `/about` — services section shows 4 collapsed items
2. Clicking a title expands to show bullet list
3. Page height decreases significantly (~400–500px shorter)
4. Sticky scroll image animation still works correctly after height change

**Regression risk:** MEDIUM — changing the content height affects the `AboutStickyScroll` scrollYProgress calculations. The sticky image animation is tied to total content height. Test image scrolling behavior after this change.

---

### 2.4 Project Card Height

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Effort** | Small (20 min) |
| **Resolves** | H10, #20 |
| **Dependencies** | 1.1 |
| **Order** | Fourth |

**Problem:** Homepage project cards are 888px tall vs original's 746px. The extra 141px comes from the info area below the image.

**Files:**
- `src/components/ProjectsSection.tsx:64-88` — The project card uses `aspect-[3/2]` which at 1120px width gives 747px — close to original. But the info overlay text may be pushing the card taller. Check if the `<Link>` block itself or the wrapper `div.sticky` has extra padding contributing to the height.

**Verification:**
1. Each project card should be ~747px tall (matching 3:2 aspect at 1120px)
2. Text overlay is still centered and readable
3. Sticky stacking still works

**Regression risk:** LOW — the aspect-[3/2] ratio should handle this. Check if there's extra padding or margin below cards.

---

### 2.5 About Page Hero Position

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Effort** | Small (10 min) |
| **Resolves** | H9, #37 |
| **Dependencies** | 1.1 |
| **Order** | Fifth |

**Problem:** About page h1 is at top=176px vs original's top=105px. The `pt-36 md:pt-44` (144px / 176px) is too much.

**Files:**
- `src/app/about/page.tsx:219` — Change `pt-36 pb-16 md:pt-44` to approximately `pt-24 pb-16 md:pt-[105px]` to place the h1 closer to top=105px. Account for navbar height.

**Verification:**
1. `/about` — h1 should start near top=105px on desktop
2. Navbar should not overlap the heading
3. Mobile: heading should still have adequate top clearance

**Regression risk:** LOW — isolated padding change on about page hero only.

---

### 2.6 Testimonials — Verify Brickwork Grid

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Medium (30 min) |
| **Resolves** | M10, M11, #23, #24 |
| **Dependencies** | 1.1 |
| **Order** | Sixth |

**Problem:** Original testimonials use a brickwork/offset 3-column grid: 4 testimonial cards staggered across 2 rows with 2 stat cards in the center column. Need to verify clone matches this pattern.

**Current layout in clone:** 3 columns — left: 2 testimonials, center: 2 stats, right: 2 testimonials. This IS the brickwork pattern already. But card styling needs verification:
- Original: `bg=#333`, `360×239px`, `borderRadius=20px`, `padding=40px`
- Clone: `bg-[#303030]`, `rounded-[20px]`, `p-6` (24px)

**Files:**
- `src/components/TestimonialsSection.tsx:62` — Change `p-6` to `p-10` (40px) on TestimonialCard
- Verify `bg-[#303030]` vs original's `#333` — may need adjustment to `bg-[#333]`

**Verification:**
1. Card backgrounds match `#333333`
2. Card padding is 40px
3. Brickwork layout visually matches original
4. Card dimensions approximately match 360×239px

**Regression risk:** LOW — styling-only changes on self-contained cards.

---

## Phase 3 — Animations

### 3.1 About Page Sticky Scroll Refinement

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Effort** | Large (90 min) |
| **Resolves** | H5, #41 |
| **Dependencies** | 2.3 (accordion fix changes content height), 1.1, 2.5 |
| **Order** | First in Phase 3 |

**Problem:** `AboutStickyScroll.tsx` is already implemented with the basic sticky scroll + image translateY. However, the interaction between the accordion fix (2.3) and the scroll progress may need recalibration. The original also has a slight 3D perspective on the card stack that may be missing.

**Files:**
- `src/components/AboutStickyScroll.tsx` — After the accordion fix, the total content height changes, which affects `scrollYProgress`. The `useScroll` hook automatically recalculates based on the wrapper ref, so this may self-resolve. Verify.

**Current status:** The `AboutStickyScroll` component IS implemented (lines 1-75). Task #56 from the existing task list is marked as in-progress. The core architecture is present — what may need tuning:
1. Right column width: currently `flex-1` but should be fixed at ~640px
2. Card stack gap: cards are flush (no gap), but original may have slight spacing
3. 3D perspective: original has a subtle matrix3d transform with translateX offset and skew — not present in clone

**Changes:**
1. After 2.3 completes, verify the scroll-driven image animation still transitions smoothly
2. Add subtle 3D perspective transform if original has one
3. Fix right column width to `w-[640px]` if needed

**Verification:**
1. `/about` — scroll through page, images should transition smoothly from card 1 → 4
2. Images should not jump or lag significantly
3. At each content section boundary, the correct image should be centered in view
4. Mobile: static image fallback still works

**Regression risk:** MEDIUM — scroll-driven animations are sensitive to content height changes. Must test after 2.3.

---

### 3.2 Page Transitions

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Medium (45 min) |
| **Resolves** | animations.md §4 "Page transitions" |
| **Dependencies** | None (can be done in parallel with other Phase 3 items) |
| **Order** | Second |

**Problem:** Original has an opacity fade between routes (~200ms). Clone does hard navigation.

**Files:**
- `src/app/template.tsx` — Already exists. Check if it wraps children in a `motion.div` with fade animation. If not, add:
  ```tsx
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
    {children}
  </motion.div>
  ```

**Verification:**
1. Navigate between pages — should see a subtle opacity fade
2. No flash of unstyled content
3. Scroll position resets correctly on page change

**Regression risk:** LOW — template.tsx wraps all pages uniformly. AnimatePresence may be needed for exit animations.

---

### 3.3 CTA Button Circle-Fill Animation

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Medium (30 min) |
| **Resolves** | interactions.md §5.1 "CTA circle-fill hover" |
| **Dependencies** | None |
| **Order** | Third |

**Problem:** Circle-fill hover animation exists on Submit/Contact buttons but is missing on CTA links: "Browse All Projects", "Browse All Insights", "My Story".

**Files:**
- `src/components/CtaButton.tsx` — Already exists. Check if it has the circle-fill animation.
- `src/components/ProjectsSection.tsx:93-103` — "Browse All Projects" link. Wrap with `CtaButton` or add circle-fill inline.
- `src/components/BlogSection.tsx:78-85` — "Browse All Insights" link. Same treatment.
- `src/components/AboutPanel.tsx:145-150` — "My Story" link
- `src/components/AboutSection.tsx:101-107` — "My Story" link (standalone section version)

**Verification:**
1. Hover each CTA link — lime circle should expand from edge
2. Text stays readable above circle
3. Arrow icon remains visible
4. Click navigation still works

**Regression risk:** LOW — visual-only enhancement on existing links.

---

### 3.4 Lenis Smooth Scroll Verification

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Small (15 min) |
| **Resolves** | interactions.md §6.1 |
| **Dependencies** | None |
| **Order** | Fourth |

**Problem:** Lenis is installed and `SmoothScroll.tsx` exists, but smooth scroll may not be fully active.

**Files:**
- `src/components/SmoothScroll.tsx` — Verify Lenis is properly initialized and wrapping the app
- `src/app/layout.tsx` — Check that `SmoothScroll` wraps the page content

**Verification:**
1. Scroll the page — movement should be buttery smooth with momentum
2. `html.lenis` class should be present on the `<html>` element
3. Anchor links (#contact) should smooth-scroll

**Regression risk:** LOW — Lenis is an overlay behavior; if broken, scroll just reverts to browser default.

---

## Phase 4 — Interactions

### 4.1 FAQ Row Hover Highlight

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (10 min) |
| **Resolves** | interactions.md §3.2, L6 |
| **Dependencies** | None |
| **Order** | First in Phase 4 |

**Files:**
- `src/components/FAQSection.tsx:65` — Add `hover:bg-[#222]` or similar subtle background highlight on the FAQ item wrapper div

**Verification:**
1. Hover each FAQ row — subtle background change visible

**Regression risk:** NONE.

---

### 4.2 FAQ Grid Proportions

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Small (10 min) |
| **Resolves** | M12, L7, #25, #27 |
| **Dependencies** | 1.1 |
| **Order** | Second |

**Problem:** FAQ accordion column is 662px wide (should be 600px). Left column is ~480px (should be 440px). Current grid: `md:grid-cols-[1fr_1.5fr]`.

**Files:**
- `src/components/FAQSection.tsx:51` — Change `md:grid-cols-[1fr_1.5fr]` to `md:grid-cols-[440px_1fr]` with `max-w-[600px]` on the right column, or `md:grid-cols-[440px_600px]` with justified spacing

**Verification:**
1. FAQ left column heading area is ~440px wide
2. FAQ accordion items are ~600px wide
3. Responsive: mobile still stacks properly

**Regression risk:** LOW — isolated grid change.

---

### 4.3 Blog Description Text Color

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Small (5 min) |
| **Resolves** | M18, #57 |
| **Dependencies** | None |
| **Order** | Third |

**Problem:** Blog card description text is `text-[#b5b5b5]` (gray). Original uses `rgb(255,255,255)` (white).

**Files:**
- `src/components/BlogCard.tsx:44,77` — Change description `text-[#b5b5b5]` to `text-white`
- `src/components/BlogSection.tsx:68` — Same change for homepage blog cards

**Verification:**
1. Blog card descriptions are white on `/blogs` and homepage

**Regression risk:** NONE.

---

### 4.4 Blog Intro Paragraph Width

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Small (5 min) |
| **Resolves** | M19, #59 |
| **Dependencies** | None |
| **Order** | Fourth |

**Problem:** Blogs page intro paragraph is 640px wide. Original is 500px.

**Files:**
- `src/app/blogs/page.tsx:29` — Change `max-w-[640px]` to `max-w-[500px]`

**Verification:**
1. `/blogs` — intro paragraph narrower, matches original

**Regression risk:** NONE.

---

### 4.5 AboutSection — Stats, Button, Contact Info

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Medium (30 min) |
| **Resolves** | M7, M8, M9, #14, #15, #17 |
| **Dependencies** | 1.1 |
| **Order** | Fifth |

**Problem:** Several medium-severity differences in the homepage About/CTA panel:
1. Stats counters structure may differ
2. "My Story" button is 122×39 vs original's 166×48
3. Contact info grid layout differs (label+value arrangement)

**Files:**
- `src/components/AboutPanel.tsx:87-116` — Contact info grid. Verify layout matches original's two-column arrangement with proper font sizes and weights.
- `src/components/AboutPanel.tsx:145-150` — "My Story" button sizing. Check if padding/font-size matches original's 166×48px dimensions.
- `src/components/AboutSection.tsx` (standalone version) — May need similar adjustments.

**Verification:**
1. Stats counters display correctly with proper structure
2. "My Story" button approximately matches 166×48px
3. Contact info labels ("Call Today:", "Email:") are properly styled and positioned

**Regression risk:** LOW — contained within about panel component.

---

### 4.6 Projects Page — Featured Card Border Radius & More Projects Grid

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Small (20 min) |
| **Resolves** | M15, M17, #49, #51 |
| **Dependencies** | 1.1 |
| **Order** | Sixth |

**Problem:**
1. Featured project cards have `rounded-[20px]` — original may have no rounding on featured cards (images fill edge-to-edge). Needs visual verification.
2. "More Projects" card images are 564×376px vs original's 540×320px (will partially resolve with 1.1 padding fix). Remaining aspect ratio difference: clone uses `aspect-[3/2]` (1.5:1) but original is 540:320 = 1.6875:1.

**Files:**
- `src/components/ProjectCard.tsx:46` — Featured variant: verify if `rounded-[20px]` should be removed
- `src/components/ProjectCard.tsx:21` — Compact variant: change `aspect-[3/2]` to `aspect-[54/32]` or `aspect-[27/16]` to match original's 1.6875:1 ratio

**Verification:**
1. Featured cards: edges match original (rounded or sharp)
2. More Projects cards: image aspect ratio matches original
3. Card spacing looks correct

**Regression risk:** LOW.

---

## Phase 5 — Responsive Fixes

### 5.1 Mobile Padding Consistency

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Effort** | Small (20 min) |
| **Resolves** | Mobile-specific regressions from 1.1 |
| **Dependencies** | 1.1 (must be complete) |
| **Order** | First in Phase 5 |

**Problem:** Changing `px-6` to `px-10` on desktop is correct but 40px padding on mobile (320px screens) leaves only 240px for content — too narrow. Need to keep `px-6` on mobile and use `px-10` only on `md:` breakpoint and above.

**Files:**
- All files changed in 1.1 — ensure padding is `px-6 md:px-10` not just `px-10`

**Verification:**
1. Mobile (375px): content has 24px side padding (adequate)
2. Tablet (768px+): content has 40px side padding (matches original)
3. Desktop (1200px+): container maxes at 1200px with 40px inner padding = 1120px content

**Regression risk:** LOW if done as part of 1.1. HIGH if 1.1 used `px-10` without the `md:` prefix.

---

### 5.2 Navbar Top Offset

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (5 min) |
| **Resolves** | M3, #1 |
| **Dependencies** | None |
| **Order** | Second |

**Problem:** Nav wrapper is at `top-4` (16px). Original is at 20px from top.

**Files:**
- `src/components/Navbar.tsx:130` — Change `top-4` to `top-5` (20px)

**Verification:**
1. Navbar sits 20px from top edge on desktop

**Regression risk:** NONE.

---

### 5.3 About Page Mobile Fallback

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (15 min) |
| **Resolves** | Mobile layout on `/about` |
| **Dependencies** | 2.3 (accordion state), 3.1 (sticky scroll) |
| **Order** | Third |

**Problem:** Mobile about page currently renders content via `lg:hidden` fallback in `AboutStickyScroll`. After the accordion fix (2.3), ensure mobile layout still works correctly with collapsed accordions.

**Files:**
- `src/components/AboutStickyScroll.tsx:72` — Verify mobile fallback renders `{children}` without sticky behavior
- `src/app/about/page.tsx` — Check mobile image display

**Verification:**
1. `/about` on mobile (375px): all sections visible, scrollable
2. Service items interactive (if accordion)
3. No horizontal overflow

**Regression risk:** LOW.

---

## Phase 6 — Polish

### 6.1 H1 Width Shrink-Wrap

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (10 min) |
| **Resolves** | L2, L10, #6, #43, #48 |
| **Dependencies** | None |
| **Order** | First in Phase 6 |

**Problem:** Several headings fill their parent width instead of shrink-wrapping to text content.

**Files:**
- `src/app/about/page.tsx:221` — Add `w-fit` to h1
- `src/app/projects/page.tsx:53` — "More Projects" h2: add `w-fit`

**Verification:** Headings only as wide as their text content.

**Regression risk:** NONE.

---

### 6.2 Featured Blog Description Font Size

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (5 min) |
| **Resolves** | L11, #58 |
| **Dependencies** | None |
| **Order** | Second |

**Files:**
- `src/components/BlogCard.tsx:44` — Change pinned variant description from `text-base` (16px) to `text-sm` (14px)

**Regression risk:** NONE.

---

### 6.3 Contact Form Input Heights

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (10 min) |
| **Resolves** | L5 (#30), L6 (#31) |
| **Dependencies** | 1.3 |
| **Order** | Third |

**Problem:** Input height 48.8px vs 43.2px. Textarea height 120.8px vs 140px.

**Files:**
- `src/components/ContactSection.tsx` — Adjust `py-3` on inputs to `py-2.5` and textarea `rows={4}` to `rows={5}` or add `min-h-[140px]`

**Regression risk:** NONE.

---

### 6.4 About Page H1 Line Height

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (5 min) |
| **Resolves** | L9, #36 |
| **Dependencies** | None |
| **Order** | Fourth |

**Problem:** About h1 height 120px vs original's 132px.

**Files:**
- `src/app/about/page.tsx:221` — Adjust `leading-[120px]` to `leading-[132px]` for the lg breakpoint

**Regression risk:** NONE.

---

### 6.5 Description Left Indent + Nav Z-Index

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Effort** | Small (10 min) |
| **Resolves** | L1, L3, #2, #9 |
| **Dependencies** | None |
| **Order** | Fifth |

**Files:**
- `src/components/Navbar.tsx:130` — Nav z-index is already `z-50`, which is higher than original's 10. This is intentional (keeps nav above sticky sections). Leave as-is unless it causes overlap issues.
- `src/components/HeroPanel.tsx:76` — Description has no left indent. Original shows ~40px indent. Add `ml-10` or `pl-10` if needed.

**Regression risk:** NONE.

---

## Recommended Execution Sequence

```
Phase 1 (Critical)         ~2.5 hours
  1.1 → 1.2 → 1.3 → 1.4 → 1.5
  npm run check + browser verify

Phase 2 (Structural)       ~2.5 hours
  2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6
  npm run check + browser verify

Phase 3 (Animations)       ~3 hours
  3.1 → 3.2 → 3.3 → 3.4
  npm run check + browser verify

Phase 4 (Interactions)     ~1.5 hours
  4.1 → 4.2 → 4.3 → 4.4 → 4.5 → 4.6
  npm run check + browser verify

Phase 5 (Responsive)       ~1 hour
  5.1 → 5.2 → 5.3
  npm run check + browser verify (mobile + desktop)

Phase 6 (Polish)           ~45 min
  6.1 → 6.2 → 6.3 → 6.4 → 6.5
  npm run check + final full-site browser verify
```

**Total estimated effort:** ~11 hours

---

## Regression Checklist (run after each phase)

- [ ] `npm run check` passes (lint + typecheck + build)
- [ ] Homepage: hero layout, card animation, services accordion, projects, testimonials, FAQ, blog, contact, footer
- [ ] `/about`: hero, services (collapsed), timeline, tech stack, process, sticky image animation, footer
- [ ] `/projects`: featured cards stacking, "More Projects" grid, footer
- [ ] `/blogs`: featured blog card, grid cards, footer
- [ ] Mobile (375px): all pages layout without horizontal overflow
- [ ] Tablet (768px): all pages layout transitions correctly
- [ ] Custom cursor: all variants (default, arrow, blend, image) working
- [ ] Smooth scroll: Lenis active, no jank
- [ ] Page transitions: fade between routes (after Phase 3)

---

## Parallelizable Work

The following items have NO dependencies on each other and can be worked on simultaneously by separate agents in worktree branches:

**Batch A (can run in parallel):**
- 1.2 (Footer) — `Footer.tsx` only
- 2.1 (Blog border radius) — `BlogCard.tsx` only
- 4.3 (Blog text color) — `BlogCard.tsx`, `BlogSection.tsx`
- 4.4 (Blog intro width) — `blogs/page.tsx`

**Batch B (can run in parallel after 1.1):**
- 1.3 (Contact form) — `ContactSection.tsx`
- 4.2 (FAQ grid) — `FAQSection.tsx`
- 2.6 (Testimonials) — `TestimonialsSection.tsx`

**Must be sequential:**
- 1.1 → 5.1 (padding fix then responsive guard)
- 2.3 → 3.1 (accordion fix then sticky scroll verification)
- 1.1 → 1.4 → 1.5 (padding → title check → hero alignment)
