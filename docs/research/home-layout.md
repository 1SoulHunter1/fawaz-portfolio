# Phase 1 — DOM & Layout Analysis (Homepage)

> Source: https://portavia.framer.website/ at 1440×900 viewport

## Page Root

```
<body>
  └─ #main (1425×10478, block)
       └─ DIV (display: contents)
            └─ .framer-egmbj8 (1425×10478, flex column, bg: rgb(26,26,27), position: relative)
                 ├─ "Noise BG"       (fixed, z:0, 1425×900, opacity: 0.12)
                 ├─ Navbar container  (fixed, z:10, 508×56, top: 20px)
                 ├─ STYLE             (display: none — Framer internal)
                 ├─ Content wrapper   (display: contents, 7 child sections)
                 ├─ Footer container  (relative, z:9, 1425×205, y:10273)
                 ├─ "Get Template"    (fixed, z:1 — Framer badge, ignorable)
                 ├─ "New Release"     (fixed, z:1 — Framer badge, ignorable)
                 └─ Dark mode toggle  (fixed, z:1, 40×20, y:860)
       └─ Cursor element (fixed, z:13, 16×16, bg: rgb(208,255,113))
  └─ #__framer-badge-container (fixed, 1425×78 — Framer watermark)
```

## Page Sections (within content wrapper)

| # | Name          | Tag     | Width | Height | Y-offset | Display | Notes |
|---|---------------|---------|-------|--------|----------|---------|-------|
| 0 | OutterWraper  | DIV     | 1425  | 2700   | 0        | flex col | Contains Hero + Service + About via sticky scroll |
| 1 | Project       | SECTION | 1425  | 3893   | 2700     | flex row | "Featured Projects" |
| 2 | Testimonials  | SECTION | 1425  | 957    | 6593     | flex row | "What My Clients Say", z:1 |
| 3 | FAQ           | SECTION | 1425  | 824    | 7550     | flex row | "Frequently Asked Questions", z:1 |
| 4 | Blog          | SECTION | 1425  | 1037   | 8374     | flex row | "Design Insights & Ideas", z:1, overflow:hidden |
| 5 | Contact       | SECTION | 1425  | 861    | 9411     | flex row | "Let's work together", z:1, overflow:hidden |
| 6 | (empty)       | DIV     | 0     | 0      | 10273    | block    | Spacer/connector to footer |

**Total page height:** 10478px (sections + 205px footer)

## OutterWraper — Sticky Scroll Architecture

The first 2700px of the page uses a **sticky scroll** pattern where three full-viewport "panels" (Hero, Service, About) are revealed sequentially:

```
OutterWraper (1425×2700, flex column, relative)
  ├─ "Sticky Wrap" (1425×2700, flex, relative, z:1)
  │    └─ "Sticky Container" (1425×900, sticky, top:0, overflow:hidden, z:1)
  │         └─ display:contents wrapper
  │              └─ "Avatar Wrap" (340×476, relative)
  │                   ├─ "Avatar Card Flip" (340×476, relative)
  │                   │    ├─ "Avatar Card / Back" (absolute, overflow:hidden, border-radius:20px)
  │                   │    └─ "Avatar Card / Front" (absolute, overflow:hidden, border-radius:20px)
  │                   └─ "Hi" circle badge (absolute, 123×123, z:10)
  │
  └─ "Content" (1425×2700, absolute, top:0, flex column, z:1, overflow:hidden)
       ├─ Hero    (SECTION, 1425×900, y:0,    relative, z:1, overflow:hidden)
       ├─ Service (SECTION, 1425×900, y:900,  relative, z:1, overflow:hidden)
       └─ About   (SECTION, 1425×900, y:1800, relative, z:1, overflow:hidden)
```

### How the Sticky Scroll Works

1. `OutterWraper` is 2700px tall (3 × 900px viewport)
2. `Sticky Wrap` is also 2700px, creating the scroll track
3. `Sticky Container` is 900px with `position: sticky; top: 0` — stays pinned to viewport top
4. `Content` is positioned `absolute` at top:0 with 3 stacked sections (each 900px)
5. As user scrolls through the 2700px wrapper, the `Content` div scrolls WITHIN the sticky container
6. Result: 3 full-screen "slides" revealed sequentially while the avatar image stays pinned

## Hero Section Layout

```
SECTION "Hero" (1425×900)
  └─ "Container" (1200×900, flex row, gap: 370px, overflow:hidden)
       ├─ "Hero Heading Wrap / Left" (415×900, flex column, overflow:hidden)
       │    └─ "Heading Wrap" (303×132, flex column, y:384)
       │         ├─ "Text Wrap" (293×42, absolute, z:1, overflow:hidden, y:339)
       │         │    └─ "Duncan Robert" (32px, Antonio, uppercase)
       │         └─ DIV (293×132)
       │              └─ "digital" (120px, Antonio, bold, uppercase)
       │
       └─ "Hero Heading Wrap / Right" (415×900, flex column, overflow:hidden)
            └─ "Heading Wrap" (386×132, flex, gap:10px, y:384)
                 ├─ DIV (386×132)
                 │    └─ "designer" (120px, Antonio, bold, uppercase)
                 └─ "Text Wrap" (348×54, absolute, z:1, overflow:hidden, y:527)
                      └─ "I'm a US-based..." (18px, Inter, font-weight:300)
```

### Container Max-Width Pattern

Content containers throughout the page use `max-width: 1200px` (or actual width 1200px) centered within the 1425px page width. Padding on each side: `(1425 - 1200) / 2 = 112.5px`.

## Z-Index Stack

| Z-index | Element | Notes |
|---------|---------|-------|
| 13      | Custom cursor | Topmost, follows mouse |
| 10      | Navbar | Fixed, above all content |
| 9       | Footer | Above most content |
| 1       | Framer badges (Get Template, New Release, Dark toggle) | Fixed overlays |
| 1       | Content sections (Testimonials, FAQ, Blog, Contact) | Normal flow |
| 1       | Sticky Container + Content | Within OutterWraper |
| 0       | Noise BG | Fixed background texture |

## Responsive Notes (at 1440px)

- Page root is full-width (1425px = 1440 - 15px scrollbar)
- Content max-width: 1200px
- Hero splits into 2 columns (415px each) with 370px gap
- Service and About sections use 600px content column within 1200px container
- Grid layouts used for: Number Card Wrap, Contact Info Grid
- Social Icon Wrap: flex, gap: 20px, 4 icons × 30px each
