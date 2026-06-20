# Phase 2 — Design Tokens & System (Homepage)

> Source: https://portavia.framer.website/ at 1440×900 viewport

## Colors

### Backgrounds
| Token | Value | Usage |
|-------|-------|-------|
| Page background | `rgb(26, 26, 27)` | Root `.framer-egmbj8` — near-black with slight warmth |
| Navbar bg | `rgba(15, 15, 15, 0.9)` | Darker than page, 90% opacity + backdrop-blur |
| Accent / Lime | `rgb(208, 255, 113)` | Hi circle, cursor, nav hover text, "Available for work", footer bg |
| Card flip bg | transparent | Cards rely on image `object-fit: cover` |

### Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary text | `rgb(255, 255, 255)` | Headings, body text, nav links |
| Accent text | `rgb(208, 255, 113)` | Nav hover state, "Available for work" label |
| Button text | `rgb(48, 48, 48)` | Contact button text (dark on white bg) |
| Social icons | `rgb(255, 255, 255)` | Social media icon SVGs in About section |

### Interactive Colors
| Token | Value | Usage |
|-------|-------|-------|
| Nav link default | `rgb(255, 255, 255)` | White text |
| Nav link hover | `rgb(208, 255, 113)` | Lime text (3D flip face 2) |
| Contact btn bg | `rgb(255, 255, 255)` | White pill |
| Contact btn hover fill | `#d0ff71` / `rgb(208, 255, 113)` | Expanding lime circle |
| Green dot (work pill) | `rgb(11, 222, 102)` | Pulsing availability dot |
| Footer bg | `rgb(208, 255, 113)` | Lime green footer |

### Cursor
| Token | Value | Usage |
|-------|-------|-------|
| Cursor dot | `rgb(208, 255, 113)` | 16×16 fixed dot, z:13 |

## Typography

### Font Families
| Family | Weight(s) | Usage |
|--------|-----------|-------|
| **Antonio** | 400, 700 | Headings (H1, name label). Sans-serif, condensed uppercase display face |
| **Inter** | 300, 400 | Body text, nav links, buttons. Sans-serif, clean humanist |

### Type Scale

| Element | Font | Size | Weight | Line-Height | Letter-Spacing | Transform |
|---------|------|------|--------|-------------|----------------|-----------|
| Name label ("Duncan Robert") | Antonio | 32px | 400 | 41.6px (1.3) | normal | uppercase |
| H1 hero ("digital", "designer") | Antonio | 120px | 700 | 132px (1.1) | -3.6px (-0.03em) | uppercase |
| Hero subtitle | Inter | 18px | 300 | 27px (1.5) | normal | none |
| Nav links | Inter | 16px | 300 | — | normal | none |
| Contact button | Inter | 16px | 300 | — | normal | none |
| "Available for work" | Inter | 16px | 300 | — | normal | none |

### Font Loading

Fonts are loaded via Framer's font system (self-hosted WOFF2). For our clone:
- **Antonio**: Available on Google Fonts — use `next/font/google`
- **Inter**: Available on Google Fonts — use `next/font/google` (already in most Next.js templates)

## Spacing System

### Page-Level
| Token | Value | Usage |
|-------|-------|-------|
| Content max-width | 1200px | All section containers |
| Side padding | 112.5px | `(1425 - 1200) / 2` at 1440 viewport |
| Section height | 900px | Hero, Service, About (viewport-height panels) |
| Navbar top offset | 20px | `top: 20px` from viewport |

### Hero Section
| Token | Value | Usage |
|-------|-------|-------|
| Hero column gap | 370px | Between left/right heading wraps |
| Left column width | 415px | "Hero Heading Wrap / Left" |
| Right column width | 415px | "Hero Heading Wrap / Right" |
| Heading vertical center | y: 384px | From top of 900px section (≈ 43% down) |
| Name label offset | y: 339px | 45px above heading baseline |
| Subtitle offset | y: 527px | 143px below heading top |

### Service / About Sections
| Token | Value | Usage |
|-------|-------|-------|
| Content column width | 600px | Text content area |
| Heading-to-body gap | 20px | Within "Text Wrap" flex column |
| Section internal gap | 40px | Between major content blocks |
| Body text max-width | 500px | Subtitle/paragraph text |

