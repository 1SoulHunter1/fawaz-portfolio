# Portavia — Interaction Specification

> Source: https://portavia.framer.website
> Date: 2026-06-18
> Method: Chrome DevTools MCP — real CDP hover, computed style diffing, Framer bundle analysis, accessibility snapshot inspection

---

## 1. Custom Mouse Cursor

### 1.1 Default State

```
Component:    Custom cursor (framer-SsumL, data-framer-name="Default")
Position:     fixed, top: 0, left: 0, z-index: 13
Size:         16 × 16px
Background:   rgb(208, 255, 113) — lime (#d0ff71)
Border-radius: 99px (circle)
Opacity:      0 (hidden until mouse moves into viewport)
Pointer-events: none
Mix-blend-mode: normal
Transform:    translate(0%, -50%) translateX({mouseX}px) translateY({mouseY}px)
Offset:       x: 20px, y: 20px from cursor center (placement: "right")
Follow spring: damping: 60, mass: 1, stiffness: 500, type: spring
```

### 1.2 Project Card Hover State

```
Component:    Cursor variant "Project Hover" (framer-v-1nhwsh0)
Trigger:      Mouse enters any project card link
Size:         70 × 70px (4.375× larger)
Background:   rgb(208, 255, 113) — lime
Border-radius: 141.429% (circle)
Opacity:      1
Display:      flex (center-aligned)
Content:      SVG arrow icon (↗) rotated -45° inside
              Arrow is 30×30px, stroke-width: 1.5, no fill
Transition:   spring (damping: 60, stiffness: 500) — same follow spring
```

### 1.3 Color-Burn State

```
Component:    Cursor variant (framer-v-nyzhp9)
Trigger:      Context-dependent (specific interactive elements)
Size:         16 × 16px (same as default)
Mix-blend-mode: color-burn
Aspect-ratio: 1 / 1
```

### 1.4 Text Display States

```
Component:    Cursor variants (framer-v-15hp34x, framer-v-gj9knl, framer-v-eyovw6, framer-v-qcy7gm)
Trigger:      Hovering over specific content sections
Size:         195 × 114px (large rectangular)
Content:      Text label stack (4 labels, each 195×114px)
              Labels slide vertically to show relevant text
              top offset cycles: 0px, -114px, -228px, -342px
Behavior:     Shows contextual text like "View", "Read", etc.
```

### 1.5 Mobile/Touch

```
Behavior:     Cursor hidden on touch devices
              Not rendered on Phone variant (xYhHFGQwf)
```

---

## 2. Navbar Interactions

### 2.1 Nav Link Text-Swap Hover

```
Component:    Link Wrap (preserve-3d container, 24px height)
Trigger:      Mouse hover on nav link

Structure:
  Link Wrap (preserve-3d, overflow: visible, height: 24px)
  ├── Div (text "Home") — visible face
  │   └── <p> "Home" (Inter, 16px, 300)
  └── Div (text "Home") — hidden face, rotateX(-90°)
      └── <p> "Home" (Inter, 16px, 300)

Default transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,-0.000833333, 0,0,0,1)
                    (perspective(1200px), no rotation)

Hover transform:   matrix3d(1,0,0,0, 0,0,-1,0.000833333, 0,1,0,0, 0,0,0,1)
                    (rotateX(-90°) — top face rolls away, bottom face rolls into view)

Second div default: matrix3d(1,0,0,0, 0,0,1,0, 0,-1,0,0, 0,0,0,1)
                     (rotateX(-90°) — pre-positioned below)

Variant name:    yH45AUhEe-hover
Transition:      Framer layout animation (spring-based)
Duration:        ~200-300ms visual
```

### 2.2 Nav Expand on Hover/Proximity

```
Component:    Navbar pill container
Trigger:      Mouse approaches nav area / scroll direction change
States:       "Only Avatar" (gnP_w_JBw) — collapsed, avatar only
              "Desktop / Available" (VSa0MwIgM) — expanded with links
              "Desktop / Available Glow" (Tpqe5DLAN) — expanded with glow ring
              "Phone / Available" (mbXCIroYE) — mobile expanded
              "Phone / Available Glow" (vg7MQIr8m) — mobile with glow

Transition:   spring (bounce: 0.2, delay: 0, duration: 0.4)
Width:        ~56px (collapsed) → ~508px (expanded, desktop)
              ~56px (collapsed) → ~278px (expanded, mobile)
```

### 2.3 Nav Scroll Hide

```
Component:    Scroll Hide Wrap
Trigger:      Scroll direction change
Behavior:     Nav hides (translateY up) on scroll down, shows on scroll up
Transition:   tween, duration: 0.7s, ease: cubic-bezier(0.12, 0.23, 0.5, 1)
```

### 2.4 Active Page Link

```
Component:    Current page nav link
Behavior:     Link text color changes to #d0ff71 (lime) on the active route
Technology:   data-framer-page-link-current attribute
```

---

## 3. Project Card Interactions

### 3.1 Featured Project Card Hover

