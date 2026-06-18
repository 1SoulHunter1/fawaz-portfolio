# Portavia Clone — Implementation Roadmap

> Derived from: `audit.md`, `routes.md`, `animations.md`, `interactions.md`
> Date: 2026-06-18
> Branch: `portavia-refinement`
> Goal: Bring the clone to 1:1 fidelity with https://portavia.framer.website

---

## Phasing Strategy

Work is ordered by **dependency**, not just impact. Foundation first (shared
primitives + data), then the 9 missing pages that consume them, then the global
animation systems that wrap everything, then micro-interaction polish.

```
Phase 1  Foundation & Quick Wins   ──► unblocks every later phase
Phase 2  Missing Pages & Routes    ──► the 9 missing pages (highest visible gap)
Phase 3  Global Animation Systems   ──► cursor, 3D hero, transitions, scroll reveal
Phase 4  Micro-Interactions & Polish ──► accordions, hover fills, timing, noise
```

Current state recap: only `/` exists. All 10 homepage sections are present and
mostly styled correctly (colors, fonts, spacing verified in audit). The gaps are
(a) 9 missing routes, (b) the entire animation/cursor layer, (c) a handful of
structural/styling fixes on the existing homepage.

Installed-but-unused deps available to draw on: `motion` (Framer Motion),
`gsap`, `lenis`, `react-intersection-observer` (already used by counters).

---

## Phase 1 — Foundation & Quick Wins

**Objective:** Establish the shared data layer and reusable primitives every new
page depends on, and clear the cheap correctness bugs on the existing homepage.

### Files to modify
- `src/components/Navbar.tsx` — green dot color `#d0ff71` → `#0bde66`; extract nav links to a shared array; add `next/link` for real routes (`/about`, `/projects`, `/blogs`, `/#contact`)
- `src/components/ProjectsSection.tsx` — replace `href="#"` with `/projects/[slug]`; consume shared `ProjectCard` + project data
- `src/components/BlogSection.tsx` — replace `href="#"` with `/blogs/[slug]`; restyle "BROWSE ALL INSIGHTS" from text link to pill button; consume shared `BlogCard`
- `src/components/AboutSection.tsx` — restyle "MY STORY" from text link to pill button (`/about`)
- `src/components/Footer.tsx` — restructure into contact row + divider + copyright row; add "Social :" label
- `src/components/icons.tsx` — add any missing SVGs (arrow-up-right for cursor/CTA, plus/minus or chevron for accordions)
- `src/app/globals.css` — register design tokens used by buttons (pill padding `6px 40px 8px`, button font Antonio 26px)

### Components to create
- `src/components/ui/CtaButton.tsx` — pill button (`border-radius: 99px`, Antonio 26px, lime border, arrow icon). Single source for BROWSE ALL PROJECTS / INSIGHTS, MY STORY, SUBMIT, GET HIRE
- `src/components/ProjectCard.tsx` — featured (1120×746) + compact (540×511) variants; cover image, gradient overlay, category badge, title, description
- `src/components/BlogCard.tsx` — cover image, category badge, date, title, description; "Most Viewed" pinned variant
- `src/components/SectionHeading.tsx` — heading + subtitle pair (Antonio 60px + Inter 18px)
- `src/components/SocialLinks.tsx` — X / Instagram / Behance / Dribbble row (used in About, Contact, Footer)
- `src/data/projects.ts` — 8 projects: slug, title, category, description, metadata (year/industry/client/duration), cover + gallery image paths, problem/solution/challenge/summary copy
- `src/data/blogs.ts` — 6 posts: slug, title, category, date, excerpt, cover image, numbered content sections
- `src/data/navigation.ts` — shared nav link list
- `src/types/index.ts` — `Project`, `BlogPost`, `NavLink` interfaces

### Dependencies
- None new. Uses existing `next/link`, `next/image`, Tailwind.
- **Asset gap:** new project/blog images (Pantone, Intenza, VistaHaven, InnovateTech covers; project gallery shots; 4 additional blog covers; tech-stack logos) must be downloaded into `public/images/`. Scaffold `scripts/download-assets.*` or fetch from `framerusercontent.com`.

### Estimated impact
- **High leverage, low visible change.** Fixes 4 structural bugs (dead links, 2 mis-styled CTAs, footer, green dot) and creates the primitives that make Phase 2 fast. Without this, every page in Phase 2 reinvents cards/buttons.

### Risks
- **Data accuracy:** detail-page body copy (Problem/Solution/Challenge/Summary) was only partially captured in `routes.md` — some text must be re-scraped per project/blog to avoid placeholder content (violates "real content" principle in AGENTS.md).
- **Asset licensing/availability:** `framerusercontent.com` URLs may rate-limit or change; download early.
- **Card variant sprawl:** if `ProjectCard`/`BlogCard` aren't designed with all variants up front (featured vs compact vs pinned), Phase 2 will fork them.

