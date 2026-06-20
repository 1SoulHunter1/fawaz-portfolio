# Homepage Interactions — Complete Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20
> **Method:** Chrome DevTools MCP — DOM attribute extraction, computed style inspection, event behavior observation

---

## 1. Custom Cursor System

The entire site replaces the native cursor with a custom lime-green dot that morphs based on context.

### 1.1 Default Cursor

```
Element: [data-framer-name="Default"]
├── position: fixed
├── z-index: 13
├── width: 16px
├── height: 16px
├── border-radius: 99px
├── background-color: #d0ff71
├── pointer-events: none
├── mix-blend-mode: normal
├── transform: translate(mouseX, mouseY)
```

- **Tracking:** `mousemove` event listener, position interpolated with LERP factor 0.12
- **Loop:** `requestAnimationFrame` — not tied to scroll events
- **Touch devices:** Cursor is not rendered (detected via `matchMedia('(pointer: coarse)')` or similar)
- **Window leave:** Cursor opacity fades to 0 on `mouseleave`

### 1.2 Cursor Variant System

The original uses `data-framer-cursor` attributes on elements to trigger different cursor appearances. Seven unique variant IDs exist on the homepage:

| Variant ID | Trigger Elements | Behavior |
|-----------|-----------------|----------|
| `17ph7dh` | Unknown (possibly global) | Default dot |
| `m5u3ny` | Service item 1 (UI/UX Design) | Image cursor |
| `12j85ib` | Service item 2 (Graphic Design) | Image cursor |
| `l38x1i` | Service item 3 (Web Development) | Image cursor |
| `16q859` | Service item 4 (Branding) | Image cursor |
| `1hyjosv` | CTA links (Browse All, My Story) | Arrow expand |
| `1bde3zh` | Project cards, nav links | Arrow expand |

### 1.3 Arrow Variant

```
Trigger: data-cursor="arrow" (or equivalent)
Appearance:
├── width: 70px (expanded from 16px)
├── height: 70px
├── border-radius: 99px
├── background-color: #d0ff71
├── Contains: diagonal arrow icon (SVG, rotated -45°)
Transition: width/height 300ms ease-out
```

Used on: navbar links, project cards, blog cards, and CTA links.

### 1.4 Image Variant

```
Trigger: data-cursor="image" + data-cursor-image="{url}"
Appearance:
├── width: 200px
├── height: 200px
├── border-radius: 20px
├── background-color: transparent
├── Contains: <img> with src from data-cursor-image
├── object-fit: cover
Transition: width/height 300ms ease-out, opacity 200ms
```

Used on: service accordion items. Each item has a unique image:

| Service | Image |
|---------|-------|
| UI/UX Design | Design process workspace photo |
| Graphic Design | Creative work example photo |
| Web Development | Web development screen photo |
| Branding | Branding project photo |

### 1.5 Blend Variant

```
Trigger: data-cursor="blend"
Appearance:
├── width: 16px (unchanged)
├── height: 16px
├── mix-blend-mode: color-burn
```

Used on: certain text elements where the lime dot needs to be visible against varied backgrounds.

---

## 2. Navbar Interactions

### 2.1 Scroll Expand/Collapse

```
Behavior:
├── At top (scrollY < threshold): Full nav — avatar + 4 links + Contact button
├── On scroll down: Collapses to avatar + "Available for work" pill
├── On scroll to top: Re-expands to full nav
│
Animation:
├── Layout transition via LayoutGroup (duration: 0.7s)
├── Links: AnimatePresence with blur(4px) on enter/exit
├── Width: smooth auto-resize layout animation
├── "Available for work" pill: fades in during collapse
│
Positioning:
├── Fixed, centered horizontally, top: 20px
├── Background: rgba(15, 15, 15, 0.9)
├── Backdrop filter: blur(5px)
├── Border radius: 28px
├── z-index: above content and noise overlay
```

