# Homepage — Full Reverse-Engineering Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20
> **Viewport:** 1452 × 732 (desktop, measured)
> **Page height:** 9974px
> **Method:** Chrome DevTools MCP — computed styles, `getBoundingClientRect()`, inline style extraction, scroll-position sampling

---

## Page Architecture

```
Total page height: 9974px

OutterWraper (0–2196px, h=2196, ~3× viewport)
├── Sticky Wrap   (z:1, position:relative, h:2196, full-page-width)
│   └── Sticky Container (position:sticky, top:0, h:1vh, flex center)
│       └── Avatar Wrap (340×476, perspective:1200px)
│           ├── Avatar Card Flip (preserve-3d, perspective:2000px)
│           │   ├── Avatar Card / Front (backface:hidden)
│           │   └── Avatar Card / Back  (backface:visible, rotateY:180deg)
│           └── "Text" badge (123px lime circle, overflow:hidden)
│               ├── "Hi" text slot (61.5×61.5)
│               └── "Hand Waving" SVG slot (61.5×61.5)
│
├── Content (z:1, position:absolute, inset:0, flex column)
│   ├── Hero    (0–732px, 100vh, flex center)
│   ├── Service (732–1464px, 100vh, flex center)
│   └── About   (1464–2196px, 100vh, flex center)

Project       (2196–6089px, h=3893)
Testimonials  (6089–7046px, h=957)
FAQ           (7046–7870px, h=824)
Blog          (7870–8907px, h=1037)
Contact       (8907–9769px, h=861)
Footer        (9769–9974px, h=205)
```

---

## 1. Hero Section (0–732px)

### Layout

```
Hero (w:1437, h:732, display:flex, align:center, justify:center, overflow:hidden)
└── Container (w:1200, h:732, display:flex, flex-direction:row, align:center, justify:center, gap:370px)
    ├── Hero Heading Wrap / Left (w:415, h:732, flex-col, align:flex-end, justify:center)
    │   └── Heading Wrap (w:303, h:132, flex-col, gap:0)
    │       ├── Text Wrap (w:293, h:41.6, overflow:hidden) ← clip-mask for "Duncan Robert" reveal
    │       │   └── <p> "Duncan Robert"
    │       ├── (spacer div, h:0)
    │       └── <h1> "digital"
    │
    └── Hero Heading Wrap / Right (w:415, h:732, flex-col, align:flex-start, justify:center)
        └── Heading Wrap (w:386, h:132, flex-row, gap:10px)
            ├── <h1> "designer"
            └── Text Wrap (w:348, h:54, overflow:hidden) ← clip-mask for body text reveal
                └── <p> "I'm a US-based digital designer and Framer developer"
```

The card (Avatar Wrap) is NOT inside the Hero — it floats in the Sticky Wrap layer above. The 370px gap between left/right columns creates visual space where the card appears.

### Typography

| Element | Font | Size | Weight | Line-height | Letter-spacing | Color | Transform |
|---------|------|------|--------|-------------|----------------|-------|-----------|
| "Duncan Robert" | Antonio | 32px | 400 | 41.6px | normal | `#ffffff` | uppercase |
| "digital" | Antonio | 120px | 700 | 132px | -3.6px | `#ffffff` | uppercase |
| "designer" | Antonio | 120px | 700 | 132px | -3.6px | `#ffffff` | uppercase |
| Body text | Inter | 18px | 300 | 27px | normal | `#ffffff` | none |

### Positions (at viewport 1452×732)

| Element | Top | Left | Width | Height |
|---------|-----|------|-------|--------|
| "Duncan Robert" | 255 | 235 | 178 | 41.6 |
| "digital" | 300 | 230 | 293 | 132 |
| "designer" | 300 | 903 | 386 | 132 |
| Body text | 443 | 942 | 348 | 54 |
| Card | 128 | 548 | 340 | 476 |
| Badge | 544 | 486 | 123 | 123 |

### Text Reveal Mechanism