```
Component:    Project Cover (a tag, border-radius: 20px, overflow: hidden)
Trigger:      Mouse hover

Image:        Object-fit: cover, fills container
              No CSS scale transform detected — animation is JS-driven
              Expected: subtle scale-up (~1.05×) via Framer layout animation

Overlay Gradient:
  Default:    opacity: 0.6
              background: linear-gradient(rgba(12,12,13,0.45) 0%, rgba(12,12,13,0.8) 100%)
  Hover:      opacity likely deepens (Framer variant animation)

Cursor:       Changes to "Project Hover" variant (70×70px lime circle + arrow)

Container:    1120 × 746px, border-radius: 20px
```

### 3.2 More Projects Card Hover (Smaller Cards)

```
Component:    Project Item cards (540×511px or 540×490px)
Trigger:      Mouse hover
Behavior:     Similar cursor change to project hover variant
              Image container has overflow: hidden for clip on zoom
              Cover image: border-radius: 20px
```

---

## 4. CTA Button Interactions

### 4.1 Pill Button Hover (BROWSE ALL PROJECTS, etc.)

```
Component:    Desktop pill link (framer-InsWF)
Structure:    <a> border-radius: 99px, overflow: hidden, padding: 6px 40px 8px
Trigger:      Mouse hover

Default state:
  - Border: 1px solid with lime color (via CSS var)
  - Text: white (Antonio, 26px, 400)
  - Color BG: 15×15px lime circle, position: absolute, bottom: -15px, left: -19px
  - Arrow icon alongside text

Hover state:
  - Color BG expands: inset: -126px -27px -58px -26px (fills entire button)
  - Visual effect: lime circle grows from bottom-left corner to fill button
  - Text: inverts to black (z-index: 1, above Color BG)
  
Transition:   Framer layout animation (spring-based, automatic)

Button Circle:
  - 24×24px, bg: black, border-radius: 999px
  - Contains arrow icon
  - Likely inverts to lime bg on hover
```

### 4.2 "Hi" Circle Hover

```
Component:    framer-gBieo (hero + contact section)
Trigger:      Mouse hover

Default:      Inner circle 20×20px, positioned at bottom: -20px, left: -20px
Hover:        Circle expands to 180×180px, repositioned to bottom: -75px, left: -31px
Effect:       Lime circle reveals/expands behind the "Hi" text
Transition:   Framer layout animation
```

### 4.3 Submit Button Hover

```
Component:    framer-eGUKg (contact form submit)
Trigger:      Mouse hover

Default:      Color BG: 15×19px, position: absolute, bottom: -15px, left: -19px
              Arrow icon: 20×20px
Hover:        Color BG expands to 182×81px
              Same circle-fill-button effect as other CTAs
```

---

## 5. Social Icon Interactions

### 5.1 About Section Social Icons

```
Component:    Icon Wrap links (X, Instagram, Behance, Dribbble)
Size:         30 × 30px each
Icon:         SVG, fill: rgb(48, 48, 48) — dark gray
Background:   transparent (no circle container)
Hover:        SVG fill color likely changes (Framer variant)
              Expected: color transitions to lime or white
```

### 5.2 Footer Social Icons

```
Component:    Icon Wrap links in footer
Size:         24 × 24px each
Icon:         SVG, fill: rgb(48, 48, 48) — dark gray (on lime footer bg)
Background:   transparent
Hover:        SVG fill color change expected
```

---

## 6. Service Accordion Interactions

```
Component:    Service category items
Trigger:      Click on category header

Default (Closed):
  - Shows category number + title + toggle icon
  - Sub-items hidden (height: 0, opacity: 0)

Active (Open):
  - Sub-items revealed with height animation
  - Toggle icon rotates or changes (+/−)
  - Only one category open at a time
  - Clicking another category closes the current one

Variants:     Desktop / Closed (YE04bftPF) ↔ Desktop / Open (Y4JoKRHSg)
              Tablet & Phone / Closed (GpeyRJ5cb) ↔ Tablet & Phone / Open (mzEwP5j3w)
Transition:   Framer layout animation (spring-based)
```

---

## 7. FAQ Accordion Interactions

```
Component:    FAQ question rows (6 items)
Trigger:      Click on question row

Default:
  - Number (Antonio, 26px) + Question text (Antonio, 26px) + Chevron icon
  - Answer hidden

Active:
  - Answer paragraph revealed (Inter, 18px, 300, muted)
  - Chevron rotates 180°
  - Only one FAQ open at a time

Hover:        Subtle background highlight expected (hover:bg-white/5)
Transition:   Height animation + opacity fade for answer text
```

---

## 8. Blog Card Interactions

### 8.1 Blog Card Hover

```
Component:    Blog post cards (links to /blogs/[slug])
Trigger:      Mouse hover

Structure:
  - Cover image (border-radius: 20px, overflow: hidden on parent)
  - Meta Wrap (overflow: hidden)
    - Category Badge (border-radius: 99px)
    - Date
  - Title (Antonio, 32px)
  - Description (Inter, 14px)

Hover effects:
  - Image: expected zoom/scale within overflow:hidden container
  - Border: expected lime border or glow on card container
  - Cursor: changes variant (likely text cursor or default)
```