### 2.2 Link Hover — 3D Flip

```
Container: perspective(1200px) on each link wrapper

Default state:
├── White text (current link label): rotateX(0°), opacity 1
├── Lime text (duplicate label): rotateX(-90°), opacity 0, positioned below

Hover state:
├── White text: rotateX(90°) — flips up and away
├── Lime text: rotateX(0°) — flips into view from below
│
Duration: ~300ms
Origin: center center
Color: white → #d0ff71 (lime)
```

### 2.3 Contact Button — Circle Fill

```
Structure:
├── Button container (overflow:hidden, border-radius:99px, border:1px solid white)
│   ├── Text "Contact" (position:relative, z-index:10)
│   └── Circle div (position:absolute, bottom:center, 20×20px, bg:#d0ff71, border-radius:99px)

Hover behavior:
├── Circle scales from 1 → 9 (20px × 9 = 180px, covers full button)
├── Duration: ~400ms
├── Easing: ease-out
├── Text remains readable via z-index stacking

Click: Navigates to #contact (smooth scroll)
```

### 2.4 Available-for-Work Pill

```
Structure:
├── Container (border-radius:99px, border:1px, padding-inline:12px, height:32px)
│   ├── Green dot (8px, bg:#0bde66, rounded-full)
│   │   └── Pulse ring (absolute, animate-ping)
│   └── Text "Available for Work" (14px, Inter)
│
Pulse animation:
├── scale: 1 → 1.5 → 1
├── opacity: 1 → 0.5 → 1
├── Duration: 2000ms
├── Repeat: infinite
```

### 2.5 Mobile Hamburger

```
Trigger: Tap on hamburger icon (visible < 1024px / lg breakpoint)

Line animation:
├── Default: 3 horizontal lines
├── Open: top/bottom rotate to X (±45°), middle fades to opacity 0

Menu:
├── AnimatePresence dropdown below navbar
├── Contains: all nav links + Contact button
├── Close on: link click, tap outside, or hamburger tap
```

---

## 3. Service Accordion Interactions

### 3.1 Expand/Collapse

```
Trigger: Click on accordion item button (full-width clickable area)

Expand:
├── grid-template-rows: 0fr → 1fr
├── Content slides down (overflow:hidden on inner container)
├── Chevron: rotate(0°) → rotate(180°)
├── Duration: 400ms
├── Easing: ease-out

Collapse:
├── grid-template-rows: 1fr → 0fr
├── Content slides up
├── Chevron: rotate(180°) → rotate(0°)

Multiple open: YES — multiple items can be expanded simultaneously
```

### 3.2 Cursor Image on Hover

```
Each accordion item header triggers the image cursor variant:
├── Item 1 "UI/UX Design" → cursor shows design workspace image
├── Item 2 "Graphic Design" → cursor shows creative work image
├── Item 3 "Web Development" → cursor shows web dev screen image
├── Item 4 "Branding" → cursor shows branding project image

Implementation:
├── data-framer-cursor="{variant-id}" on each item's top-level div
├── Cursor system reads variant ID, maps to image URL
├── Cursor dot expands to 200×200px rounded rect showing the image
```

### 3.3 Accordion Content

```
Expanded content:
├── Bullet list of sub-services
├── Each bullet: "•" prefix + service name
├── Font: Inter, 16px, weight 300
├── Color: white
├── Line-height: ~24px
├── Padding-top: 16px below the divider line
```

---

## 4. Project Card Interactions

### 4.1 Hover Effects

```
Trigger: Mouse enters project card area

Image zoom:
├── <img> transform: scale(1) → scale(1.05)
├── Duration: 400ms
├── Easing: ease-out

Overlay darken:
├── Gradient overlay opacity: 0.6 → 0.8
├── Duration: 300ms

Cursor:
├── Custom cursor switches to arrow variant (70px expanded circle)
├── data-cursor="arrow" on card link wrapper

Project info:
├── Category, title, description remain visible
├── No additional text animation on hover
```

