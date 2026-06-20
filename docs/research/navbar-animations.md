# Navbar — Animations Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20 (updated — corrects prior inaccuracies)
> **Method:** Chrome DevTools MCP — scroll position sampling, hover state capture, getAnimations() API, transform matrix decomposition

---

## 1. Scroll-Triggered State Transition

Framer uses variant-based layout animation with FLIP technique — not CSS transitions.

### Open → Closed (scroll down)

| Property | Start | End | Duration | Easing |
|----------|-------|-----|----------|--------|
| `data-framer-name` | `"Desktop / Open"` | `"Desktop / Closed"` | Instant (frame 0) | — |
| Nav width | 508px | 229px | ~700ms | Framer spring/ease |
| Nav gap | 40px | 0px | ~700ms | Framer layout |
| Nav padding | `8px 10px` | `8px 20px 8px 10px` | ~700ms | Framer layout |
| Scroll Hide Wrap width | 408px | 1px | ~700ms | Framer layout |
| Scroll Hide Wrap opacity | 1 | 0 | within width anim | — |
| Avatar component | `"Only Avatar"` (40px) | `"Desktop / Available Glow"` (198px) | ~700ms | Framer layout |
| Parent transform | `translateX(-254px)` | `translateX(-114.5px)` | ~700ms | follows width |
| Green dot glow | — | 700ms entrance pulse | 700ms | single play |

### Closed → Open (scroll up)

| Property | Start | End | Duration | Easing |
|----------|-------|-----|----------|--------|
| `data-framer-name` | `"Desktop / Closed"` | `"Desktop / Open"` | Instant | — |
| Nav width | 229px | 508px | ~700ms | Framer spring/ease |
| All other properties | Reverse of collapse | — | ~700ms | — |
| Re-expansion delay | — | ~300ms after scroll direction change | — | — |

**Implementation note:** The CSS `transition` property is set to `all 0s ease` — these are NOT the actual animation drivers. Framer uses JavaScript-driven FLIP animations that compute layout changes and animate transforms.

---

## 2. Nav Link Hover — 3D Text Flip

### Trigger
Framer `onHoverStart` / `onHoverEnd` events (JavaScript, not CSS `:hover`)

### Default State

```
Link Wrap:
  transform: perspective(1200px)
  transform-style: preserve-3d
  transform-origin: center top (50% 0%)

Face 1 (white text):
  transform: none
  transform-origin: 50% 50% (center center)
  height: 24px (full line-height visible)

Face 2 (lime text):
  transform: rotateX(-90°)
  transform-origin: 50% 0% (top center)
  height: ~0.5px (edge-on, invisible)
```

### Hover State

```
Face 1 (white text):
  transform: rotateX(90°)  → flips upward away from view
  height: 0px (edge-on)

Face 2 (lime text):
  transform: rotateX(0°)   → flips into flat/visible position
  height: ~23.5px (face-on, visible)
```

### Animation Parameters

| Parameter | Value |
|-----------|-------|
| Trigger | `onHoverStart` / `onHoverEnd` |
| Perspective | 1200px (on Link Wrap container) |
| Rotation axis | X (horizontal) |
| Face 1: default → hover | `rotateX(0°)` → `rotateX(90°)` |
| Face 2: default → hover | `rotateX(-90°)` → `rotateX(0°)` |
| Face 1 transform-origin | `50% 50%` (center) |
| Face 2 transform-origin | `50% 0%` (top edge) |
| Duration | ~300ms (estimated, Framer variant transition) |
| Easing | Framer default (spring-like or ease) |
| Delay | 0ms |

### Visual Description

This is a **3D cube-face flip** around the top edge:
1. Face 1 (white) rotates upward around its center → disappears edge-on
2. Face 2 (lime) was already perpendicular (`rotateX(-90°)`) → rotates to flat → visible
3. The `<a>` has `overflow: hidden` which clips any overflow during the transition
4. `preserve-3d` on the Link Wrap enables true 3D composition of the child faces

### Measured Hover Matrix

```
Face 2 at hover (visible):
  matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)
  = rotateX(-90°) which, composed with container's perspective, renders face-on
```

---

## 3. Contact Button — Circle Fill

### Trigger
Hover on the Contact button `<a>`

### Default State

```css
/* Button container */
position: relative;
overflow: hidden;
border-radius: 99px;
background: rgb(255, 255, 255);

/* Color BG (lime circle) */
position: absolute;
width: 20px;
height: 20px;
background: rgb(208, 255, 113);
border-radius: 99px;
bottom: -20px;      /* hidden below button */
left: -20px;        /* hidden left of button */
z-index: 1;
```

### Hover State

```css
/* Color BG expands to cover the button */
width: ~180px;
height: ~180px;
/* Repositioned to center over button area */
```

### Animation Parameters