### 8.2 "Most Viewed" Badge

```
Component:    Blog Badge on featured post (blogs page)
Style:        H4, Antonio 26px, lime background pill
Behavior:     Static badge, no hover interaction
```

---

## 9. Contact Form Interactions

### 9.1 Input Focus

```
Component:    Text inputs, textarea, select
Default:      border-bottom: 1px solid #333333
Focus:        border-bottom-color transitions to #d0ff71 (lime)
Transition:   CSS transition on border-color
```

### 9.2 Select Dropdown

```
Component:    "Service Needed?" select
Options:      Branding, Web design, Web Design, UI / UX
Behavior:     Native select dropdown (Framer default)
```

---

## 10. Footer Interactions

### 10.1 Footer Links

```
Component:    Email (mailto:), Phone (tel:), Social icons
Email/Phone:  Text links with hover color change
Social:       SVG icon links (24×24px), dark fill on lime bg
Divider:      1120×1px, bg: rgb(48, 48, 48)
```

---

## 11. Responsive Interaction Changes

### 11.1 Mobile Nav (<810px)

```
Desktop:      Pill nav with inline links, text-swap hover
Mobile:       Collapsed pill, hamburger menu
              Hamburger: 2 bars that rotate to X on toggle
              Top bar: rotate(0) → rotate(45°)
              Bottom bar: rotate(0) → rotate(-45°)
              Menu: full-screen overlay with nav links
```

### 11.2 Mobile Touch

```
Custom cursor: Hidden (not rendered for Phone variant)
Hover effects: Disabled (touch-only interactions)
Accordion:    Uses Tablet & Phone / Closed ↔ Open variants
Project cards: Full-width, single column, tap to navigate
```

---

## Color Token Map (from Framer bundle CSS variables)

| Token ID | Value | Usage |
|----------|-------|-------|
| `54672876-03f0-4dca-8fdb-32c421a5c4d1` | `rgb(106, 113, 223)` or `rgb(94, 103, 230)` | Star icons, checkmarks, cursor color-burn state |
| `861b2ae9-dee3-4143-a255-6faa9a39d943` | `rgb(255, 255, 255)` | White (hamburger bars, text) |
| `a9f688eb-778b-4a71-929e-ebf8a014b4cf` | `rgb(48, 48, 48)` | Dark gray (social icons, footer text) |
| `4baed98b-3751-4e60-b570-600a506f091e` | `rgb(39, 217, 116)` | Green dot — "Available for work" indicator |
| `621c2752-e263-492f-8440-f4105a55d3f1` | `rgb(218, 218, 218)` | Light gray text |
| `39a5a1be-d79a-43ee-a7a4-d32ef142beed` | `rgb(255, 255, 255)` | White (hamburger default color) |
| `e1eaf7ec-6a2b-469c-8ec1-579f75fde613` | `rgb(0, 0, 0)` | Black |
| `528a4e50-1a33-4ebe-a3b3-4f0f1508d312` | `rgb(255, 255, 255)` | White |
| `4795dafb-4261-43d3-aa0c-b3831681376e` | `rgb(255, 255, 255)` | White (body background fallback) |

---

## Cursor Variant Summary

| Variant | CSS Class | Size | Shape | Content | Trigger |
|---------|-----------|------|-------|---------|---------|
| Default | `framer-v-1j656b0` | 16×16px | Circle | None (solid lime) | Normal browsing |
| Project Hover | `framer-v-1nhwsh0` | 70×70px | Circle | Arrow icon (↗, -45°) | Project card hover |
| Color Burn | `framer-v-nyzhp9` | 16×16px | Circle | None | Specific elements |
| Text Label 1 | `framer-v-15hp34x` | 195×114px | Rectangle | Text label | Content hover |
| Text Label 2 | `framer-v-gj9knl` | 195×114px | Rectangle | Text label | Content hover |
| Text Label 3 | `framer-v-eyovw6` | 195×114px | Rectangle | Text label | Content hover |
| Text Label 4 | `framer-v-qcy7gm` | 195×114px | Rectangle | Text label | Content hover |

---

## Implementation Priority for Clone

### Must Have (exact match required)
1. Custom cursor — default (16px lime circle) + project hover (70px with arrow)
2. Nav link text-swap 3D rotation
3. CTA button circle-fill hover effect
4. Hero 3D card-flip entrance animation
5. Hero heading slide-in animations (left from +150px, right from -150px)
6. Page transitions (opacity fade, 200ms tween)
7. Service accordion toggle
8. FAQ accordion with chevron rotation

### Should Have (high fidelity)
9. Nav expand/collapse with spring animation
10. Nav scroll hide with tween
11. Counter animations on scroll
12. Green dot glow pulse
13. "Hi" circle expand on hover
14. Project card image zoom on hover
15. Noise background overlay (GIF texture, mix-blend: color-dodge, opacity: 0.12)

### Nice to Have (polish)
16. Cursor color-burn variant
17. Cursor text-label variants
18. Blog card border glow on hover
19. Smooth scrolling (Lenis)
20. Social icon hover color transitions