### 4.2 Sticky Stacking

```
Behavior: Cards are position:sticky — they stack on top of each other as user scrolls

Card 1: sticky top, normal position
Card 2: appears below, sticks, overlaps card 1
Card 3: appears below, sticks, overlaps card 2
Card 4: same pattern

Each card:
├── position: sticky
├── top: calculated to create stacking offset
├── Full card is clickable (Link wrapper)
├── Cards don't move sideways — pure vertical stacking
```

---

## 5. CTA Link Interactions

All section CTA links ("Browse All Projects", "Browse All Insights", "My Story") share the same interaction pattern:

### 5.1 Hover

```
Text opacity: 1.0 → slight dim
Arrow icon: may shift right slightly (~4px translateX)
Cursor: switches to arrow or blend variant
```

### 5.2 Circle-Fill (on some CTAs)

```
Some CTA links in the original have the same circle-fill pattern as the Contact button:
├── Small circle positioned at one end
├── On hover: circle expands to fill the entire link area
├── Text inverts color (white → dark or vice versa)
├── Duration: ~400ms
```

### 5.3 Click

```
Navigation: Route change with page transition (opacity fade ~200ms)
```

---

## 6. FAQ Interactions

### 6.1 Accordion

```
Trigger: Click on FAQ question row

Expand:
├── Answer text slides down (grid-rows 0fr → 1fr)
├── Chevron rotates 180°
├── Duration: 400ms

Exclusive open: YES — only one FAQ item open at a time
├── Opening item A closes the previously open item B
```

### 6.2 Row Hover

```
Trigger: Mouse enters FAQ item row
Behavior:
├── Background subtly lightens (transparent → rgba(255,255,255,0.03))
├── Duration: 200ms
├── This is MISSING in the clone
```

### 6.3 Sticky Title

```
Left column (440px):
├── position: sticky
├── top: 100px
├── Stays visible while user scrolls through FAQ items
├── Contains: "Frequently Asked Questions" H2 + description
├── This is MISSING in the clone (column scrolls with content)
```

---

## 7. Blog Card Interactions

### 7.1 Hover

```
Card scale:
├── transform: scale(1) → scale(1.02)
├── Duration: 300ms

Image zoom:
├── Image within card: scale(1) → scale(1.05)
├── Duration: 400ms

Cursor:
├── Arrow variant (70px expanded)
```

### 7.2 Click

```
Navigation to /blogs/{slug}
Page transition: opacity fade
```

---

## 8. Contact Form Interactions

### 8.1 Input Fields

```
Focus behavior:
├── Border color: transparent/dark → #d0ff71 (lime)
├── Duration: 200ms (CSS transition)
├── No label float animation
├── Placeholder text disappears on input (standard HTML behavior)

Field list:
├── Name (type:text, placeholder:"John Smith")
├── Email (type:email, placeholder:"johnsmith@gmail.com")
├── Service (type:select, options: Branding, Web Design, UI/UX)
├── Message (type:textarea, placeholder:"Hello, I'd like to enquire about...")

Styling:
├── Background: #303030
├── Border: 1px solid transparent (→ lime on focus)
├── Border-radius: 12px
├── Padding: 16px
├── Font: Inter, 16px, white
├── Placeholder color: #b5b5b5
```

### 8.2 Submit Button

```
Structure:
├── Full-width button (or close to it)
├── Background: transparent (border only)
├── Border: 1px solid white
├── Border-radius: 99px
├── Padding: 6px 40px 10px
├── Font: Antonio, 18px, white
├── Text: "Send Message"

Hover:
├── Circle-fill animation (same as Contact nav button)
├── Lime circle expands from center/bottom
├── Text color inverts: white → dark (#1a1a1b)
├── Duration: ~400ms
```

### 8.3 Form Submission