Both "Duncan Robert" and the body text are wrapped in `overflow:hidden` divs called `Text Wrap`. The text child animates `translateY` from 100% to 0% (slides up into view). This creates the clipped text-reveal entrance effect.

---

## 2. Card (Avatar Wrap)

### Dimensions & Styling
- **Size:** 340 × 476px
- **Corner radius:** 20px (on front and back faces)
- **Front image:** `qrxY8NagVO40NBrdhFEGgFR3PYY.jpg` (340×476, object-fit:cover)
- **Back image:** `VRQgkdWsjawSg1qpCm45HfSY1I.jpeg` (340×476, object-fit:cover)

### Transform Hierarchy

```
Avatar Wrap
  inline: perspective(1200px)
  computed: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,-0.000833, 0,0,0,1)

  └── Avatar Card Flip
        inline: perspective(2000px)
        computed: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,-0.0005, 0,0,0,1)
        transformStyle: preserve-3d

        ├── Avatar Card / Front
        │     backfaceVisibility: hidden
        │     inline: translate(-50%, -50%) perspective(1200px)
        │
        └── Avatar Card / Back
              backfaceVisibility: visible
              transform: rotateY(180deg) (pre-rotated)
```

### Scroll-Driven Transform Keyframes

Sampled at 18 scroll positions across the 2196px OutterWraper:

| Scroll Y | Progress | translateX | scale | rotate (Z) | rotateY | Badge Opacity |
|-----------|----------|------------|-------|-------------|---------|---------------|
| 0 | 0.000 | 0 | 1.000 | 0° | 0° | 1.00 |
| 100 | 0.046 | 46.6 | 0.986 | 1.37° | 20.5° | 0.86 |
| 200 | 0.091 | 93.1 | 0.973 | 2.74° | 41.1° | 0.73 |
| 300 | 0.137 | 139.7 | 0.959 | 4.11° | 61.6° | 0.59 |
| 400 | 0.182 | 186.3 | 0.945 | 5.48° | 82.2° | 0.45 |
| 500 | 0.228 | 232.9 | 0.932 | 6.85° | 102.7° | 0.32 |
| 600 | 0.273 | 279.4 | 0.918 | 8.22° | 123.3° | 0.18 |
| 700 | 0.319 | 326.0 | 0.904 | 9.59° | 143.8° | 0.04 |
| 800 | 0.364 | **340** | 0.909 | 9.53° | 167.9° | **0** |
| 900 | 0.410 | 340 | 0.923 | 8.85° | 193.9° | 0 |
| 1000 | 0.455 | 340 | 0.937 | 8.16° | 219.8° | 0 |
| 1100 | 0.501 | 340 | 0.950 | 7.48° | 245.8° | 0 |
| 1200 | 0.546 | 340 | 0.964 | 6.80° | 271.7° | 0 |
| 1400 | 0.638 | 340 | 0.991 | 5.43° | 323.6° | 0 |
| 1600 | 0.729 | **340** | **1.00** | **5.00°** | **340°** | 0 |
| 1800 | 0.820 | 340 | 1.00 | 5.00° | 340° | 0 |
| 2000 | 0.911 | 340 | 1.00 | 5.00° | 340° | 0 |
| 2196 | 1.000 | 340 | 1.00 | 5.00° | 340° | 0 |

**Key observations:**
- **translateX:** Linear ramp 0 → 340px, clamps at 340 around progress 0.36
- **rotateY:** Linear 0 → 340° (not full 360°), clamps around progress 0.73
- **scale:** Eases from 1.0 → 0.904 (minimum at ~progress 0.32) → back to 1.0 at ~0.73
- **rotateZ:** Ramps 0 → 9.6° peak, then settles to 5° at ~0.73 and holds
- **Badge opacity:** Linear fade 1 → 0, fully invisible by progress ~0.32 (scroll Y ~700px)
- **All values clamp and hold** from ~progress 0.73 onward (card finishes transforming in the Service panel)

