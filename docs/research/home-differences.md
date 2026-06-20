# Phase 8 — Comparison: Original vs Clone (Homepage)

> Original: https://portavia.framer.website/
> Clone: localhost:3000 (portavia-refinement branch)

## Critical Differences (Visual Impact: HIGH)

### 1. Missing Sticky Scroll Architecture

**Original:** Hero, Service, and About are inside a 2700px `OutterWraper` using `position: sticky` to create a 3-panel scroll-through experience where each section occupies exactly one viewport (900px) and reveals sequentially as the user scrolls.

**Clone:** All sections are stacked vertically in normal flow with individual padding (`py-20`). No sticky behavior, no panel-based scrolling. The user sees continuous scroll rather than section-locked panels.

**Impact:** Fundamental layout difference. The sticky scroll is the defining UX pattern of the homepage.

**Fix:** Wrap Hero, Service, About in a sticky container architecture:
```
OutterWraper (h: 300vh, relative)
  ├─ StickyWrap (h: 300vh, relative)
  │    └─ StickyContainer (h: 100vh, sticky top:0, overflow:hidden)
  │         └─ Avatar card (centered, z-index above)
  └─ Content (absolute, top:0, h:300vh, flex column)
       ├─ Hero (h: 100vh)
       ├─ Service (h: 100vh)
       └─ About (h: 100vh)
```

### 2. Missing Card Flip System

**Original:** Centered 340×476 portrait card with 3D flip (front face → back face) driven by scroll position through the sticky sections. Two different portrait images. `backfaceVisibility`, `matrix3d` transforms, perspective.

**Clone:** Single static image (`portrait-front.jpg`) in a simple `motion.div` with scale/opacity entrance animation. No second image, no 3D flip, no scroll-driven rotation.

**Impact:** Major interactive feature missing. The card flip is visually prominent and tied to the scroll experience.

**Fix:**
- Add second portrait image (back view — `portrait-back.jpg`)
- Create a CardFlip component with `transform-style: preserve-3d`
- Use `useScroll` + `useTransform` to drive `rotateY(0° → 180°)` based on scroll position within OutterWraper
- Front face: `backfaceVisibility: hidden`
- Back face: `backfaceVisibility: visible`, pre-rotated 180°

### 3. "DESIGNER" Text Style Wrong

**Original:** "DESIGNER" is solid white text (`rgb(255,255,255)`, Antonio 120px bold), same fill as "DIGITAL".

**Clone:** "DESIGNER" uses `WebkitTextStroke: 1.5px white` with `color: transparent` — making it an outlined/stroked text instead of solid white.

**Impact:** High — visually distinct. The outline treatment doesn't exist in the original.

**Fix:** Remove the `style={{ WebkitTextStroke: "1.5px white", color: "transparent" }}` and use the same class as "DIGITAL": `text-white`.

### 4. Hero Layout Structure Wrong

**Original:** Two-column layout (`gap: 370px`) with text split across left and right columns. "DIGITAL" on the left, "DESIGNER" on the right, card image centered between them (in a separate sticky layer).

**Clone:** Single-column stacked layout. Duncan Robert name, then card, then headings in a row below, then subtitle. The spatial relationship between text and image is completely different.

**Impact:** High — the original's two-column text-around-card layout is the hero's defining visual composition.

**Fix:** Restructure to two-column layout:
```
Container (max-w-1200, flex row, gap-[370px])
  ├─ Left column (w-[415px], flex column, justify-center)
  │    ├─ "Duncan Robert" (overflow clip container)
  │    └─ "DIGITAL" (h1)
  └─ Right column (w-[415px], flex column, justify-center)
       ├─ "DESIGNER" (h1, same y-position as DIGITAL)
       └─ Subtitle (overflow clip container)
```
Card sits in the sticky layer, centered independently.

### 5. "Duncan Robert" Typography Wrong

**Original:** Antonio 32px, weight 400, uppercase, `line-height: 41.6px`, positioned at y:339 (above headings at y:384).

