# Portavia — Animation Specification

> Source: https://portavia.framer.website
> Date: 2026-06-18
> Method: Runtime JS extraction from `__framer__appearAnimationsContent`, Framer main bundle analysis, computed style inspection via Chrome DevTools MCP

---

## 1. Page Entrance Animations (data-framer-appear-id)

Framer fires these once on initial page load. Each element has an `initial` state and animates to `animate` state.

### 1.1 Hero Avatar Wrap (appear-id: `43x9nz`)

```
Component:    Avatar Wrap (portrait card container)
Trigger:      Page load
Start state:  opacity: 1, rotateX: -180, scale: 0, transformPerspective: 1200px
End state:    opacity: 1, rotateX: 0, scale: 1, transformPerspective: 1200px
Duration:     1s
Delay:        0s
Easing:       spring (bounce: 0)
Opacity:      1 → 1 (no fade, pure 3D flip)
Scale:        0 → 1
Translate:    x: 0, y: 0 (no movement)
Rotation:     rotateX: -180° → 0° (3D flip from behind)
Stagger:      None — single element
```

**Responsive variants:**
- `default` (desktop): same config
- `1g0zrk7` (tablet): identical
- `15fhgrh` (phone): identical

### 1.2 Hero Heading Left (appear-id: `bmwyn`)

```
Component:    Hero Heading Wrap / Left ("DIGITAL" heading group)
Trigger:      Page load
Start state:  opacity: 0.001, x: 150px
End state:    opacity: 1, x: 0
Duration:     1s
Delay:        0.3s
Easing:       spring (bounce: 0)
Opacity:      0.001 → 1
Scale:        1 → 1 (no scale)
Translate:    x: 150px → 0 (slides in from right)
Rotation:     None
Stagger:      None
```

### 1.3 Hero Heading Right (appear-id: `14gfby1`)

```
Component:    Hero Heading Wrap / Right ("DESIGNER" heading group)
Trigger:      Page load
Start state:  opacity: 0.001, x: -150px
End state:    opacity: 1, x: 0
Duration:     1s
Delay:        0.3s
Easing:       spring (bounce: 0)
Opacity:      0.001 → 1
Scale:        1 → 1 (no scale)
Translate:    x: -150px → 0 (slides in from left)
Rotation:     None
Stagger:      None
```

### 1.4 About Page Avatar (appear-id: `1vajs7e`)

```
Component:    About page portrait/avatar container
Trigger:      Page load
Start state:  opacity: 1, rotateX: -180, scale: 0, transformPerspective: 1200px
End state:    opacity: 1, rotateX: 0, scale: 1, transformPerspective: 1200px
Duration:     1s
Delay:        0s
Easing:       spring (bounce: 0)
```

Same 3D flip entrance as homepage avatar. Responsive variants (`1t9tsj9`, `1sgsrep`) use identical config.

---

## 2. Page Transitions (Global)

Extracted from the Framer main bundle `script_main.*.mjs`.

### 2.1 Page Enter Transition

```
Component:    Incoming page content
Trigger:      Route navigation (SPA transition)
Start state:  opacity: 0
End state:    opacity: 1 (+ all other properties at identity)
Duration:     0.2s
Delay:        0s
Easing:       cubic-bezier(0.27, 0, 0.51, 1)
Type:         tween
Opacity:      0 → implicit 1
Scale:        1 (no change)
Translate:    x: 0px, y: 0px (no movement)
Rotation:     0 (no rotation)
rotate3d:     false
```

### 2.2 Page Exit Transition

```
Component:    Outgoing page content
Trigger:      Route navigation (SPA transition)
Start state:  Current state
End state:    opacity: 0
Duration:     0.2s
Delay:        0.2s (waits for enter to start)
Easing:       cubic-bezier(0.27, 0, 0.51, 1)
Type:         tween
Opacity:      1 → 0
Scale:        1 (no change)
Translate:    x: 0px, y: 0px
Rotation:     0
```

---

## 3. Hero 3D Card-Flip Parallax

### 3.1 Card Container

```
Component:    Avatar Card Flip
Structure:    preserve-3d container with two image layers
Transform:    matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,-0.0005, 0,0,0,1)
              (equivalent to perspective(2000px))
Size:         340 × 476px
```

