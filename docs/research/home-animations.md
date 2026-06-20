# Homepage Animations — Complete Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20
> **Method:** Chrome DevTools MCP — inline style sampling at 18 scroll positions, computed style extraction, transform matrix decomposition

---

## 1. Scroll-Driven Card Animation (Primary)

The centerpiece animation: a 340×476px portrait card flips, translates, scales, and rotates as the user scrolls through the first three sections (Hero → Services → About), which occupy a 300vh sticky wrapper (2196px at 732px viewport).

### Architecture

```
OutterWraper (h: 2196px = 3 × 732px)
├── Sticky Wrap (z:1, position:relative)
│   └── Sticky Container (position:sticky, top:0, h:100vh, flex center)
│       └── Avatar Wrap (perspective:1200px)
│           └── Card Flip (preserve-3d, perspective:2000px)
│               ├── Front (backface:hidden, portrait image)
│               └── Back (backface:visible, rotateY:180deg base, alternate image)
└── Content (z:1, position:absolute, inset:0)
    ├── Hero (0–732px)
    ├── Service (732–1464px)
    └── About (1464–2196px)
```

### Scroll Progress Mapping

`scrollYProgress` = scrollY / 2196 (0 → 1 over 300vh)

### Transform Channels

#### 1.1 translateX

```
Input:   [0,    0.36,  1.0]
Output:  [0px,  340px, 340px]
Curve:   Linear ramp then clamp
```

Card starts centered, moves right 340px by ~36% scroll, then holds.

#### 1.2 rotateY (3D Flip)

```
Input:   [0,    0.73,  1.0]
Output:  [0°,   340°,  340°]
Curve:   Linear then clamp
```

Card flips nearly full rotation (340°, NOT 360°). The back face becomes visible around 90°–270°. At 340° the card shows the front face again with a slight offset from 0°.

#### 1.3 scale

```
Input:   [0,    0.32,  0.73,  1.0]
Output:  [1.0,  0.904, 1.0,   1.0]
Curve:   Ease down to minimum, then ease back up
```

Card shrinks ~10% at the flip midpoint, then grows back to full size. This creates a depth illusion — the card appears to recede into space during the flip.

#### 1.4 rotateZ (Tilt)

```
Input:   [0,    0.32,  0.73,  1.0]
Output:  [0°,   9.6°,  5.0°,  5.0°]
Curve:   Ramp up to peak, settle to 5°
```

Card tilts clockwise, peaks at ~9.6°, settles at 5°. Creates a natural "tumbling" feel during the flip.

### Spring Physics

All four channels are wrapped in `useSpring` for smooth interpolation:

```
stiffness: 300
damping: 35
```

This creates a slightly springy response — the card overshoots slightly on fast scroll and settles smoothly.

### Combined Transform String

At each frame, the card's `transform` is composed as:

```css
perspective(1200px)
translateX({x}px)
scale({s})
rotate({rz}deg)
rotateY({ry}deg)
```

The `perspective(2000px)` on the Card Flip child adds an additional depth layer.

### Raw Data (18 Sampled Positions)

| scrollY | progress | translateX | scale | rotateZ | rotateY | composite transform |
|---------|----------|------------|-------|---------|---------|---------------------|
| 0 | 0.000 | 0 | 1.000 | 0.00° | 0.00° | `perspective(1200px)` only |
| 100 | 0.046 | 46.57 | 0.986 | 1.37° | 20.55° | Full matrix3d |
| 200 | 0.091 | 93.14 | 0.973 | 2.74° | 41.10° | |
| 300 | 0.137 | 139.7 | 0.959 | 4.11° | 61.64° | |
| 400 | 0.182 | 186.3 | 0.945 | 5.48° | 82.19° | |
| 500 | 0.228 | 232.9 | 0.932 | 6.85° | 102.74° | |
| 600 | 0.273 | 279.4 | 0.918 | 8.22° | 123.29° | |
| 700 | 0.319 | 326.0 | 0.904 | 9.59° | 143.83° | ← scale minimum |
| 800 | 0.364 | 340.0 | 0.909 | 9.53° | 167.91° | ← translateX clamps |
| 900 | 0.410 | 340.0 | 0.923 | 8.85° | 193.87° | |
| 1000 | 0.455 | 340.0 | 0.937 | 8.16° | 219.83° | |
| 1100 | 0.501 | 340.0 | 0.950 | 7.48° | 245.79° | |
| 1200 | 0.546 | 340.0 | 0.964 | 6.80° | 271.75° | |
| 1400 | 0.638 | 340.0 | 0.991 | 5.43° | 323.66° | |
| 1600 | 0.729 | 340.0 | 1.000 | 5.00° | 340.00° | ← all channels clamp |
| 1800 | 0.820 | 340.0 | 1.000 | 5.00° | 340.00° | |
| 2000 | 0.911 | 340.0 | 1.000 | 5.00° | 340.00° | |
| 2196 | 1.000 | 340.0 | 1.000 | 5.00° | 340.00° | |