**Clone:** `text-lg` (18px) with `tracking-[2px]` letter spacing, `font-light` (300). Much smaller and different weight/spacing than original.

**Impact:** Medium-high. Name label should be larger and in the heading font.

**Fix:** Change to `font-heading text-[32px] font-normal leading-[41.6px] uppercase text-white`.

### 6. Noise Texture Overlay Wrong

**Original:** Fixed-position GIF overlay covering full viewport, `opacity: 0.12`, `z-index: 0`. Uses an animated GIF (`AVsssNQRylEZc5orEWvz8Q1wQT4.gif`, 500×700) for film grain effect.

**Clone:** Section-local background with `opacity: 0.03`, `backgroundSize: 250px`, using `hero-pattern.gif`. Much less visible and only covers the hero section.

**Impact:** Medium. The noise texture sets the mood for the entire page.

**Fix:**
- Make it a global fixed overlay (in layout.tsx or a dedicated component)
- Use `position: fixed; inset: 0; z-index: 0; opacity: 0.12; pointer-events: none`
- Download the original noise GIF and use it
- Cover full viewport, not just hero

### 7. "Hi" Circle Badge Implementation

**Original:** 123×123px lime circle (`rgb(208,255,113)`) with 62×62 SVG wave icon (viewBox 1080×1080, fill: black). Positioned at bottom-left of the avatar card, partially extending outside. Has z:10 and 3D perspective transform.

**Clone:** 120×120px lime circle with emoji `👋` instead of the original SVG. Positioned below the hero content in normal flow, not attached to the card.

**Impact:** Medium. Size is close, but position and icon are wrong.

**Fix:**
- Extract the wave SVG from the original
- Position absolutely relative to the avatar card (bottom-left, extending outside)
- Size: 123×123 circle, 62×62 SVG
- Add 3D transform offset from card

## Moderate Differences (Visual Impact: MEDIUM)

### 8. Section Heights Not Viewport-Locked

**Original:** Each sticky section is exactly `100vh` (900px at 1440×900).

**Clone:** Sections have flexible heights with padding (`py-20`).

**Fix:** Within the sticky architecture, set each section to `h-screen` (100vh).

### 9. Service Section Content Width

**Original:** Content in a 600px column (left half of 1200px container).

**Clone:** Full-width within 1200px container.

**Fix:** Wrap service content in `max-w-[600px]`.

### 10. Service Accordion Checkmarks

**Original:** Checkmark icons are white/light, not colored. Service items use a specific chevron SVG.

**Clone:** Uses `rgb(106,113,223)` purple checkmarks (from an earlier color scheme).

**Fix:** Change checkmark color to white or lime.

### 11. Missing CTA Link Styles

**Original:** CTA links like "My Story", "Browse All Projects", "Browse All Insights" use Antonio 26px, weight 400, `rgb(208,255,113)`, uppercase.

**Clone:** Uses `CtaButton` component — need to verify it matches these specs.

### 12. Subtitle Font Size

**Original:** 18px, Inter, weight 300, `line-height: 27px`.

**Clone:** `text-lg` (18px) — correct size, but should verify weight is 300 (currently uses `font-light` which is correct).

### 13. Section Heading Scale

**Original:** Section headings are 60px Antonio bold uppercase with `line-height: 78px`.

**Clone:** Uses `text-[36px] md:text-[60px]` — responsive override is correct at desktop but should verify mobile size matches.

## Minor Differences (Visual Impact: LOW)

### 14. Mouse Cursor Z-Index

**Original:** z-index 13.

**Clone:** z-index 999.

**Fix:** Change to `z-[13]` for accuracy (though functionally equivalent).

### 15. Cursor Tracking Method

**Original:** Transform-based (`matrix(1,0,0,1,X,Y)`) with `top:0; left:0`.

**Clone:** Transform-based with `translate(-50%,-50%) translate3d(X,Y,0)` — functionally similar, slight centering difference.

