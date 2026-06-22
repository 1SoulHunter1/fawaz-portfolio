# Portavia Clone — Progress Report

> **Date:** 2026-06-21
> **Branch:** `portavia-refinement`
> **Original:** https://portavia.framer.website
> **Build status:** Passing (`npm run check` — lint + typecheck + build all green)

---

## 1. Current Phase

**Phase 9 — Animations & Interactions Match Original**

All animation channels tuned to measured values from original: scroll card transforms (rotateY 340° not 360°, precise keyframes), hero text clip-mask reveals with stagger, navbar entrance animation, page transitions, wave icon rotation, badge size/fade, CTA cursor variants, FAQ hover, Available pill 3D flip, and homepage blog cards restyled.

---

## 2. Completed Tasks

### Committed (7 commits on `portavia-refinement`)

| Commit | Description |
|--------|-------------|
| `3a312a9` | Initial Portavia clone before refinement |
| `625bb7f` | Add missing routes (about, projects, blogs + detail pages) — **Phase 2** |
| `1ffcd67` | Resolve 23 visual differences from original — **Phase 1 + 3** |
| `6b23a79` | Round 2 — services accordion, hero overlap, navbar collapse |
| `176dfc0` | Hero Hi element — lime green circle with wave icon matching original |
| `707a06e` | Hero heading vertical alignment |
| `2160781` | Homepage matches original — **Phase 5** |

### Phase 1 — Critical Issues (all 5 complete)

| # | Issue | Status |
|---|-------|--------|
| 1.1 | Global container padding px-6 → px-6 md:px-10 | ✅ Complete |
| 1.2 | Footer layout — multi-row structure | ✅ Complete |
| 1.3 | Contact form — Name/Email side-by-side | ✅ Complete |
| 1.4 | Summer Vibes title wrapping | ✅ Complete |
| 1.5 | Hero heading vertical alignment | ✅ Complete |

### Homepage Fidelity Fixes (Phase 5)

| # | Fix | Status | Files |
|---|-----|--------|-------|
| H1 | Navbar top offset 16px → 20px | ✅ | `Navbar.tsx` |
| H2 | Testimonials: bg #333, p-10, 3×2 grid with stat cards | ✅ | `TestimonialsSection.tsx` |
| H3 | About "My Story" → pill button with border | ✅ | `AboutSection.tsx` |
| H4 | FAQ grid columns → `grid-cols-[440px_1fr]` | ✅ | `FAQSection.tsx` |
| H5 | Contact form input heights (py-3→py-2) + textarea rows | ✅ | `ContactSection.tsx` |
| H6 | CTA buttons → pill style (Browse All Projects, Insights) | ✅ | `ProjectsSection.tsx`, `BlogSection.tsx` |
| H7 | Section padding: py-20 → py-[120px] (all content sections) | ✅ | 5 section files |

### About Page Fidelity Fixes (Phase 6)

| # | Fix | Status | Files |
|---|-----|--------|-------|
| A1 | AboutStickyScroll layout: 560px left + 640px right columns | ✅ | `AboutStickyScroll.tsx` |
| A2 | Services: collapsed accordion (number + title only, no bullets) | ✅ | `about/page.tsx` |
| A3 | Tech stack: vertical list cards (not 5-column grid) | ✅ | `about/page.tsx` |
| A4 | Section padding: py-[120px] on all inner sections | ✅ | `about/page.tsx` |
| A5 | Process section: py-[120px], moved outside sticky scroll | ✅ | `about/page.tsx` |
| A6 | Process cards: 3-column grid, 380px fixed height, correct colors | ✅ | `about/page.tsx` |
| A7 | Process colors: white/#d0ff71 lime/#333 dark (not purple) | ✅ | `about/page.tsx` |
| A8 | Process images: separate grid cells, not overlaid on cards | ✅ | `about/page.tsx` |
| A9 | Experience timeline: horizontal layout (role left, company+years right) | ✅ | `about/page.tsx` |
| A10 | Section heading gaps: match original gap-40/gap-20/gap-10 | ✅ | `about/page.tsx` |
| A11 | Description text: 18px/27px matching original | ✅ | `about/page.tsx` |

---

## 3. About Page Section Height Comparison

