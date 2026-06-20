# Phase 7 — Page Load Timeline & Animation Sequence (Homepage)

> Source: https://portavia.framer.website/ at 1440×900 viewport

## Scroll Architecture

### Sticky Scroll System (0–2700px)

The first three sections use a **sticky scroll reveal** pattern:

```
Scroll Position     Visible Section     Card State
──────────────────────────────────────────────────
0 – 900px           Hero               Front face (facing camera)
900 – 1800px        Service            Transitioning / flipping
1800 – 2700px       About              Back face (behind view)
──────────────────────────────────────────────────
```

**Mechanism:**
1. `OutterWraper` (2700px height) creates a 3× viewport scroll track
2. `Sticky Container` (900px, `position: sticky; top: 0`) pins to viewport
3. `Content` layer (absolute, 2700px) contains 3 stacked 900px sections
4. As user scrolls, the Content layer moves upward within the Sticky Container
5. The `overflow: hidden` on Sticky Container clips to one section at a time
6. The Avatar Card Flip rotates via scroll-linked 3D transform

### Normal Scroll (2700px+)

After the sticky section, remaining sections flow normally:
- Projects (y: 2700, h: 3893)
- Testimonials (y: 6593, h: 957)
- FAQ (y: 7550, h: 824)
- Blog (y: 8374, h: 1037)
- Contact (y: 9411, h: 861)
- Footer (y: 10273, h: 205)

## Hero Animations

### Elements with `will-change: transform`

These elements are GPU-accelerated and animated:
1. "Hero Heading Wrap / Left" — text column slides/fades
2. "Hero Heading Wrap / Right" — text column slides/fades

### Clip-Reveal Text Animations

Two text elements use `overflow: hidden` containers for clip-reveal entrances:

| Element | Container Size | Mechanism |
|---------|---------------|-----------|
| "Duncan Robert" (name) | 293×42, absolute, z:1 | Text slides up from below container edge |
| Subtitle (right column) | 348×54, absolute, z:1 | Text slides up from below container edge |

### Expected Page Load Sequence

```
t=0.0s    Page renders, noise BG visible, all hero text below clip containers
t=0.2s    Navbar appears (instant, no animation — already fixed)
t=0.3s    Left heading column slides in (translateY or opacity)
          "Duncan Robert" clips up into view
          "DIGITAL" fades/translates in
t=0.4s    Right heading column slides in
          "DESIGNER" fades/translates in
t=0.5s    Subtitle clips up into view
t=0.6s    Avatar card scales up / fades in (centered)
t=0.8s    "Hi" badge pops in (scale from 0 + rotation)
t=1.0s    All hero elements visible, custom cursor active
```

**Note:** Exact timings are Framer-driven (likely `useInView` or `whileInView` triggers). The `will-change: transform` on both heading wraps confirms they animate.

## Card Flip Animation (Scroll-Driven)

### Transform Interpolation

The avatar card uses matrix3d transforms that interpolate based on scroll position:

**Front face (visible at scroll=0):**
```
matrix3d(1,0,0,0, 0,1,0,0, 0.1417,0.1983,1,-0.000833, -170,-238,0,1)
```

**Back face (visible after flip):**
```
matrix3d(-1,0,0,0, 0,1,0,0, -0.1417,-0.1983,-1,0.000833, -170,-238,0,1)
```

Key observations:
- Column 0 flips sign (-1 vs 1): Y-axis rotation
- Column 2 z-values flip: depth inversion
- Translation stays constant (-170, -238): card stays centered
- Perspective values (0.000833): ~1200px depth

### Scroll-to-Rotation Mapping

```
scrollY: 0     → rotateY(0°)    — front face visible
scrollY: 450   → rotateY(90°)   — edge-on (transition)
scrollY: 900   → rotateY(180°)  — back face visible
```

The rotation likely uses `useScroll` + `useTransform` from motion/react:
```typescript
const { scrollY } = useScroll();
const rotateY = useTransform(scrollY, [0, 900], [0, 180]);
```

## Section Enter Animations

Based on the Framer pattern and `will-change` observations:

### Service Section (y: 900–1800)

Elements slide up as they scroll into the sticky viewport:
- Section heading "WHAT I CAN DO FOR YOU" — translateY + opacity
- Body text — delayed translateY + opacity  
- Accordion items — staggered entrance (each delayed ~100ms)

### About Section (y: 1800–2700)

Same pattern:
- "ABOUT ME" heading — translateY + opacity
- Bio paragraph — delayed
- Number cards — staggered grid reveal
- Contact info grid — delayed
- Social icons — staggered

### Sections Below Sticky Area

These likely use `whileInView` / Intersection Observer triggers:
- Projects: Cards animate in as they enter viewport
- Testimonials: Cards slide in
- FAQ: Accordion items stagger in
- Blog: Cards slide in
- Contact: Form elements fade in

## Smooth Scrolling

- **No Lenis detected** in the DOM (`window.Lenis` is undefined, no `data-lenis-prevent` attributes)
- Framer uses its own smooth scroll implementation
- For our clone: Consider Lenis (`@studio-freight/lenis`) or native CSS `scroll-behavior: smooth`

## Footer

```
Footer (1425×205, bg: rgb(208,255,113), flex row)
  ├─ "Email:" (14px) + "designer@example.com" (18px)
  ├─ "Call Today:" (14px) + "+1 (555) 123-4567" (18px)
  ├─ "Social:" (14px) + social icons
  └─ "© Copyright 2025. All Rights Reserved by oldshen"
  └─ "Created by" (14px)

All text: rgb(48, 48, 48) — dark text on lime bg
```

## CTA Links (Section Navigation)

| Link Text | Destination | Location |
|-----------|-------------|----------|
| "My Story" | /about | About section |
| "Browse All Projects" | /projects | Projects section |
| "Browse All Insights" | /blogs | Blog section |
| "Contact" (nav button) | #contact | Navbar |

All CTA links use: Antonio 26px, weight 400, `rgb(208,255,113)`, uppercase.

## Performance Considerations

- Noise BG GIF: Fixed position, 500×700 source, opacity 0.12 — lightweight but constant
- Card flip: matrix3d animations are GPU-composited
- Sticky scroll: `position: sticky` is well-optimized in modern browsers
- `will-change: transform` on hero headings: pre-promotes to compositor layer
- Custom cursor: `pointer-events: none` + transform-based = zero layout cost