### Derived Transform Functions

```
scrollProgress = scrollY / 2196

translateX: lerp([0, 0.36], [0, 340])  → clamp(340)
rotateY:    lerp([0, 0.73], [0, 340])  → clamp(340)
scale:      ease([0, 0.32, 0.73], [1.0, 0.904, 1.0])
rotateZ:    ease([0, 0.32, 0.73], [0, 9.6, 5.0])
badge:      lerp([0, 0.32], [1, 0])    → clamp(0)
```

---

## 3. Hi Badge

### Structure

```
"Text" (w:123.08, h:123.08, border-radius:99px, bg:#d0ff71, overflow:hidden, position:relative)
└── inner div (w:61.54, h:61.54, centered)
    └── carousel div (flex-col, transform: translateY animated)
        ├── slot 1 — "Hi" text container (w:61.54, h:61.54, align:center, justify:flex-end, overflow:hidden)
        │   └── <p> "Hi" (font:Inter 40px 400, color:#303030)
        └── slot 2 — "Hand Waving" wrapper (w:61.54, h:61.54, overflow:hidden)
            └── <svg> viewBox="0 0 1080 1080" (animated waving hand, 2 paths)
```

### Position Relative to Card

| Metric | Value |
|--------|-------|
| Badge top relative to card bottom | -60.3px (overlaps card by ~60px) |
| Badge left relative to card left | -62.4px (extends ~62px to the left) |
| Badge center | ~(547, 605) relative to viewport |

### Badge Carousel Animation

- **Mechanism:** Parent carousel div has `translateY` animated between two positions
- **Slot size:** Each slot is exactly `123/2 = 61.5px` (half the badge diameter)
- **"Hi" position:** `translateY(0)` — text visible in the top half
- **Wave position:** `translateY(-50%)` — shifts up by one slot height
- **At rest measurement:** `transform: matrix(1, 0, 0, 1, 0, 12.77)` — indicating ~12.8px offset (mid-animation captured)
- **Hi font:** Inter, 40px, weight 400 (not 600), color `#303030`
- **SVG hand:** viewBox `0 0 1080 1080`, 2 paths, animated via SVG transform (`matrix(0.9998, -0.0186, 0.0186, 0.9998, ...)` — subtle rotation oscillation)
- **Badge opacity:** Fades 1 → 0 linearly from scroll 0 → ~700px

---

## 4. Background / Noise Overlay

### Noise BG Element

```
[data-framer-name="Noise BG"]
├── position: fixed
├── top: 0, left: 0
├── width: 100vw (1437px), height: 100vh (732px)
├── z-index: 0
├── opacity: 0.12
├── mix-blend-mode: color-dodge
├── pointer-events: auto
│
└── child div (position:absolute, fills parent)
    ├── background-image: url("...AVsssNQRylEZc5orEWvz8Q1wQT4.gif?width=500&height=700")
    ├── background-size: 250px
    ├── background-repeat: repeat
    ├── opacity: 1
    └── mix-blend-mode: normal
```

### Key Details
- **GIF source:** `AVsssNQRylEZc5orEWvz8Q1wQT4.gif` (500×700 original, displayed at 250px tiles)
- **Blend mode:** `color-dodge` on the parent — this is critical. It lightens the dark background with the grain pattern.
- **Opacity:** 0.12 (12%)
- **Coverage:** Fixed to viewport, tiles repeat to cover
- **Movement:** The GIF itself animates (film grain flicker), creating subtle movement. No CSS animation needed.

### Body Background
- `rgb(26, 26, 27)` / `#1a1a1b`

### Color BG Element (Contact Button)
- A 20×20px lime `#d0ff71` circle used for the nav Contact button's hover-fill animation
- `position: absolute`, `z-index: 1`

---

## 5. Section-by-Section Text Specification

### 5.1 Hero (0–732px)

See Section 1 above.

### 5.2 Services (732–1464px)