| Parameter | Value |
|-----------|-------|
| Trigger | Hover on Contact `<a>` |
| Start: circle size | 20px × 20px |
| End: circle size | ~180px × ~180px |
| Start: position | `bottom: -20px; left: -20px` (off-screen) |
| End: position | Centered, overflowing button bounds |
| Duration | ~400ms (estimated) |
| Easing | ease-out |
| Scale factor | ~9× (20px → 180px) |
| Clip | `overflow: hidden` + `border-radius: 99px` on parent clips to pill |
| Text behavior | Stays `rgb(48, 48, 48)` — dark text on lime background |
| Text z-index | `1` (above Color BG, both at z-index 1 but text container is after in DOM) |

---

## 4. Green Dot Glow Animation

### Trigger
Appears when nav transitions to "Desktop / Closed" state

### Elements

| Element | Role |
|---------|------|
| `"Dot"` | Solid green circle, 6×6px, always visible in Closed state |
| `"Glowing"` | Expanding glow pulse behind the Dot |

### Glowing Animation

| Parameter | Value |
|-----------|-------|
| Trigger | Nav state → "Desktop / Closed" (entrance) |
| Start: size | 6×6px base (rendered via scale) |
| End: size | ~40×40px rendered |
| Start: opacity | 0 (implied from animation) |
| Mid: opacity | 0.5 |
| End: opacity | 0.5 (stays) |
| Start: border-radius | 1650% |
| End: border-radius | ~247.587% |
| Start: transform | `matrix(0.15, 0, 0, 0.15, -20, -20)` |
| End: transform | Animated scale + position |
| Duration | **700ms** |
| Iteration count | **1** (single pulse, NOT infinite) |
| Easing | ease (default) |
| Delay | 0ms |

**Critical correction:** The glow is a **one-shot entrance animation** that plays when the Closed state appears. It is NOT an infinite pulse. The component may alternate between "Available Glow" and "Available" sub-variants, but the glow itself fires once per variant entrance.

---

## 5. "Available for Work" Text — 3D Flip

The "Available for work" link uses the **same 3D flip structure** as the nav links:

### Structure
```
a (href="./#contact", overflow: hidden)
└── div [data-framer-name="Link Wrap"]
      transform: perspective(1200px), preserve-3d
      ├── div > p "Available for work" — white, 132.1×24px
      └── div > p "Available for work" — lime (#d0ff71), 134.8×0.5px (edge-on)
```

### Animation (on hover)
Same as nav links: Face 1 rotates to `rotateX(90°)`, Face 2 from `rotateX(-90°)` to `rotateX(0°)`.

---

## 6. Navbar Width Transition

### Layout Animation System

The width change is a Framer FLIP layout animation, not a CSS transition:

1. Variant attribute changes instantly (`"Desktop / Open"` ↔ `"Desktop / Closed"`)
2. New layout is computed (new widths, positions for all children)
3. Framer applies inverse transforms to maintain old visual positions
4. Transforms animate to identity over ~700ms → visual layout change

### Width Curve (measured)

| Time | Width | State |
|------|-------|-------|
| 0ms | 508px | Open → Closed triggered |
| ~100ms | ~475px | Animating |
| ~350ms | ~350px | Midpoint |
| ~670ms | ~232px | Near final |
| ~700ms | 229px | Settled |

The reverse (Closed → Open) follows the same ~700ms duration with an additional ~300ms delay before starting.

---

## 7. Scroll Hide Wrap Transition

The "Scroll Hide Wrap" container animates its width and opacity in sync with the nav:

| Parameter | Open | Closed | Duration |
|-----------|------|--------|----------|
| Width | 408px | 1px | ~700ms |
| Opacity | 1 | 0 | within width animation |
| Overflow | hidden | hidden | — |
| Content | Nav links + Contact button | Same (clipped to 1px) | — |

The links and Contact button are NOT removed from the DOM — they're clipped to invisibility by the 1px width + opacity 0.

---

## 8. Parent Transform Animation

The fixed parent wrapper uses `transform: translateX(-50%)` for centering. As the nav width changes, the actual pixel offset changes:

| Nav State | Nav Width | translateX value |
|-----------|-----------|-----------------|
| Open | 508px | `-253.98px` (half of 508) |
| Closed | 229.1px | `-114.55px` (half of 229) |

This creates the effect of the nav "shrinking toward center" — it stays horizontally centered as it collapses.

---

## 9. Animation Summary Table

| Animation | Trigger | Duration | Delay | Easing | Iterations |
|-----------|---------|----------|-------|--------|------------|
| Open → Closed transition | Scroll down | ~700ms | 0ms | Framer spring | 1 |
| Closed → Open transition | Scroll up | ~700ms | ~300ms | Framer spring | 1 |
| Nav link 3D flip | Hover | ~300ms | 0ms | Framer default | 1 per hover |
| Contact circle fill | Hover | ~400ms | 0ms | ease-out | 1 per hover |
| Green dot glow pulse | Closed state entrance | 700ms | 0ms | ease | 1 |
| "Available for work" flip | Hover | ~300ms | 0ms | Framer default | 1 per hover |
| Avatar component switch | With nav transition | ~700ms | 0ms | Framer layout | 1 |