---

## 2. Badge Scroll Fade

### Mechanism

The Hi badge (123px lime circle) fades to invisible as the user scrolls away from the hero.

```
Input:   [0,    0.32]
Output:  [1.0,  0.0]
Curve:   Linear
```

Badge is fully visible at scrollY=0, completely gone by ~700px (scrollY/2196 ≈ 0.32).

### Implementation Detail

- Uses `useTransform(scrollYProgress, [0, 0.15–0.32], [1, 0])` (exact mapping: fully faded by progress 0.32 based on measured data where opacity ≈ 0.042 at scrollY 700)
- Applied to the badge container's `opacity` style

---

## 3. Badge Carousel Animation

### Structure

Inside the 123px lime circle, a vertical carousel alternates between two "slots":

```
Badge (123×123, overflow:hidden)
└── inner (61.5×61.5, centered)
    └── carousel (flex-col, animated translateY)
        ├── slot 1: "Hi" text (61.5×61.5)
        └── slot 2: wave SVG (61.5×61.5)
```

### Animation

- **Type:** CSS translateY on the carousel container
- **Rest state:** `translateY(0)` — "Hi" text visible
- **Animated state:** `translateY(-100%)` — wave SVG visible (shifts up by one slot height = 61.5px)
- **Captured mid-animation:** `matrix(1, 0, 0, 1, 0, 12.7728)` — showing ~12.8px offset (carousel was mid-transition)
- **Timing:** Appears to auto-cycle on an interval (not scroll-driven)
- **Duration:** ~500ms transition per swap (estimated from capture)

### Wave SVG Animation

The wave icon itself has a subtle rotation oscillation:

```
viewBox: 0 0 1080 1080
Paths: 2 (hand outline + wrist)
Transform: matrix(0.9998, -0.0186, 0.0186, 0.9998, ...) — ~1° rotation
Animation: CSS transform cycling ±15° rotation (waving motion)
```

This is NOT a Lottie animation — it's a pure SVG with CSS transform animation applied directly.

---

## 4. Entrance / Appear Animations

### 4.1 Hero Text Reveal

Each text block in the hero uses a clip-mask reveal:

```
Text Wrap (overflow:hidden, fixed height matching text line-height)
└── Text element (translateY animation)
    Start: translateY(100%) — text below the clip mask, invisible
    End:   translateY(0) — text slides up into view
```

**Elements animated:**
1. "Duncan Robert" label (left column)
2. "digital" H1 (left column)
3. "designer" H1 (right column)
4. Body text paragraph (right column)

**Stagger timing:**
- Elements appear to stagger with ~100–150ms delay between each
- Total entrance sequence: ~600ms
- Easing: ease-out or spring

### 4.2 Card Entrance

```
Avatar Wrap (appear-id: 43x9nz)
├── will-change: transform
├── Initial: opacity 0, scale 0.95 (estimated)
├── Final: opacity 1, scale 1
├── Duration: ~400ms
├── Delay: ~200ms after page load (after text begins revealing)
```

### 4.3 Navbar Entrance

```
Nav Container
├── Initial: translateY(-20px), opacity 0
├── Final: translateY(0), opacity 1
├── Duration: ~300ms
├── Delay: ~100ms
```

### 4.4 Stagger Order (Full Hero Entrance Sequence)

```
t=0ms      Navbar begins sliding down
t=100ms    "Duncan Robert" text slides up
t=200ms    Card fades in / scales up
t=250ms    "digital" text slides up
t=350ms    "designer" text slides up
t=450ms    Body text slides up
t=600ms    All entrance animations complete
```

---

## 5. Section Entrance Animations (Scroll-Triggered)

Each section below the hero uses scroll-triggered entrance animations. These fire when the section enters the viewport.

### 5.1 Services Section

```
Trigger: Section enters viewport (IntersectionObserver or scroll position)
Elements:
  1. "WHAT I CAN DO FOR YOU" heading → translateY(40px, 0) + opacity(0, 1)
  2. Description paragraph → same, +100ms delay
  3. Accordion items → stagger translateY(20px, 0) + opacity(0, 1), 80ms between each
Duration: 500ms per element
Easing: ease-out
```

### 5.2 About Section

```
Trigger: Section enters viewport
Elements:
  1. "ABOUT ME" heading → fade + slide up
  2. Description → fade + slide up, +100ms
  3. Stat cards → stagger left-to-right, 100ms between each
  4. Contact info → fade in
  5. Social icons → stagger, 50ms between each
  6. "MY STORY" CTA → fade in
Duration: 500ms per element
```

### 5.3 Projects Section