---

## Phase 2 — Missing Pages & Routes

**Objective:** Build the 9 missing routes using Phase 1 primitives and data.

### Files to modify
- `src/components/ContactSection.tsx` — make reusable for `/about` (it already lives on `/`); verify Name/Email layout vs original
- `src/components/ServicesSection.tsx` — reuse on `/about` (condensed); accordion behavior lands in Phase 4

### Components to create
**Routes (App Router):**
- `src/app/about/page.tsx` — hero (ABOUT ME + DUNCAN ROBERT + portrait), bio + socials, services, journey timeline, tech stack, 5-step process, contact, footer
- `src/app/projects/page.tsx` — FEATURED PROJECTS (4 cards) + MORE PROJECTS grid (4 compact cards)
- `src/app/projects/[slug]/page.tsx` — `generateStaticParams` over 8 slugs; hero, metadata grid, content blocks (Problem/Solution/Challenge/Summary), image gallery, MORE PROJECTS (6), footer
- `src/app/blogs/page.tsx` — DESIGN INSIGHTS hero, MOST VIEWED pinned post, 6-card grid
- `src/app/blogs/[slug]/page.tsx` — `generateStaticParams` over 6 slugs; hero, numbered content sections, newsletter subscribe CTA, "More to Discover" related posts, footer

**Page-specific components:**
- `src/components/about/JourneyTimeline.tsx` — 4 roles (company, year range)
- `src/components/about/TechStack.tsx` — logo grid (56×56, 12px radius)
- `src/components/about/ProcessCards.tsx` — 5 asymmetric cards (white/lime/dark, 01–05)
- `src/components/project/ProjectMeta.tsx` — Year / Industry / Client / Duration grid
- `src/components/project/ContentBlock.tsx` — heading + body + image(s), reused by project & blog detail
- `src/components/blog/NewsletterCta.tsx` — lime subscribe card
- `src/components/MoreProjects.tsx` / `src/components/MoreToDiscover.tsx` — related-item grids with "Load More"

### Dependencies
- **Blocks on Phase 1** (cards, CtaButton, data files, types, downloaded assets).
- `generateStaticParams` for SSG of `[slug]` routes (Next 16 — confirm against `node_modules/next/dist/docs/` per AGENTS.md, as APIs may differ from training data).

