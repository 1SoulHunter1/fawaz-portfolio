# Navbar — Full Reverse-Engineering Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20 (updated — corrects prior inaccuracies)
> **Viewport:** 1536 × 674 (desktop, measured)
> **Method:** Chrome DevTools MCP — computed styles, DOM hierarchy, getBoundingClientRect(), data-framer-name attribute tracking across scroll states

---

## 1. DOM Hierarchy

```
div (grandparent)
  data-framer-cursor="17ph7dh"        ← sets default cursor variant for whole page
  position: relative
  width: full page
  height: full page

  └── div (parent — fixed positioning wrapper)
        position: fixed
        z-index: 10
        top: 20px
        left: 50%
        transform: translateX(-50%)     ← centering via negative half-width offset
        width: auto (matches nav content)
        height: auto (matches nav content)

        └── nav [data-framer-name="Desktop / Open" | "Desktop / Closed"]
              position: relative
              display: flex
              flex-direction: row
              align-items: center
              justify-content: flex-end
              overflow: hidden
              border-radius: 28px
              background: rgba(15, 15, 15, 0.9)
              backdrop-filter: blur(5px)
              transition: all

              ├── div [data-framer-name="Avatar & Button Wrap"]
              │     display: flex, align-items: center, gap: 10px
              │
              │     └── div (component container)
              │           └── div [data-framer-name="Only Avatar"]             ← OPEN state
              │           OR  div [data-framer-name="Desktop / Available Glow"] ← CLOSED state
              │
              │               ├── div (avatar container, 40×40, r:99px, overflow:hidden)
              │               │     └── div (absolute wrapper, r:99px)
              │               │           └── img (40×40, r:99px, object-fit:cover)
              │               │
              │               └── div [data-framer-name="Status"]  ← CLOSED only
              │                     display: flex, gap: 10px, align-items: center
              │
              │                     ├── div (link container)
              │                     │     └── a [data-framer-name="Desktop"] (href="./#contact")
              │                     │           display: flex, gap: 10px, overflow: hidden
              │                     │           └── div [data-framer-name="Link Wrap"]
              │                     │                 ├── div > p "Available for work" (white)
              │                     │                 └── div > p "Available for work" (lime — for 3D flip hover)
              │                     │
              │                     ├── div [data-framer-name="Dot"]      ← 6×6, green solid circle
              │                     │
              │                     └── div [data-framer-name="Glowing"]  ← glow pulse behind dot
              │
              ├── div [data-framer-name="Scroll Hide Wrap"]
              │     display: flex, gap: 40px, align-items: center
              │     overflow: hidden
              │
              │     ├── div [data-framer-name="Nav Link Wrap"]
              │     │     display: flex, gap: 20px, align-items: center
              │     │     overflow: hidden
              │     │
              │     │     ├── div (container, z-index: 1)
              │     │     │     └── a [data-framer-name="Desktop"] (href="./")
              │     │     │           display: flex, overflow: hidden
              │     │     │           └── div [data-framer-name="Link Wrap"]
              │     │     │                 flex-direction: column, gap: 0
              │     │     │                 transform: perspective(1200px)
              │     │     │                 transform-style: preserve-3d
              │     │     │                 ├── div (Face 1: default text, white)
              │     │     │                 └── div (Face 2: hover text, lime — rotateX(-90°) at rest)
              │     │     │
              │     │     ├── div (About link — same 3D flip structure)
              │     │     ├── div (Projects link — same structure)
              │     │     └── div (Blogs link — same structure)
              │     │
              │     └── div (Contact button container)
              │           └── a [data-framer-name="Desktop"] (href="./#contact")
              │                 display: flex, align-items: center, justify-content: center
              │                 background: rgb(255, 255, 255)
              │                 border-radius: 99px, padding: 3px 30px 4px, overflow: hidden
              │                 ├── div [data-framer-name="Color BG"] ← lime circle for hover fill
              │                 └── div (RichTextContainer, z-index: 1) → <p> "Contact"
              │
              └── div (collapsed state placeholder — position:absolute, opacity:0, w:0, h:0)
```

---

## 2. State Variants

The `<nav>` element switches its `data-framer-name` attribute between two states:

| State | data-framer-name | Width | Padding | Gap |
|-------|------------------|-------|---------|-----|
| Expanded | `"Desktop / Open"` | 508px | `8px 10px` | `40px` |
| Collapsed | `"Desktop / Closed"` | 229.1px | `8px 20px 8px 10px` | `0px` |

Height remains constant at **56px** in both states.

### Avatar Sub-Component

| Nav State | Avatar Component Name | Width | Shows |
|-----------|-----------------------|-------|-------|
| Open | `"Only Avatar"` | 40px | Just avatar image |
| Closed | `"Desktop / Available Glow"` | 198.1px | Avatar + "Available for work" + green dot |

---

## 3. Dimensions — Open State

| Element | Width | Height | Notes |
|---------|-------|--------|-------|
| Nav container | 508.0px | 56.0px | |
| Avatar & Button Wrap | 40.0px | 40.0px | Avatar only |
| Scroll Hide Wrap | 408.0px | 40.0px | opacity: 1 |
| Nav Link Wrap | 250.0px | 24.0px | |
| Home link | 44.6px | 24.0px | |
| About link | 44.1px | 24.0px | |
| Projects link | 59.9px | 24.0px | |
| Blogs link | 41.5px | 24.0px | |
| Contact button | 117.9px | 40.0px | White pill |
| Color BG circle | 20.0px | 20.0px | Inside Contact btn |
| Contact text | 57.9px | 24.0px | "Contact" |
| Avatar image | 40.0px | 40.0px | Circle, object-fit:cover |

## 4. Dimensions — Closed State