### Other Sections
| Token | Value | Usage |
|-------|-------|-------|
| Social icon size | 30×30px | SVG icons in About section |
| Social icon gap | 20px | Between social icons |
| Number card grid | Grid layout | Stats display in About |
| Contact info grid | Grid layout | Contact details in About |

## Border Radius

| Element | Radius | Notes |
|---------|--------|-------|
| Navbar | 28px | Pill shape |
| Contact button | 9999px (full) | Pill/capsule |
| Avatar card | 20px | Photo cards |
| Hi circle | 99px | Perfect circle |
| Custom cursor | 50% (implied) | Circular dot |

## Shadows & Effects

| Effect | Value | Usage |
|--------|-------|-------|
| Navbar blur | `backdrop-filter: blur(5px)` | Semi-transparent dark nav |
| Noise texture | GIF overlay, `opacity: 0.12`, fixed | Film grain effect over entire viewport |
| Green dot glow | `filter: blur(8px)`, 40×40, pulsing opacity 0.3-0.6 | "Available for work" indicator |
| Card 3D transform | `matrix3d(...)` with `perspective` | Avatar card flip between front/back images |

## Noise Background Details

```
"Noise BG" (fixed, z:0, 1425×900, opacity: 0.12)
  └─ Child DIV (absolute, 1425×900)
       └─ background-image: url("...AVsssNQRylEZc5orEWvz8Q1wQT4.gif")
          (500×700 GIF, tiled/stretched across viewport)
```

- The noise GIF creates a subtle film-grain texture
- Fixed position means it doesn't scroll with content
- Low opacity (0.12) makes it barely perceptible
- **For our clone:** Download the GIF and replicate with same fixed/opacity approach

## Avatar Card System

The hero portrait uses a **3D card flip** with two images:

```
"Avatar Wrap" (340×476, relative, perspective transform)
  ├─ "Avatar Card Flip" (340×476, relative)
  │    ├─ "Avatar Card / Back" (absolute, overflow:hidden, border-radius:20px)
  │    │    └─ IMG (back portrait, object-fit:cover, border-radius:20px)
  │    │       src: VRQgkdWsjawSg1qpCm45HfSY1I.jpeg (960×1200 natural)
  │    │       Displayed: 340×476
  │    │
  │    └─ "Avatar Card / Front" (absolute, overflow:hidden, border-radius:20px)
  │         └─ IMG (front portrait, object-fit:cover, border-radius:20px)
  │            src: qrxY8NagVO40NBrdhFEGgFR3PYY.jpg (620×630 natural)
  │            Displayed: 340×476
  │
  └─ "Hi" badge (absolute, 123×123, z:10)
       └─ "Text" circle (123×123, bg: rgb(208,255,113), border-radius:99px, overflow:hidden)
            └─ "Hand Waving" (62×62, overflow:hidden)
                 └─ SVG (62×62, viewBox 0 0 1080 1080, fill:black) — wave icon

3D Transform chain:
- Avatar Wrap: perspective via matrix3d(..., -0.000833)
- Card Flip: perspective via matrix3d(..., -0.0005)
- Back face: full 3D rotation matrix (flipped on Y axis, backface visible)
- Front face: 3D rotation matrix (facing forward, backfaceVisibility: hidden)
```

### Card Flip Behavior

- Uses CSS 3D transforms (matrix3d) for perspective-correct card flip
- Back face: `backfaceVisibility: visible` — always renders
- Front face: `backfaceVisibility: hidden` — hides when rotated away
- Both faces share: `border-radius: 20px`, `overflow: hidden`, `position: absolute`
- The flip likely triggers on scroll or interaction (needs Phase 7 timeline analysis)

## Breakpoint Expectations

| Width | Behavior |
|-------|----------|
| ≥1200px | Full desktop: 2-column hero, 1200px containers |
| ~1024px | Tablet: nav collapses to mobile hamburger |
| ~768px | Hero likely stacks to single column |
| ~600px | Mobile: full-width sections, reduced font sizes |

(Exact breakpoints need responsive testing — Phase 7)