```
Service (h:732, display:flex, align:center, justify:center, overflow:hidden)
└── Container (w:1200)
    └── Service Column (w:600, flex-col, gap:40px)
        ├── Text Wrap
        │   ├── <h2> "WHAT I CAN DO FOR YOU" (Antonio 60px 700, lh:78px, #fff, uppercase)
        │   └── <p> "As a digital designer..." (Inter 18px 300, lh:27px, #fff)
        │
        └── Desktop / Closed (w:600, flex-col, gap:0)
            ├── [spacer, h:0]
            ├── accordion item (h:83)
            │   └── Top [data-framer-cursor="m5u3ny"]
            │       ├── <h3> "1. ui/ux design" (Antonio 32px 400, lh:41.6px, #fff, uppercase)
            │       └── chevron (30×30)
            ├── accordion item (h:83) [cursor:12j85ib]
            ├── accordion item (h:83) [cursor:l38x1i]
            └── accordion item (h:83) [cursor:16q859]
```

- **Column max-width:** 600px, left-aligned within 1200px container
- **Gap between heading block and accordion:** 40px
- **Accordion item height:** 83px each (closed)
- **Total accordion height:** 332px (4 × 83)

### 5.3 About (1464–2196px)

```
About (h:732, display:flex, align:center, justify:center, overflow:hidden)
└── Container (w:1200)
    └── About Wrap (w:600, flex-col, gap:40px)
        ├── Text Wrap (h:169, flex-col, gap:10px)
        │   ├── <h2> "ABOUT ME" (Antonio 60px 700, lh:78px, #fff, uppercase)
        │   └── <p> "Hi, I'm Duncan..." (Inter 18px 300, lh:27px, #fff)
        │
        ├── Number Card Wrap (w:600, grid 200px×3)
        │   ├── stat: "12" / "Years of Experience"
        │   ├── stat: "270" / "Completed Projects"
        │   └── stat: "50+" / "Clients on Worldwide"
        │
        ├── Contact Info Grid (w:600, grid 200px×3)
        │   ├── "Call Today : +1 (555) 123-4567"
        │   └── "Email : designer@example.com"
        │
        ├── Social Icon Wrap (w:180, flex, gap:20px)
        │   ├── X (30×30)
        │   ├── Instagram (30×30)
        │   ├── Behance (30×30)
        │   └── Dribbble (30×30)
        │
        └── "My Story" CTA link [parent cursor: 1hyjosv]
```

- **Stats layout:** CSS Grid with 3 columns of 200px each, no gap
- **Stats data:** Numbers displayed as large text with label below (not in lime cards — those are in the standalone About PAGE, not the homepage About PANEL)
- **Contact info:** Same 3-column grid, 2 items
- **Social icons:** 30×30px each, 20px gap between them

### 5.4 Projects (2196–6089px, h=3893)

```
Project
└── Container (w:1200)
    ├── Text Wrap
    │   ├── <h2> "Featured Projects" (Antonio 60px 700, lh:78px, #fff, uppercase)
    │   └── <p> description (Inter 18px 300, lh:27px, #fff)
    │
    ├── Featured Project Wrap (w:1120)
    │   ├── Featured Project - 1 (w:1120, h:747, position:sticky)
    │   │   ├── Project Cover (w:1120, h:747)
    │   │   │   └── <img> (object-fit:cover)
    │   │   ├── Overlay Gradient (position:absolute, inset:0, z:1)
    │   │   │   └── linear-gradient(rgba(12,12,13,0.45) 0%, rgba(12,12,13,0.8) 100%), opacity:0.6
    │   │   └── Project Info (position:absolute, z:1, flex-col center, gap:20px)
    │   │       ├── category label (14px 300, #fff)
    │   │       ├── <h2> title (Antonio 60px 700, lh:78px, #fff, text-align:center)
    │   │       └── <p> description (14px 300, lh:21px, #fff)
    │   ├── Featured Project - 2 (same, sticky)
    │   ├── Featured Project - 3 (same, sticky)
    │   └── Featured Project - 4 (same, sticky)
    │
    └── "Browse All Projects" CTA [parent cursor: 1hyjosv]
```

