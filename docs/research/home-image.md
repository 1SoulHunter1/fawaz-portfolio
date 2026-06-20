# Phase 3 — Hero Image Analysis (Homepage)

> Source: https://portavia.framer.website/ at 1440×900 viewport

## Image Inventory

### Portrait Photos (Hero Card Flip)

| Image | URL Fragment | Natural Size | Displayed Size | Object-Fit | Border Radius |
|-------|-------------|-------------|----------------|------------|---------------|
| Back portrait | `VRQgkdWsjawSg1qpCm45HfSY1I.jpeg` | 960×1200 (served 340×425) | 340×476 | cover | 20px |
| Front portrait | `qrxY8NagVO40NBrdhFEGgFR3PYY.jpg` | 620×630 (served 340×345) | 340×476 | cover | 20px |

- Both images are center-cropped (`object-position: 50% 50%`) to fill the 340×476 card
- CDN: `framerusercontent.com` with width/height query params for responsive sizing
- Back portrait: person seen from behind (darker, moody)
- Front portrait: person facing camera (brighter, friendly)

### Image Position

```
Card position within viewport (at 1440×900):
  x: 542px from left edge
  y: 212px from top
  width: 340px
  height: 476px

Centered calculation:
  Card center X: 542 + 170 = 712px ≈ 1425/2 = 712.5px (perfectly centered)
  Card center Y: 212 + 238 = 450px = 900/2 (perfectly centered vertically)
```

The card is **dead center** in the viewport at page load.

## 3D Card Flip System

### DOM Hierarchy

```
"Avatar Wrap" (340×476, relative)
  │ transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,-0.000833, 0,0,0,1)
  │            ↑ This creates perspective: ~1200px (1/0.000833 ≈ 1200)
  │
  ├─ "Avatar Card Flip" (340×476, relative)
  │    │ transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,-0.0005, 0,0,0,1)
  │    │            ↑ Additional perspective: ~2000px
  │    │
  │    ├─ "Avatar Card / Back" (340×476, absolute)
  │    │    │ transform: matrix3d(-1,0,0,0, 0,1,0,0, -0.1417,-0.1983,-1,0.000833, -170,-238,0,1)
  │    │    │ backface-visibility: visible
  │    │    │ border-radius: 20px
  │    │    │ overflow: hidden
  │    │    └─ IMG (back portrait)
  │    │
  │    └─ "Avatar Card / Front" (340×476, absolute)
  │         │ transform: matrix3d(1,0,0,0, 0,1,0,0, 0.1417,0.1983,1,-0.000833, -170,-238,0,1)
  │         │ backface-visibility: hidden
  │         │ border-radius: 20px
  │         │ overflow: hidden
  │         └─ IMG (front portrait)
  │
  └─ "Hi" badge (123×123, absolute, z:10)
       └─ "Text" container
```

### Transform Analysis

The matrix3d values encode:
- **Back face:** Rotated ~180° around Y axis (column 0 is `-1`, column 2 values are negative). This face is "behind" — only visible when the card flips.
- **Front face:** Normal orientation (column 0 is `1`), with perspective correction. This is the default visible face.
- **Translation:** Both have `-170, -238` in the translation column — this centers the 340×476 card within its container (half-width, half-height offset).
- **Perspective row:** Values like `0.000833` in row 4 create on-element perspective (~1200px vanishing point depth).

### Flip Animation (Scroll-Driven)

The card flip is likely driven by scroll position within the OutterWraper:
- At scroll=0 (Hero section): Front face visible
- As user scrolls toward Service section: Card rotates to show Back face
- The `matrix3d` transforms animate between these two states
- Framer uses `useScroll` + `useTransform` to interpolate the rotation

**For our clone:** Replicate with `motion/react` `useScroll()` + `useTransform()` to drive `rotateY` on the card flip container.

## "Hi" Circle Badge

### Structure

```
Badge container (123×123, absolute, z:10)
  │ position: absolute within Avatar Wrap
  │ transform: matrix3d(..., -60,-60,30,1) — offset from card center
  │
  └─ "Text" circle (123×123)
       │ background: rgb(208, 255, 113) — lime green
       │ border-radius: 99px — perfect circle
       │ overflow: hidden
       │
       └─ "Hand Waving" (62×62, overflow:hidden)
            └─ SVG (62×62, viewBox="0 0 1080 1080", fill:black)
                 └─ Wave/hand icon
```

### Position Calculation

```
Badge center relative to card:
  Badge position: x=480, y=628 (viewport coords at scroll=0)
  Card position:  x=542, y=212
  
  Badge relative to card top-left:
    x: 480 - 542 = -62px (overlaps left edge by 62px)
    y: 628 - 212 = 416px (near bottom of 476px card)
  
  Badge is positioned at approximately:
    bottom: 476 - 416 - 123/2 = ~-2px from card bottom
    left: -62px from card left edge
    → Bottom-left corner, overlapping outward
```

The badge sits at the **bottom-left** of the card, partially extending outside, at z:10 (above the card).

### Badge Animation

The badge likely has a subtle rotation/wobble animation (the "Hand Waving" name suggests it). The SVG inside appears to be a waving hand icon rendered at 62×62px within the 123px lime circle.

**For our clone:** 
- Lime circle: `w-[123px] h-[123px] bg-[rgb(208,255,113)] rounded-full overflow-hidden`
- Wave icon: Extract SVG from original, render at 62×62 with `fill: black`
- Position: absolute, bottom-left of card with negative offset

## Noise Texture Overlay

```
"Noise BG" (fixed, z:0, full viewport, opacity: 0.12)
  └─ Child DIV (absolute, full size)
       └─ background-image: GIF texture
          URL: framerusercontent.com/images/AVsssNQRylEZc5orEWvz8Q1wQT4.gif
          Natural: 500×700
          Behavior: covers full viewport, fixed position
```

### Implementation Notes

- Download the noise GIF and serve from `/public/images/noise.gif`
- Apply as fixed overlay: `position: fixed; inset: 0; z-index: 0; opacity: 0.12; pointer-events: none`
- The GIF creates a subtle animated grain effect (film noise aesthetic)
- Must be `pointer-events: none` so it doesn't block interactions

## Image Download List

For the clone, download these assets:
1. `VRQgkdWsjawSg1qpCm45HfSY1I.jpeg` → `/public/images/portrait-back.jpeg`
2. `qrxY8NagVO40NBrdhFEGgFR3PYY.jpg` → `/public/images/portrait-front.jpg`
3. `AVsssNQRylEZc5orEWvz8Q1wQT4.gif` → `/public/images/noise.gif`
4. Wave/hand SVG → Extract and save as React component in `icons.tsx`