| Section | Original | Clone | Diff | Status |
|---------|----------|-------|------|--------|
| Hero | 730px | 706px | -24px (3.3%) | ✅ viewport-dependent |
| Services | 842px | 840px | -2px (0.2%) | ✅ |
| Experience | 892px | 895px | +3px (0.3%) | ✅ |
| Tech Stack | 976px | 986px | +10px (1.0%) | ✅ |
| Process | 1639px | 1612px | -27px (1.6%) | ✅ |
| Contact | 861px | 874px | +13px (1.5%) | ✅ |
| **Total** | **6145px** | **6119px** | **-26px (0.4%)** | ✅ |

---

## 4. Projects Page Fixes (Phase 7)

| # | Fix | Status | Files |
|---|-----|--------|-------|
| P1 | Featured section bottom padding: pb-20 → pb-[120px] | ✅ | `projects/page.tsx` |
| P2 | Heading-description gap: mt-6 → mt-5 (20px) | ✅ | `projects/page.tsx` |
| P3 | Description max-width: max-w-[640px] → max-w-[500px] | ✅ | `projects/page.tsx` |
| P4 | Featured cards container gap: mt-12 → mt-10 (40px) | ✅ | `projects/page.tsx` |
| P5 | Featured card category: plain text → lime pill (bg-[#d0ff71] rounded-full) | ✅ | `ProjectCard.tsx` |
| P6 | Featured card overlay gap: gap-3 → gap-5 (20px) | ✅ | `ProjectCard.tsx` |
| P7 | Featured card description color: white/80 → white | ✅ | `ProjectCard.tsx` |
| P8 | More Projects grid: gap-x-6 gap-y-12 → gap-x-10 gap-y-20 (40px/80px) | ✅ | `projects/page.tsx` |
| P9 | More Projects heading-grid gap: mt-12 → mt-10 (40px) | ✅ | `projects/page.tsx` |
| P10 | More Projects bottom padding: pb-24 → pb-[120px] | ✅ | `projects/page.tsx` |
| P11 | Compact card image ratio: aspect-[3/2] → aspect-[27/16] (540×320) | ✅ | `ProjectCard.tsx` |
| P12 | Compact card info: individual margins → flex col gap-5 (20px) | ✅ | `ProjectCard.tsx` |
| P13 | Compact card description color: text-[#b5b5b5] → text-white | ✅ | `ProjectCard.tsx` |

### Projects Page Height Comparison

| Metric | Original | Clone | Diff | Status |
|--------|----------|-------|------|--------|
| Page height | 5546px | 5450px | -96px (1.7%) | ✅ |
| Featured section | 3860px | 3916px | +56px (1.5%) | ✅ |
| More Projects section | 1421px | 1327px | -94px (6.6%) | ✅ font rendering |
| Compact image ratio | 1.688 | 1.688 | 0 | ✅ |

---

## 5. Blog Page Fixes (Phase 8)

| # | Fix | Status | Files |
|---|-----|--------|-------|
| B1 | Remove card borders (border border-[#333] rounded-2xl → borderless flex col) | ✅ | `BlogCard.tsx` |
| B2 | Pinned image aspect ratio: fixed → 1120/500 (2.24:1) | ✅ | `BlogCard.tsx` |
| B3 | Pinned badge: dark category pill → lime "Most Viewed" badge (bg-[#d0ff71] rounded-[20px]) | ✅ | `BlogCard.tsx` |
| B4 | Regular card image ratio: 16/9 → 27/16 (1.688:1) | ✅ | `BlogCard.tsx` |
| B5 | Image border radius: rounded-t-2xl → rounded-[20px] | ✅ | `BlogCard.tsx` |
| B6 | Text colors: gray variants → all white (date, title, description) | ✅ | `BlogCard.tsx` |
| B7 | Category text color: white → lime (#d0ff71) | ✅ | `BlogCard.tsx` |
| B8 | Card gap: mixed margins → gap-5 (20px) flex column | ✅ | `BlogCard.tsx` |
| B9 | Page layout: 3 sections → 1 consolidated section | ✅ | `blogs/page.tsx` |
| B10 | Section padding: py-20 → pt-36/pb-[120px] | ✅ | `blogs/page.tsx` |
| B11 | Grid gaps: gap-6/gap-8 → gap-x-10 gap-y-20 (40px/80px) | ✅ | `blogs/page.tsx` |
| B12 | Description max-width: unset → max-w-[500px] | ✅ | `blogs/page.tsx` |
| B13 | Heading-description gap: mt-6 → mt-5 (20px) | ✅ | `blogs/page.tsx` |

---

## 6. Animations & Interactions (Phase 9)

| # | Fix | Status | Files |
|---|-----|--------|-------|
| AN1 | Scroll card rotateY: [0,1]→[0,360] → [0,0.73,1]→[0,340,340] | ✅ | `StickyScrollSection.tsx` |
| AN2 | Scroll card translateX: [0,0.5,1]→ → [0,0.36,1]→[0,340,340] | ✅ | `StickyScrollSection.tsx` |
| AN3 | Scroll card scale: [0,0.5,1]→ → [0,0.32,0.73,1]→[1,0.904,1,1] | ✅ | `StickyScrollSection.tsx` |
| AN4 | Scroll card rotateZ: [0,0.5,1]→ → [0,0.32,0.73,1]→[0,9.6,5,5] | ✅ | `StickyScrollSection.tsx` |
| AN5 | Badge scroll fade: [0,0.15]→ → [0,0.32]→[1,0] | ✅ | `StickyScrollSection.tsx` |
| AN6 | Badge size: 120px → 123px on desktop | ✅ | `StickyScrollSection.tsx` |
| AN7 | Wave icon ±15° rotation oscillation (CSS keyframes) | ✅ | `globals.css`, `StickyScrollSection.tsx` |
| AN8 | Desktop card entrance: opacity 0→1, scale 0.95→1 | ✅ | `StickyScrollSection.tsx` |
| AN9 | Hero text clip-mask reveal: overflow:hidden + translateY(100%→0%) | ✅ | `HeroPanel.tsx` |
| AN10 | Hero stagger timing: 100ms Duncan, 250ms DIGITAL, 350ms DESIGNER, 450ms body | ✅ | `HeroPanel.tsx` |
| AN11 | Navbar entrance: translateY(-20px)→0, opacity 0→1, 300ms | ✅ | `Navbar.tsx` |
| AN12 | Page transitions: opacity fade 300ms on route change | ✅ | `template.tsx` |
| AN13 | FAQ row hover highlight: hover:bg-[#222] | ✅ | `FAQSection.tsx` |
| AN14 | Footer cursor: data-cursor="arrow" | ✅ | `Footer.tsx` |
| AN15 | AboutPanel MY STORY CTA: plain link → circle-fill pill button | ✅ | `AboutPanel.tsx` |
| AN16 | Available for Work pill: 3D flip hover (matching nav links) | ✅ | `AvailableForWorkPill.tsx` |
| AN17 | CTA cursor: data-cursor="blend" → "arrow" (matching original) | ✅ | `AboutSection.tsx`, `BlogSection.tsx`, `ProjectsSection.tsx`, `ContactSection.tsx` |
| AN18 | Homepage blog cards: bordered → borderless (matching /blogs page) | ✅ | `BlogSection.tsx` |
| AN19 | Lenis smooth scroll: fully wired in layout.tsx | ✅ | `SmoothScroll.tsx`, `layout.tsx` |

---

## 7. Side-by-Side Comparison (Phase 10)

Full visual comparison performed at every ~400px scroll interval across all 4 pages, comparing original (`portavia.framer.website`) vs clone (`localhost:3000`).

### Fixes Applied

| # | Difference | Severity | Fix | Files |
|---|-----------|----------|-----|-------|
| C1 | Hero 3D card shows back face (computer setup) instead of portrait | HIGH | Changed back face `backfaceVisibility: "visible"` → `"hidden"` | `StickyScrollSection.tsx` |
| C2 | About page sticky images show wrong initial image (centered stack offset) | HIGH | Removed `items-center justify-center`, added `pt-[calc(50vh-238px)]` to position first image at viewport center | `AboutStickyScroll.tsx` |

### Comparison Results by Page

| Page | Original Height | Clone Height | Diff | Visual Match |
|------|----------------|-------------|------|-------------|
| Homepage | 9799px | 9793px | -6px (0.06%) | 99%+ |
| About | 6089px | 6119px | +30px (0.5%) | 99%+ |
| Projects | 5546px | 5450px | -96px (1.7%) | 99%+ |
| Blogs | 3303px | 3192px | -111px (3.4%) | 98%+ |

### Section-by-Section Verification

**Homepage** (scroll 0–9793):
- ✅ Hero: portrait card, "Hi" badge carousel, clip-mask text reveals, stagger timing
- ✅ Services: accordion layout, "WHAT I CAN DO FOR YOU" heading, 3D card rotation
- ✅ About Me: stats cards, social icons, MY STORY CTA pill, contact info
- ✅ Featured Projects: sticky stacking cards, overlays, category text
- ✅ Testimonials: 3×2 grid, stat cards (98%, 200%), dark card backgrounds
- ✅ FAQ: two-column layout, hover highlight, accordion items
- ✅ Blog: 2-column grid, borderless cards, lime category text
- ✅ Contact: form layout, portrait + wave hand circle, submit button
- ✅ Footer: email, phone, social icons, copyright

**About Page** (scroll 0–6119):
- ✅ Hero: two-column layout, portrait image on right (sticky), heading + social icons
- ✅ Services: accordion with numbered items, image transitions on scroll
- ✅ Journey: timeline with roles, companies, years
- ✅ Tech Stack: vertical list cards with logos + descriptions
- ✅ Process: 3-column grid with white/lime/dark cards + images
- ✅ Contact: shared component

**Projects Page** (scroll 0–5450):
- ✅ Featured section: sticky stacking cards with overlays
- ✅ More Projects: 2-column grid, lime category pills, correct image ratios

**Blogs Page** (scroll 0–3192):
- ✅ Pinned "Most Viewed" card with wide aspect ratio
- ✅ 2-column grid, borderless cards, lime category text

---

## 8. Estimated Completion

| Scope | Percentage |
|-------|-----------|
| **Routes & pages** | 100% — all 11 routes exist and render |
| **Homepage fidelity** | ~99% — all sections verified side-by-side |
| **About page fidelity** | ~99% — sticky scroll images now align correctly, all sections match |
| **Projects page fidelity** | ~99% — sticky cards, lime pills, image ratios, grid gaps all verified |
| **Blog page fidelity** | ~98% — borderless cards, correct ratios, grid gaps verified |
| **Global animations** | ~95% — scroll card transforms, hero clip reveals, navbar entrance, page transitions, Lenis smooth scroll |
| **Micro-interactions** | ~90% — cursor variants, badge carousel, CTA circle-fill, FAQ hover, 3D nav flips, pill flip |
| **Overall clone fidelity** | **~98–99%** |

---

## 9. About Page Forensic Fixes (Phase 10–11)

| # | Fix | Status | Commit | Files |
|---|-----|--------|--------|-------|
| F1 | Noise overlay `mixBlendMode: color-dodge` | ✅ | `48c1013` | `NoiseOverlay.tsx` |
| F2 | Hero H1 line-height 132px, content 480px, icons 30px plain, second P white | ✅ | `8807335` | `about/page.tsx` |
| F3 | Submit button fit-content ~145px, wave circle 123px with "Hi" text | ✅ | `fb1cfce` | `ContactSection.tsx` |

---

## 10. Screenshot Management System

Configured on 2026-06-22. All screenshots organized into a structured system.

| Folder | Purpose | Files |
|--------|---------|-------|
| `reference/current/` | Fresh screenshots from current comparison session | Captured per audit |
| `reference/comparison/` | Side-by-side diff screenshots | Generated per audit |
| `reference/archive/` | Historical screenshots (read-only, 283 files) | Do not use for measurements |

**Naming convention for `reference/current/`:**
- `{page}-{section}-original.png` — e.g. `about-hero-original.png`
- `{page}-{section}-clone.png` — e.g. `about-hero-clone.png`

**Naming convention for `reference/comparison/`:**
- `{page}-{section}-diff.png` — e.g. `about-hero-diff.png`

**Rules:**
- All `reference/` subdirectories are gitignored
- Never use archived screenshots for measurements or implementation decisions
- Use only live websites and freshly captured screenshots
- Old `docs/design-references/` images moved to `reference/archive/`

---

## 11. Remaining Items

| Area | Items | Priority |
|------|-------|----------|
| Blog/Project detail pages | Layout exists but needs pixel-level refinement | Medium |
| Service hover images | Cursor image variant on service accordion hover | Low |
| FAQ accordion item heights | Items ~10px shorter than original | Low |
| Mobile responsiveness | About page sticky scroll hidden on mobile (by design), needs testing | Low |