- **Card stacking:** Each `Featured Project` is `position: sticky` — they stack on scroll
- **Overlay gradient:** `linear-gradient(rgba(12,12,13,0.45) 0%, rgba(12,12,13,0.8) 100%)` at 60% opacity
- **Info layer:** Centered flex-column with 20px gap

### 5.5 Testimonials (6089–7046px, h=957)

```
Testimonials
└── Container (w:1200)
    ├── Text Wrap
    │   ├── <h2> "What My Clients Say" (Antonio 60px 700, lh:78px, #fff)
    │   └── <p> description (Inter 18px 300, lh:27px)
    │
    └── Testimonial Grid (w:1120, grid: 360px×3, rows: 239px×2, gap:20px)
        ├── [0,0] Testimonial Card (360×239, bg:#333, r:20px, p:40px)
        ├── [0,1] Achieve Number (360×239, bg:#fff, r:20px, p:40px)  ← stat "98%" 
        ├── [0,2] Testimonial Card
        ├── [1,0] Achieve Number ← stat "200%"
        ├── [1,1] Testimonial Card
        └── [1,2] Testimonial Card
```

- **Grid:** 3 columns × 2 rows, 360×239px cells, 20px gap
- **Testimonial bg:** `#333333` (rgb 51,51,51)
- **Achieve bg:** `#ffffff` (white — NOT lime as in clone)
- **Star icons:** 20 total (5 per testimonial), 18×18px, color `#d0ff71` (lime, not purple)
- **Padding:** 40px inside each card

### 5.6 FAQ (7046–7870px, h=824)

```
FAQ
└── Container (w:1200)
    ├── FAQ Column / Sticky (w:440, position:sticky, top:100px)
    │   └── Text Wrap
    │       ├── <h2> "Frequently Asked Questions" (Antonio 60px 700, lh:78px)
    │       └── <p> description
    │
    └── Desktop (w:600, 6 FAQ items + spacer = 7 children)
        └── each item: question <h3> + answer <p>
```

- **Layout:** 2-column, left column (440px) is `position: sticky, top: 100px`
- **Right column:** 600px wide, contains 6 FAQ accordion items

### 5.7 Blog (7870–8907px, h=1037)

```
Blog
└── Container (w:1200)
    ├── Text Wrap
    │   ├── <h2> "Design Insights & Ideas" (Antonio 60px 700, lh:78px)
    │   └── <p> description
    │
    ├── Desktop [blog card] (w:540, h:491) × 2 side by side
    │   ├── image area (w:540, h:320, border-radius: top)
    │   └── text area (category badge, date, title h3 32px 400, description)
    │
    └── "Browse All Insights" CTA [parent cursor: 1hyjosv]
```

### 5.8 Contact (8907–9769px, h=861)

```
Contact
└── Container (w:1200)
    ├── Avatar Column (w:560)
    │   ├── Avatar Wrap → Avatar Image (340×476, r:20px)
    │   │   └── <img> qrxY8...jpg (same as card front)
    │   └── Hi badge (123×123, r:99px, bg:#d0ff71, "Hi" text inside)
    │
    └── Contact Column (w:560)
        ├── Text Wrap
        │   ├── <h2> "LET'S WORK TOGETHER" (Antonio 60px 700, lh:78px, #fff, uppercase)
        │   └── <p> description
        │
        └── Desktop (form)
            ├── Name input (placeholder:"John Smith")
            ├── Email input (placeholder:"johnsmith@gmail.com")
            ├── Service select (Branding, Web Design, UI/UX)
            ├── Textarea (placeholder:"Hello, I'd like to enquire about...")
            └── Submit button (w:145, h:50, r:99px, p:"6px 40px 10px")
```

### 5.9 Footer (9769–9974px, h=205)