### 3.2 Front Card

```
Component:    Avatar Card / Front (portrait-front.jpg)
Transform:    matrix3d(1,0,0,0, 0,1,0,0, 0.141667,0.198333,1,-0.000833333, -170,-238,0,1)
              (slight tilt forward + translate to center)
backface-visibility: hidden
Behavior:     Mouse-track — rotates subtly on X/Y axes following cursor position
```

### 3.3 Back Card

```
Component:    Avatar Card / Back (portrait-back.jpeg)
Transform:    matrix3d(-1,0,0,0, 0,1,0,0, -0.141667,-0.198333,-1,0.000833333, -170,-238,0,1)
              (rotated 180° on Y-axis + matching tilt)
backface-visibility: visible
Behavior:     Mouse-track — counter-rotates with cursor
```

### 3.4 Mouse Tracking

```
Trigger:      mousemove on hero section
Behavior:     Images subtly rotate following cursor position
              Front image tilts toward cursor, back image counter-tilts
Technology:   Framer Motion useTransform / CSS 3D transforms
```

---

## 4. Navbar Animations

### 4.1 Nav Expand/Collapse

```
Component:    Navbar (Desktop / Available)
Trigger:      Scroll position / mouse proximity
Variants:     "Only Avatar" → "Desktop / Available" → "Desktop / Available Glow"
Transition:   spring (bounce: 0.2, delay: 0, duration: 0.4)
Behavior:     Pill navbar expands from avatar-only (~56px) to full width (~508px) showing links
              Collapses back when scrolling down
```

### 4.2 Nav Hidden Transition

```
Component:    Navbar visibility on scroll
Transition:   duration: 0.7s, ease: cubic-bezier(0.12, 0.23, 0.5, 1), type: tween
Behavior:     Nav slides up/fades when scrolling down, reappears on scroll up
```

### 4.3 Green Dot Glow

```
Component:    "Available for work" status indicator
Elements:     Dot (6×6px, #0bde66) + Glowing (40×40px, #0bde66, opacity: 0.5)
Glow:         40×40px circle, border-radius: 1650%, opacity: 0.5
Behavior:     Glow element pulses/breathes (variant-based animation)
              "Available Glow" variants toggle glow visibility
```

### 4.4 Hamburger Menu Toggle (Mobile)

```
Component:    Hamburger icon — 2 horizontal bars
Trigger:      Click on hamburger button
Variants:     GpeyRJ5cb (closed) → mzEwP5j3w (open)
Top bar:      rotate: 0° → rotate: 45°, bg: white → white
Bottom bar:   rotate: 0° → rotate: -45°, bg: white → white
Middle items: opacity: 1 → opacity: 0 (hidden in open state)
Transition:   Framer layout animation (spring-based)
```

---

## 5. Counter Animations

### 5.1 Stat Counter (About Section)

```
Component:    AnimatedCounter (12, 270, 50+)
Trigger:      Scroll into viewport (IntersectionObserver)
Start state:  Display "0"
End state:    Display target number
Duration:     ~2000ms (estimated)
Easing:       Linear count-up
Technology:   requestAnimationFrame loop incrementing from 0 to target
```

### 5.2 Testimonial Percent Counter

```
Component:    AnimatedPercent (98%, 200%)
Trigger:      Scroll into viewport
Start state:  Display "0%"
End state:    Display target percentage
Duration:     ~2000ms
Easing:       Linear count-up
```

---

## 6. Service Accordion

### 6.1 Accordion Expand/Collapse

```
Component:    Service category items (Desktop / Closed ↔ Desktop / Open)
Trigger:      Click on category header
Variants:     YE04bftPF (Desktop / Closed) ↔ Y4JoKRHSg (Desktop / Open)
              GpeyRJ5cb (Tablet & Phone / Closed) ↔ mzEwP5j3w (Tablet & Phone / Open)
Transition:   Framer layout animation (spring-based, automatic height)
Behavior:     Only one category expanded at a time
              Sub-items revealed with height animation
              Toggle icon rotates (+/−)
```

---

## 7. FAQ Accordion

### 7.1 FAQ Item Expand/Collapse