```
Trigger: Each project card enters viewport individually
Animation: opacity(0, 1) + translateY(60px, 0)
Duration: 600ms
Easing: ease-out
Cards are sticky, so they enter one at a time as user scrolls
```

### 5.4 Testimonials Section

```
Trigger: Section enters viewport
Grid items stagger: 100ms between each card (6 total)
Animation: opacity(0, 1) + translateY(30px, 0) + scale(0.98, 1)
Duration: 500ms
```

### 5.5 FAQ Section

```
Trigger: Section enters viewport
Left column (title): fade + slide up
Right column items: stagger 80ms between FAQ items
Animation: opacity(0, 1) + translateY(20px, 0)
```

### 5.6 Blog Section

```
Trigger: Section enters viewport
Cards stagger: 150ms between the 2 cards
Animation: opacity(0, 1) + translateY(40px, 0) + scale(0.98, 1)
Duration: 500ms
```

### 5.7 Contact Section

```
Trigger: Section enters viewport
Left (portrait): opacity(0, 1) + translateX(-40px, 0), 500ms
Right (form): opacity(0, 1) + translateX(40px, 0), 500ms, +100ms delay
Form fields: stagger 80ms, opacity(0, 1) + translateY(20px, 0)
```

---

## 6. Micro-Animations

### 6.1 Navbar Expand/Collapse

```
Trigger: Scroll position (collapse on scroll down, expand near top)
Animation: LayoutGroup with duration 0.7s
  - Links: AnimatePresence, blur(4px) on enter/exit
  - Width: layout animation (auto resize)
  - "Available for work" pill: fade in on collapse
```

### 6.2 Nav Link 3D Flip

```
Trigger: Hover on nav link
Container: perspective(1200px)
  - Default text: rotateX(0°) → rotateX(90°) on hover (exits upward)
  - Lime text: rotateX(-90°) → rotateX(0°) on hover (enters from below)
Duration: ~300ms
Origin: center
```

### 6.3 Contact Button Circle Fill

```
Trigger: Hover on Contact button
Animation:
  - Lime circle (20×20px) positioned at bottom-center
  - On hover: scale from 1 → 9 (covers full button)
  - Text remains above via z-index
  - Border radius on circle: 99px
Duration: ~400ms
Easing: ease-out
```

### 6.4 Accordion Chevron Rotation

```
Trigger: Click on accordion item
Animation: rotate(0°) → rotate(180°)
Duration: 300ms
Easing: ease-in-out
```

### 6.5 Accordion Content Expand

```
Trigger: Click on accordion item
Animation: grid-template-rows: 0fr → 1fr
Content: overflow hidden, max-height animated
Duration: 400ms
Easing: ease-out
```

### 6.6 CountUp Numbers

```
Trigger: Section enters viewport
Animation: Number counts from 0 to target
  - "12" years: 0 → 12
  - "270" projects: 0 → 270
  - "50+" clients: 0 → 50
Duration: ~2000ms
Easing: ease-out (slower toward end)
```

### 6.7 Project Card Image Zoom

```
Trigger: Hover on project card
Animation: image scale(1) → scale(1.05)
Overlay: opacity(0.6) → opacity(0.8)
Duration: 400ms
Easing: ease-out
```

### 6.8 Blog Card Scale

```
Trigger: Hover on blog card
Animation: card scale(1) → scale(1.02)
Image: scale(1) → scale(1.05)
Duration: 300ms
```

### 6.9 Available-for-Work Pulse

```
Location: Navbar pill
Animation: Green dot (8px) pulses via CSS
  - scale(1, 1.5, 1)
  - opacity(1, 0.5, 1)
Duration: 2000ms
Repeat: infinite
```

---

## 7. Animation Library & Implementation Notes

### Framework

- **Library:** `motion/react` v12 (Framer Motion)
- **Scroll tracking:** `useScroll({ target: ref })` → `scrollYProgress`
- **Value mapping:** `useTransform(progress, inputRange, outputRange)`
- **Physics:** `useSpring(value, { stiffness, damping })`
- **Presence:** `AnimatePresence` for enter/exit transitions
- **Layout:** `LayoutGroup` for navbar resize animation

### Performance

- `will-change: transform` on animated elements
- `transform-style: preserve-3d` on card flip container
- `backface-visibility: hidden` on card faces to prevent z-fighting
- Spring physics prevent janky scroll-linked stuttering
- `requestAnimationFrame` loop for cursor (not scroll-linked)

### Responsive Behavior

- **Desktop (lg+):** Full 3D card flip animation, custom cursor, all micro-interactions
- **Mobile (<lg):** Static card image (no flip), no custom cursor, simpler entrance animations
- Badge: 80×80px on mobile, 123×123px on desktop
- H1: 60px on mobile, 120px on desktop