- **Background:** `#d0ff71` (lime)
- **Content:** Email link, phone link, social icons, credits
- **Width:** Full page (1437px)

---

## 6. Floating Elements Inventory

### 6.1 Hi Badge (in Sticky Wrap)
- **Size:** 123 × 123px
- **Shape:** `border-radius: 99px` (circle)
- **Color:** `#d0ff71`
- **Position:** Relative to Avatar Wrap, offset ~(-62, -60) from card bottom-left corner
- **Contains:** Vertical carousel — "Hi" text (Inter 40px 400) + wave SVG (viewBox 0 0 1080 1080, 2 paths with subtle rotation oscillation)
- **Overflow:** Hidden (only one slot visible at a time)
- **Scroll behavior:** Fades to opacity 0 by scroll position ~700px

### 6.2 Green Cursor Dot

```
[data-framer-name="Default"]
├── position: fixed
├── z-index: 13
├── width: 16px, height: 16px
├── border-radius: 99px
├── background-color: #d0ff71
├── pointer-events: none
├── mix-blend-mode: normal
├── transform: translate(x, y) — follows mouse with lerp
```

- **Variants via `data-framer-cursor` IDs:**
  - `17ph7dh` — unknown (possibly default/arrow)
  - `m5u3ny` — service item 1 (cursor shows image)
  - `12j85ib` — service item 2
  - `l38x1i` — service item 3
  - `16q859` — service item 4
  - `1hyjosv` — CTA links (arrow expand variant)
  - `1bde3zh` — project cards + nav links

### 6.3 Card (in Sticky Wrap)
- The 340×476px portrait card floats in the Sticky Wrap z-layer
- Stays centered in viewport while content scrolls beneath (z:1 content layer, card above at z:1 sticky)
- Transforms driven by scroll progress (see Section 2 above)

### 6.4 Hi Badge (in Contact Section)
- **Size:** 123 × 123px (same dimensions as hero badge)
- **Shape:** `border-radius: 99px`
- **Color:** `#d0ff71`
- **Content:** "Hi" text
- **Position:** Below the contact avatar image, left-aligned

---

## 7. Color Palette (Extracted)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `rgb(26, 26, 27)` / `#1a1a1b` | Page background |
| Navbar BG | `rgba(15, 15, 15, 0.9)` | Navbar with backdrop-blur |
| Primary text | `rgb(255, 255, 255)` / `#ffffff` | All headings and body text |
| Accent (lime) | `rgb(208, 255, 113)` / `#d0ff71` | Badges, cursors, CTAs, footer, stat labels |
| Card dark | `rgb(48, 48, 48)` / `#303030` | Testimonial cards, input bg |
| Border | `rgb(51, 51, 51)` / `#333333` | Dividers, card borders |
| Muted text | `rgb(181, 181, 181)` / `#b5b5b5` | Secondary labels |
| Black | `rgb(0, 0, 0)` / `#000000` | Footer social icon bg |
| Overlay dark | `rgba(12, 12, 13, 0.45–0.8)` | Project card gradient overlay |
| Available green | `rgb(11, 222, 102)` / `#0bde66` | Available-for-work dot |

---

## 8. Typography Scale

| Level | Font | Size | Weight | Line-height | Letter-spacing |
|-------|------|------|--------|-------------|----------------|
| H1 (hero) | Antonio | 120px | 700 | 132px | -3.6px |
| H2 (section) | Antonio | 60px | 700 | 78px | normal |
| H3 (accordion/sub) | Antonio | 32px | 400 | 41.6px | normal |
| Subtitle (hero) | Antonio | 32px | 400 | 41.6px | normal |
| CTA text | Antonio | 26px | 400 | — | normal |
| Body | Inter | 18px | 300 | 27px | normal |
| Small | Inter | 14px | 300 | 21px | normal |
| Caption | Inter | 12px | — | — | normal |
| Badge "Hi" | Inter | 40px | 400 | — | normal |
| Stat number | Antonio | 60px | 700 | 60px | normal |