```
Component:    FAQ question rows
Trigger:      Click on question row
Behavior:     Answer paragraph height animates from 0 to auto
              Chevron icon rotates 180°
              Only one FAQ item open at a time
Transition:   CSS grid-rows technique or Framer layout animation
```

---

## 8. Noise Background Overlay

```
Component:    Noise BG
Position:     fixed, inset: 0, z-index: 0
Size:         100vw × 100vh
Opacity:      0.12
Mix-blend:    color-dodge
Source:       Animated GIF texture (framerusercontent.com/images/...gif, 500×700)
Pointer:      pointer-events: auto (passes through to content below)
Behavior:     Subtle animated grain/noise texture across entire page
```

---

## 9. Smooth Scrolling

```
Component:    Lenis scroll library
State:        html.className includes "lenis" (class present)
              html does NOT have "lenis-smooth" class
Behavior:     Framer's built-in smooth scroll implementation
              Scroll behavior: auto (not CSS smooth-scroll)
              Provides momentum-based smooth scrolling with lerp
```

---

## 10. Scroll-Triggered Section Reveals

```
Component:    All major sections below the fold
Trigger:      Scroll into viewport
Technology:   Framer's built-in scroll animation system
Behavior:     Sections and their children animate in when scrolled into view
              Elements have will-change: transform set for GPU acceleration
              Featured Project items have will-change: transform pre-set
Note:         Unlike the appear animations (which have explicit configs),
              scroll reveals use Framer's runtime variant system with
              layout animations — configs are not serialized in the page data
```

---

## 11. CTA Button Fill Animation

### 11.1 Pill Button (BROWSE ALL PROJECTS, BROWSE ALL INSIGHTS, MY STORY)

```
Component:    CTA pill button (framer-InsWF)
Structure:    <a> with border-radius: 99px, overflow: hidden, padding: 6px 40px 8px
              Contains "Color BG" child element (lime circle)
              
Trigger:      Hover

Color BG default:
  - width: 15px, height: 15px
  - position: absolute, bottom: -15px, left: -19px
  - background: #d0ff71 (lime)
  - border-radius: 99px (circle)
  - z-index: 1

Color BG hover:
  - width: unset, height: unset
  - inset: -126px -27px -58px -26px (fills entire button + overflow)
  - Creates a "circle grows to fill button" effect

Transition:   Framer layout animation (automatic)
Button text:  z-index: 1 (stays above Color BG)
              Text color inverts: white → black when bg fills
```

### 11.2 "Hi" Circle Button

```
Component:    "Hi" circle element (framer-gBieo)
Structure:    Container with overflow: hidden, border-radius not set on outer
              Inner circle (framer-qveuzj): 20×20px aspect-ratio 1:1

Default state:
  - Circle: 20×20px, position: absolute, bottom: -20px, left: -20px

Hover state:
  - Circle: 180×180px, bottom: -75px, left: -31px
  - Creates expanding circle reveal effect

Transition:   Framer layout animation
```

### 11.3 Submit Button (Contact form)

```
Component:    Submit button (framer-eGUKg)
Structure:    Similar to CTA pills but with slightly different sizing
              Contains Color BG element: 15×19px default, 182×81px on hover

Default:      padding: 6px 40px 10px
Hover:        Color BG expands to 182×81px, filling button
              Arrow icon inside (20×20px)
```

---

## Transition Constants (from Framer bundle)

| Name | Type | Config | Usage |
|------|------|--------|-------|
| Nav spring | spring | bounce: 0.2, delay: 0, duration: 0.4 | Navbar expand/collapse |
| Nav hide | tween | duration: 0.7, ease: [0.12, 0.23, 0.5, 1] | Navbar scroll hide |
| Instant | tween | duration: 0 | Immediate state changes |
| Cursor spring | spring | damping: 60, delay: 0, mass: 1, stiffness: 500 | Custom cursor follow |
| Page enter | tween | duration: 0.2, delay: 0, ease: [0.27, 0, 0.51, 1] | Page transition in |
| Page exit | tween | duration: 0.2, delay: 0.2, ease: [0.27, 0, 0.51, 1] | Page transition out |
| Appear spring | spring | bounce: 0, delay: 0, duration: 1 | Hero entrance (avatar, headings) |
| Appear spring delayed | spring | bounce: 0, delay: 0.3, duration: 1 | Hero headings (left/right) |