| Element | Width | Height | Notes |
|---------|-------|--------|-------|
| Nav container | 229.1px | 56.0px | |
| Avatar & Button Wrap | 198.1px | 40.0px | Avatar + pill |
| Avatar image | 40.0px | 40.0px | |
| Status container | 148.1px | 24.0px | |
| "Available for work" text | 132.1px | 24.0px | |
| Dot (green) | 6.0px | 6.0px | |
| Glowing (base) | 6.0px | 6.0px | Renders at ~40×40 via scale |
| Scroll Hide Wrap | 1.0px | 40.0px | opacity: 0 |

---

## 5. Positioning

| Property | Value |
|----------|-------|
| Parent wrapper | `position: fixed` |
| z-index | **10** |
| top | **20px** |
| left | `50%` |
| transform | `translateX(-50%)` (dynamic: `-253.98px` at 508px width, `-114.55px` at 229px width) |
| Border-radius | `28px` |
| Background | `rgba(15, 15, 15, 0.9)` — near-black with 90% opacity |
| Backdrop filter | `blur(5px)` |
| Overflow | `hidden` |

---

## 6. Typography

| Element | Font | Size | Weight | Line-height | Color |
|---------|------|------|--------|-------------|-------|
| Nav links (default) | Inter | 16px | 300 | 24px | `rgb(255, 255, 255)` — white |
| Nav links (hover) | Inter | 16px | 300 | 24px | `rgb(208, 255, 113)` — lime |
| Contact button text | Inter | 16px | 300 | 24px | `rgb(48, 48, 48)` — dark |
| "Available for work" (default) | Inter | 16px | 300 | 24px | `rgb(255, 255, 255)` — white |
| "Available for work" (hover) | Inter | 16px | 300 | 24px | `rgb(208, 255, 113)` — lime |

All text is Inter, 16px, weight 300, line-height 24px. No text-transform applied.

---

## 7. Contact Button

| Property | Value |
|----------|-------|
| Background | `rgb(255, 255, 255)` — solid white |
| Border-radius | `99px` |
| Padding | `3px 30px 4px` |
| Width | 117.9px |
| Height | 40px |
| Text color | `rgb(48, 48, 48)` |
| Overflow | `hidden` |
| Border | None (0px none) |

### Color BG Element (Hover Fill Circle)

| Property | Default | On Hover |
|----------|---------|----------|
| Position | `absolute` | `absolute` |
| Width | 20px | ~180px |
| Height | 20px | ~180px |
| Background | `rgb(208, 255, 113)` | same |
| Border-radius | `99px` | `99px` |
| Bottom | `-20px` (below button) | expands upward |
| Left | `-20px` (left of button) | expands rightward |
| z-index | `1` | `1` |

Text "Contact" sits in a separate div at z-index `1`, staying readable above the expanding circle.

---

## 8. Available-for-Work System

### Dot

| Property | Value |
|----------|-------|
| Size | 6px × 6px |
| Background | `rgb(11, 222, 102)` |
| Border-radius | `99px` |
| Position | `relative` (inline in flex row) |

### Glowing

| Property | Value |
|----------|-------|
| Base size | 6px × 6px |
| Rendered size | ~40px × 40px (via scale in transform) |
| Position | `absolute` (overlays the Dot) |
| Background | `rgb(11, 222, 102)` |
| Opacity | `0.5` |
| Border-radius | `1650%` base → animated to `247.587%` |
| Transform | `matrix(0.15, 0, 0, 0.15, -20, -20)` → animated |
| Animation | Single 700ms pulse on appear (NOT infinite loop) |
| Iteration count | `1` |

The glow plays **once** when the nav transitions to Closed state — it's an entrance animation, not a continuous pulse. The component alternates between "Available Glow" and "Available" sub-variants.

---

## 9. Avatar Image

| Property | Value |
|----------|-------|
| Size | 40px × 40px |
| Border-radius | `99px` (circle) |
| Object-fit | `cover` |
| Source | `IUYreEo8ON7qCLgK2tgDOW0xoI.jpg` |
| Container nesting | 3 divs deep: overflow:hidden container → absolute wrapper → img |

---

## 10. Nav Link 3D Flip Structure

Each of the 4 nav links (Home, About, Projects, Blogs) and "Available for work" use the same structure:

```
<a> (overflow: hidden, height: 24px)
  └── div [data-framer-name="Link Wrap"]
        transform: perspective(1200px)         ← matrix3d with -0.000833
        transform-style: preserve-3d
        flex-direction: column, gap: 0

        ├── div (Face 1: default text)
        │     position: relative
        │     transform: none (default) → rotateX(90°) on hover
        │     transform-origin: 50% 50%    ← center center
        │     <p> white text (16px/300/Inter)

        └── div (Face 2: hover text)
              position: relative
              transform: rotateX(-90°) default → rotateX(0°) on hover
              transform-origin: 50% 0%     ← top center
              <p> lime text (16px/300/Inter, #d0ff71)
```

### Matrix References

```
perspective(1200px) =
  matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.000833, 0, 0, 0, 1)

rotateX(-90°) =
  matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)
```

---

## 11. Responsive Behavior

| Viewport | Variant | Width | Behavior |
|----------|---------|-------|----------|
| ≥ 1024px | Desktop / Open or Closed | 508 / 229px | Scroll-direction-based toggle |
| < 1024px | Tablet & Phone / Closed | ~278px | Always collapsed, hamburger menu |

### Mobile Nav

- Avatar + "Available for work" pill + hamburger button
- Hamburger: 3 horizontal lines → on tap: top/bottom rotate ±45° (X shape), middle fades
- Opens: dropdown overlay with all links + Contact button
- Closes on: link click, tap outside, or hamburger re-tap