```
Original: Framer form handler (server-side processing)
Behavior: POST to Framer endpoint, shows success message
Clone: e.preventDefault() only — no backend
```

---

## 9. Social Icon Interactions

### 9.1 About Panel (Homepage)

```
Icons: X (Twitter), Instagram, Behance, Dribbble
Size: 30×30px each
Gap: 20px between icons

Hover:
├── No background change (transparent container)
├── Opacity: 1 → 0.8
├── Cursor: pointer (or custom arrow variant)

Click:
├── Opens external URL in new tab
├── target="_blank" + rel="noopener noreferrer"
```

### 9.2 Footer

```
Icons: Same 4 social platforms
Container: 40×40px black circle background
Gap: 12px between circles

Hover:
├── Subtle opacity change
├── No color transition
```

---

## 10. Scroll Interactions

### 10.1 Smooth Scroll (Lenis)

```
Library: Lenis (installed via npm)
Config:
├── smooth: true
├── lerp: ~0.1 (smooth factor)
├── duration: ~1.2s (estimated)
├── Wraps entire page content
├── Adds html.lenis class
├── Provides buttery smooth scroll momentum
```

### 10.2 Scroll-to-Contact

```
Trigger: Click "Contact" in navbar (or CTA links)
Behavior:
├── Smooth scroll to #contact section
├── Uses Lenis scrollTo or native scrollIntoView
├── Duration: depends on distance (~800ms typical)
```

### 10.3 Scroll-Driven Animations

```
Homepage elements that respond to scroll position:
1. Card 3D flip (sections 1–3, progress 0–1 over 300vh)
2. Badge opacity fade (progress 0–0.32)
3. Project card stacking (sticky position)
4. Section entrance reveals (IntersectionObserver trigger)
5. CountUp numbers (triggered on enter viewport)
```

---

## 11. Page Transition Interaction

```
Trigger: Any route navigation (link click)

Behavior (original):
├── Current page: opacity 1 → 0, ~200ms
├── New page: opacity 0 → 1, ~200ms
├── Total transition: ~400ms
├── Smooth, no flash or hard cut

Implementation:
├── Framer's built-in page transition system
├── In clone: would need AnimatePresence wrapper in layout.tsx
```

---

## 12. Interaction Map (by Cursor Position)

This table maps where on the homepage each interaction is available:

| Scroll Region | Element | Hover Effect | Cursor Variant | Click Action |
|--------------|---------|--------------|----------------|--------------|
| 0–732px | Navbar links | 3D flip | Arrow (1bde3zh) | Navigate |
| 0–732px | Contact button | Circle fill | Arrow | Scroll to #contact |
| 0–732px | Card (sticky) | None (transforms on scroll) | Default | None |
| 732–1464px | Accordion items | Image cursor | Image (m5u3ny etc.) | Expand/collapse |
| 732–1464px | Accordion chevron | — | — | Expand/collapse |
| 1464–2196px | Social icons | Opacity dim | Pointer | External link |
| 1464–2196px | "My Story" CTA | Opacity dim | Arrow (1hyjosv) | Navigate to /about |
| 2196–6089px | Project cards | Image zoom + overlay | Arrow (1bde3zh) | Navigate to project |
| 2196–6089px | "Browse All" CTA | Opacity dim | Arrow (1hyjosv) | Navigate to /projects |
| 6089–7046px | Testimonial cards | None | Default | None |
| 7046–7870px | FAQ items | Row highlight | Default | Expand/collapse |
| 7870–8907px | Blog cards | Scale + image zoom | Arrow | Navigate to blog |
| 7870–8907px | "Browse All" CTA | Opacity dim | Arrow | Navigate to /blogs |
| 8907–9769px | Form inputs | Border lime on focus | Default | — |
| 8907–9769px | Submit button | Circle fill | Default | Form submit |
| 9769–9974px | Footer links | Opacity dim | Pointer | External link |