### Estimated impact
- **Highest visible impact.** Closes the single largest gap (9 of the site's ~11 routes). Site becomes navigable end-to-end; nav links and card links from Phase 1 now resolve.

### Risks
- **Next.js 16 API drift:** `generateStaticParams`, metadata API, dynamic route conventions may differ from training data — must read the bundled docs before writing (explicit AGENTS.md instruction).
- **Content volume:** 8 project bodies + 6 blog bodies is substantial real-content work; risk of shipping placeholders.
- **Layout consistency:** project & blog detail templates must stay DRY (shared `ContentBlock`) or drift across 14 pages.
- **Image aspect ratios:** detail pages use specific sizes (1000×600 cover, 1000×450, 480×400) — mismatches break the pixel-perfect goal.

---

## Phase 3 — Global Animation Systems

**Objective:** Layer in the cross-cutting motion systems that wrap all pages.
These are independent of content, so Phase 3 can begin in parallel with Phase 2
once Phase 1 lands.

### Files to modify
- `src/app/layout.tsx` — mount `<CustomCursor />`, `<SmoothScrollProvider />`, and page-transition wrapper at root
- `src/components/Navbar.tsx` — text-swap hover (rotateX -90° dual-text), spring expand/collapse, scroll-hide
- `src/components/HeroSection.tsx` — 3D card-flip (front + back portrait, `preserve-3d`, mouse-track parallax), heading slide-in entrances
- `src/app/globals.css` — keep/extend keyframes; wire `fade-in-up` (currently defined but unused)

### Components to create
- `src/components/CustomCursor.tsx` — 16px lime circle (default) → 70px + arrow (project hover); spring follow `damping:60, stiffness:500`; hidden on touch; offset x:20 y:20. Variant context for hover targets
- `src/components/SmoothScrollProvider.tsx` — initialize Lenis (already installed; `html.lenis` class confirmed on original)
- `src/components/PageTransition.tsx` — opacity fade, 200ms tween, `ease cubic-bezier(0.27,0,0.51,1)`; enter delay 0 / exit delay 0.2 (from bundle)
- `src/components/ScrollReveal.tsx` — wrapper using `react-intersection-observer` + `motion`; spring (bounce 0, duration 1); slide/scale presets matching appear-id configs
- `src/hooks/useMousePosition.ts` — shared pointer tracking for cursor + hero parallax
- `src/hooks/useCursorVariant.ts` — context to let cards/buttons switch cursor state

### Dependencies
- `motion` (Framer Motion) — page transitions, scroll reveal, nav text-swap, hero parallax
- `lenis` — smooth scroll
- `gsap` — optional alternative for hero mouse-track interpolation (pick one of motion/gsap, not both, to avoid bloat)
- `react-intersection-observer` — already in use
- **Blocks on Phase 1** (cursor variant switching needs cards/buttons to exist); **lightly coupled to Phase 2** (transitions need multiple routes to be observable).

### Estimated impact
- **High perceived-quality impact.** This is the "Framer feel" — the cursor, 3D hero, and smooth transitions are what make the original read as premium. Closes the entire absent mouse-follower system + 4 missing animation systems.

### Risks
- **Performance:** custom cursor + Lenis + per-element scroll observers + 3D transforms can jank on low-end devices. Use `will-change`, GPU transforms, and `prefers-reduced-motion` fallbacks.
- **Hydration / SSR:** cursor, Lenis, and `window`-dependent hooks must be client-only (`"use client"`, guarded effects) to avoid Next 16 hydration mismatches.
- **Library overlap:** `motion` + `gsap` + `lenis` together risk scroll-handling conflicts (Lenis vs Framer `useScroll`). Decide ownership of the scroll loop early.
- **Reduced-motion accessibility:** all of these must degrade gracefully.
- **Matrix3d fidelity:** the hero's exact `matrix3d` tilt is hard to reproduce by hand; approximate with `rotateX/Y` + perspective and tune visually.

---

## Phase 4 — Micro-Interactions & Polish

**Objective:** Final fidelity pass — the small stateful interactions and timing
matches that close the remaining audit items.

### Files to modify
- `src/components/ServicesSection.tsx` — accordion: one-open-at-a-time, +/− toggle, height animation (Closed↔Open variants)
- `src/components/FAQSection.tsx` — verify chevron 180°, add row hover highlight, confirm timing
- `src/components/ui/CtaButton.tsx` — circle-fill hover (lime `Color BG` 15px → fills via inset), text color invert, arrow slide
- `src/components/HeroSection.tsx` / `src/components/ContactSection.tsx` — "Hi" circle expand-on-hover (20px → 180px)
- `src/components/Navbar.tsx` — green dot glow ring (40×40, opacity 0.5, pulse)
- `src/components/AboutSection.tsx` / `TestimonialsSection.tsx` — verify counter timing (~2000ms) matches original
- `src/components/ProjectCard.tsx` / `BlogCard.tsx` — image zoom + overlay deepen on hover (spring), blog border glow
- `src/components/SocialLinks.tsx` — icon fill color transition on hover
- `src/app/layout.tsx` or new `src/components/NoiseOverlay.tsx` — fixed noise GIF, `opacity 0.12`, `mix-blend-mode: color-dodge`, `z-index 0`

### Components to create
- `src/components/NoiseOverlay.tsx` — global grain texture
- `src/components/Accordion.tsx` (optional) — shared primitive if Services + FAQ converge

### Dependencies
- `motion` for spring-based accordion/hover; CSS where sufficient.
- **Blocks on Phase 1–3** (touches `CtaButton`, cards, Navbar, hero built earlier).
- **Asset gap:** noise texture GIF (original sources `framerusercontent.com/images/...gif`); source or recreate.

### Estimated impact
- **Medium impact, high finish.** Individually small, collectively the difference between "looks like it" and "indistinguishable." Closes the long tail: accordion, CTA fill, glow, hover timing, noise (~10 audit items).

### Risks
- **Diminishing returns vs effort:** easy to over-invest in pixel-chasing; timebox per item.
- **Timing subjectivity:** Framer spring values are approximated from the bundle (`stiffness/damping`) — exact match requires side-by-side comparison.
- **Accordion state conflicts:** Services and FAQ both need single-open logic; if not shared, two slightly different implementations drift.
- **Noise overlay blend mode:** `color-dodge` at 0.12 can wash out content on some backgrounds; verify across all pages.

---

## Cross-Phase Concerns

| Concern | Where addressed | Note |
|---------|-----------------|------|
| Real content (no placeholders) | Phase 1 data, Phase 2 bodies | Re-scrape detail copy; AGENTS.md hard rule |
| Asset downloads | Phase 1 (covers), Phase 4 (noise) | Front-load to avoid blocking pages |
| Next.js 16 API drift | Phase 2 (routing), Phase 3 (client boundaries) | Read `node_modules/next/dist/docs/` first |
| `prefers-reduced-motion` | Phase 3 + 4 | All motion must degrade |
| `npm run check` (lint+types+build) | Every phase | Gate each phase; TS strict, no `any` |
| Worktree-per-teammate + merge | If parallelized | Phases 2 & 3 are the natural parallel split |

## Suggested sequencing if parallelized
1. **Phase 1 solo** (foundation must land first — everything depends on it).
2. **Phase 2 and Phase 3 in parallel** on separate worktree branches (pages vs. animation systems are largely independent post-Phase-1).
3. **Phase 4 solo** after merge (touches artifacts from both 2 and 3).