### 16. Mouse Cursor Variants

**Original:** Has "Default" variant visible. Other variants unclear without interaction testing.

**Clone:** Has "default", "arrow" (expanded 70px), and "blend" (color-burn) variants. May have more features than the original.

### 17. Letter Spacing on Headings

**Original:** `-3.6px` on hero H1 (120px).

**Clone:** `tracking-[-3.6px]` — correct.

## What's Already Correct

- Page background color: `rgb(26, 26, 27)` / `#1a1a1b` ✓
- Font families: Antonio + Inter ✓
- Font loading: `next/font/google` with correct weights ✓
- Navbar: dark bg, 3D flip hover, circle-fill Contact button ✓ (fixed in earlier session)
- Navbar scroll threshold: 70px ✓
- Content max-width: 1200px ✓
- Custom cursor: 16px lime dot, pointer-events none ✓
- Smooth scroll (Lenis) ✓ (clone has it, original uses Framer's built-in)
- Section order: Hero → Services → About → Projects → Testimonials → FAQ → Blog → Contact → Footer ✓
- Color tokens: lime `#d0ff71`, dark bg `#1a1a1b`, nav bg `rgba(15,15,15,0.9)` ✓
- Available for Work pill: lime text, green pulsing dot ✓

## Implementation Roadmap (Priority Order)

### Phase A: Structural Foundation (Must-Fix)

1. **Sticky scroll architecture** — Build the OutterWraper/StickyContainer system
2. **Hero two-column layout** — Split text into left/right columns with 370px gap
3. **Card flip system** — Add second portrait, 3D flip with scroll-driven rotation
4. **Fix "DESIGNER" text** — Remove stroke, make solid white

### Phase B: Hero Polish

5. **Fix "Duncan Robert" typography** — Antonio 32px, weight 400
6. **Clip-reveal text animations** — overflow:hidden containers with slide-up entrance
7. **Hi circle badge** — Extract SVG, attach to card, correct position
8. **Global noise overlay** — Fixed GIF at 0.12 opacity covering full viewport

### Phase C: Section Refinements

9. **Viewport-lock sections** — h-screen for sticky panels
10. **Service content width** — 600px column
11. **Fix accordion checkmarks** — Change from purple to white
12. **CTA link styles** — Antonio 26px lime green

### Phase D: Animation & Polish

13. **Scroll-driven section reveals** — Each section animates in within sticky viewport
14. **Staggered entrance timing** — Match Framer's load sequence
15. **Card flip scroll interpolation** — Smooth rotateY from 0° to 180°
16. **Cursor z-index adjustment** — Change from 999 to 13

## Typography Reference (Complete Scale)

| Usage | Font | Size | Weight | Line-Height | Letter-Spacing | Transform |
|-------|------|------|--------|-------------|----------------|-----------|
| Hero H1 | Antonio | 120px | 700 | 132px | -3.6px | uppercase |
| Section H2 | Antonio | 60px | 700 | 78px | normal | uppercase |
| Blog card title | Antonio | 32px | 400 | 41.6px | normal | uppercase |
| Name label | Antonio | 32px | 400 | 41.6px | normal | uppercase |
| FAQ question | Antonio | 26px | 400 | 33.8px | normal | uppercase |
| CTA link | Antonio | 26px | 400 | 33.8px | normal | uppercase |
| Body text | Inter | 18px | 300 | 27px | normal | none |
| Stat label | Inter | 18px | 600 | 23.4px | normal | none |
| Nav links | Inter | 16px | 300 | — | normal | none |
| Card body | Inter | 14px | 300 | 21px | normal | none |
| Card name | Inter | 14px | 600 | 14px | normal | none |
| Tag/label | Inter | 14px | 300 | 21px | normal | none |
| Footer label | Inter | 14px | 300 | — | normal | none |
| Footer value | Inter | 18px | 300 | — | normal | none |
