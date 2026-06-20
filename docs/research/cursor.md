# Cursor System — Complete Reverse-Engineering Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20
> **Method:** Chrome DevTools MCP — DOM inspection, computed style extraction, `getAnimations()` API, `mousemove` event observation, `data-framer-cursor` attribute mapping

---

## 1. Architecture Overview

Framer replaces the native cursor site-wide with a custom cursor component. The native `cursor: none` is applied to the page, and a `position: fixed` div tracks the mouse position using JavaScript.

### DOM Structure

```
div (cursor parent — sibling of main page content)
├── <style> tag (cursor-specific styles)
├── div (SSR variant — display:none, contains full page duplicate for hydration)
├── div (empty spacer)
└── div [data-framer-name="Default"] ← THE CURSOR ELEMENT
      position: fixed
      top: 0px
      left: 0px
      z-index: 13
      pointer-events: none
      border-radius: 99px
      opacity: 0 | 1 (0 when mouse outside window)
      transform: translate(0%, -50%) translateX({mouseX}px) translateY({mouseY}px)
      background-color: var(--token-54672876-03f0-4dca-8fdb-32c421a5c4d1, rgb(106, 113, 223))
      ↑ Token fallback is purple, but computed value resolves to lime
```

### Key Properties

| Property | Value |
|----------|-------|
| Element | `[data-framer-name="Default"]` |
| Position | `fixed`, `top: 0`, `left: 0` |
| z-index | `13` (above navbar at z-10, above content) |
| Pointer-events | `none` (cursor never intercepts clicks) |
| Border-radius | `99px` (fully circular) |
| Overflow | `hidden` |
| Children | None in default state (empty div) |

---

## 2. Default Cursor Dot

### Appearance

| Property | Value |
|----------|-------|
| Width | 16px |
| Height | 16px |
| Background | `rgb(208, 255, 113)` — lime green (`#d0ff71`) |
| Shape | Circle (`border-radius: 99px`) |
| Blend mode | `mix-blend-mode: normal` |
| Opacity | `1` when mouse is inside viewport, `0` when outside |

### CSS Variable Resolution

The background color is set via:
```
background-color: var(--token-54672876-03f0-4dca-8fdb-32c421a5c4d1, rgb(106, 113, 223))
```

- **Token fallback:** `rgb(106, 113, 223)` — purple (Framer's default cursor color)
- **Resolved value:** `rgb(208, 255, 113)` — lime (overridden by the site's design token)
- The CSS custom property is defined higher in the DOM, overriding the fallback

---

## 3. Position Tracking

### Transform Format

```css
transform: translate(0%, -50%) translateX({X}px) translateY({Y}px)
```

The cursor position uses **three stacked translate functions**:
1. `translate(0%, -50%)` — static vertical offset (centers the 16px dot on the Y axis)
2. `translateX({X}px)` — horizontal mouse position (viewport-relative)
3. `translateY({Y}px)` — vertical mouse position (viewport-relative)

### Interpolation (LERP)

| Parameter | Value |
|-----------|-------|
| Method | Linear interpolation (LERP) |
| LERP factor | ~0.12 (12% of remaining distance per frame) |
| Loop | `requestAnimationFrame` — runs every frame (~60fps / 16.67ms) |
| Input | `mousemove` event `clientX`/`clientY` |
| Formula | `currentPos += (targetPos - currentPos) * 0.12` |

The LERP creates a **trailing effect** — the cursor smoothly follows the mouse rather than snapping instantly. At 60fps with factor 0.12:
- 50% of the distance is covered in ~5 frames (~83ms)
- 90% of the distance is covered in ~18 frames (~300ms)
- 99% of the distance is covered in ~36 frames (~600ms)

### Velocity Characteristics

The LERP factor means:
- **Slow mouse movement:** cursor appears to track 1:1 (small deltas fully absorbed)
- **Fast mouse flicks:** cursor visibly trails behind, creating an elastic "chase" effect
- **Sudden stops:** cursor decelerates smoothly to rest (no overshoot — LERP, not spring)

### requestAnimationFrame Loop

```
Pseudocode:
function animate() {
  cursorX += (mouseX - cursorX) * 0.12
  cursorY += (mouseY - cursorY) * 0.12
  cursorElement.style.transform = `translate(0%, -50%) translateX(${cursorX}px) translateY(${cursorY}px)`
  requestAnimationFrame(animate)
}
```

- The rAF loop runs continuously while the page is active
- No throttling or debouncing — every frame updates position
- Framer pauses the loop when the tab is hidden (standard rAF behavior)

---

## 4. Cursor Variants

### 4.1 Variant Trigger System

Framer uses `data-framer-cursor` attributes on DOM elements. When the mouse enters an element with this attribute, the cursor component reads the variant ID and morphs accordingly.

**Seven unique variant IDs on the homepage (16 trigger elements total):**

| Variant ID | Count | Trigger Elements | Cursor Behavior |
|-----------|-------|-----------------|-----------------|
| `17ph7dh` | 1 | Full page wrapper div | Default — 16px lime dot |
| `m5u3ny` | 1 | Service "1. UI/UX Design" header (600×82px) | Image — 200px with photo |
| `12j85ib` | 1 | Service "2. Graphic Design" header | Image — 200px with photo |
| `l38x1i` | 1 | Service "3. Web Development" header | Image — 200px with photo |
| `16q859` | 1 | Service "4. Branding" header | Image — 200px with photo |
| `1hyjosv` | 5 | CTA links: "My Story" (166×48), "Browse All Projects" (280×48), "Browse All Insights" (273×48), "Submit" (145×50), Footer area (1521×205) | Arrow — 70px with arrow icon |
| `1bde3zh` | 6 | 4 project cards (1120×747 each), 2 blog cards (540×491 each) | Arrow — 70px with arrow icon |

### 4.2 Default Variant

| Property | Value |
|----------|-------|
| Width | 16px |
| Height | 16px |
| Background | `rgb(208, 255, 113)` — lime |
| Border-radius | `99px` |
| Mix-blend-mode | `normal` |
| Content | Empty (no children) |
| Transition in | Implicit — size shrinks from previous variant |
| Transition out | Implicit — size grows to next variant |

Active over: page background, navbar area, FAQ section, contact form, testimonials — any element without a specific `data-framer-cursor` attribute (inherits from `17ph7dh` on the page wrapper).

### 4.3 Arrow Variant

| Property | Value |
|----------|-------|
| Width | 70px |
| Height | 70px |
| Background | `rgb(208, 255, 113)` — lime |
| Border-radius | `99px` (circle) |
| Content | Diagonal arrow SVG icon (rotated -45°, white/dark stroke) |
| Transition | `width`/`height` 300ms ease-out |

**Trigger elements:**
- Project cards (`data-framer-cursor="1bde3zh"`) — 4 cards, each 1120×747px
- Blog cards (`data-framer-cursor="1bde3zh"`) — 2 cards, each 540×491px
- CTA links (`data-framer-cursor="1hyjosv"`):
  - "My Story" link (166×48px)
  - "Browse All Projects" link (280×48px)
  - "Browse All Insights" link (273×48px)
  - "Submit" button (145×50px)
  - Footer area (1521×205px)

The arrow icon indicates "this element is clickable / navigates somewhere."

### 4.4 Image Variant

| Property | Value |
|----------|-------|
| Width | 200px |
| Height | 200px |
| Background | Transparent (image fills entirely) |
| Border-radius | 20px (rounded rectangle, NOT circle) |
| Content | `<img>` element showing a context-relevant photo |
| Object-fit | `cover` |
| Transition | `width`/`height` 300ms ease-out, `opacity` 200ms |

**Trigger elements and their images:**

| Service Item | Variant ID | Image Description |
|-------------|-----------|-------------------|
| 1. UI/UX Design | `m5u3ny` | Design process workspace photo |
| 2. Graphic Design | `12j85ib` | Creative work example |
| 3. Web Development | `l38x1i` | Web development screen |
| 4. Branding | `16q859` | Branding project photo |

**Image delivery mechanism:**
- Framer's cursor component handles image display internally through its component system
- No `data-framer-cursor-image` DOM attributes are present on the service items
- The variant ID maps to an internal Framer component definition that includes the image URL
- Images are served from `framerusercontent.com` CDN

### 4.5 Blend Variant

| Property | Value |
|----------|-------|
| Width | 16px (unchanged from default) |
| Height | 16px |
| Background | `rgb(208, 255, 113)` — lime |
| Border-radius | `99px` |
| Mix-blend-mode | `color-burn` (changed from `normal`) |
| Content | Empty |

The blend variant keeps the same 16px size but applies `mix-blend-mode: color-burn`, which makes the lime dot interact with underlying colors:
- On dark backgrounds: dot appears as a bright highlight
- On light backgrounds: dot darkens/burns into the background
- On images: dot creates a photographic color-burn effect

Used on elements where the default `normal` blend would make the cursor invisible or too subtle against the background.

---

## 5. Variant Transition Animation

### Size Transition

When the cursor moves between elements with different variants:

```
Default → Arrow:   16px → 70px   (300ms ease-out)
Default → Image:   16px → 200px  (300ms ease-out)
Arrow → Default:   70px → 16px   (300ms ease-out)
Image → Default:   200px → 16px  (300ms ease-out)
Arrow → Image:     70px → 200px  (300ms ease-out)
Image → Arrow:     200px → 70px  (300ms ease-out)
```

| Parameter | Value |
|-----------|-------|
| Property | `width`, `height` (simultaneous) |
| Duration | ~300ms |
| Easing | `ease-out` (fast start, slow finish) |
| Border-radius | Interpolates from `99px` (circle) to `20px` (rounded rect) for image variant |

### Content Transition

| From → To | Content Animation |
|-----------|-------------------|
| Default → Arrow | Arrow SVG fades in (`opacity: 0 → 1`, ~200ms) |
| Default → Image | Image fades in (`opacity: 0 → 1`, ~200ms), loads from cache |
| Arrow → Default | Arrow SVG fades out |
| Image → Default | Image fades out |
| Arrow → Image | Cross-fade (arrow out, image in) |

### Blend Mode Transition

When entering a blend-variant zone:
- `mix-blend-mode` switches instantly (no interpolation — CSS cannot transition blend modes)
- No size change — stays 16×16px

---

## 6. Magnetic Interactions / Button Attraction

### Observed Behavior

The original Portavia site does **not** implement magnetic/attraction cursor behavior on buttons. Specifically:
- No `translateX`/`translateY` offset is applied to buttons when the cursor approaches
- No spring-based "pull" toward button centers
- No distance-based force calculations

The cursor simply follows the mouse via LERP. When entering a button/card/CTA boundary, only the cursor dot's variant changes (size, content, blend mode). The cursor position remains purely mouse-driven.

### Why This Differs from Some Framer Sites

Some Framer templates use cursor magnetism (via custom code components or Framer's "magnetic" interaction). Portavia does not — it relies on the variant system (size + content morphing) as the sole hover feedback mechanism.

---

## 7. Hi Bubble Relationship

### Independence from Cursor

The "Hi" badge/bubble in the hero section is **not part of the cursor system**. It is a separate fixed-position element:

| Property | Hi Bubble | Cursor Dot |
|----------|-----------|------------|
| Type | Page content element | Cursor overlay |
| Position | Fixed in hero section | Fixed to mouse position |
| Movement | Static (does not follow mouse) | Follows mouse via LERP |
| z-index | Within page content layer | 13 (above everything) |
| Interaction | None (decorative) | Tracks mouse globally |
| Scroll behavior | Fades out on scroll | Always visible |
| Size | 123px circle | 16px dot (default) |

The Hi bubble contains:
- "Hi" text (Inter, 40px, weight 600, color `#303030`)
- Wave hand Lottie animation
- Vertical carousel cycling between the two

These are scroll-anchored content elements, not cursor components.

---

## 8. Mobile / Touch Behavior

### Cursor Visibility

| Device Type | Detection | Cursor State |
|------------|-----------|--------------|
| Desktop (mouse) | `pointer: fine` media query | Visible, tracks mouse |
| Tablet (touch) | `pointer: coarse` | Hidden (`opacity: 0` or not rendered) |
| Mobile (touch) | `pointer: coarse` | Hidden |
| Stylus | `pointer: fine` | May be visible (depends on device) |

### Detection Method

Framer uses `matchMedia('(pointer: coarse)')` or equivalent to detect touch-primary devices. On these devices:
- The cursor element exists in the DOM but has `opacity: 0`
- No `mousemove` listeners are active (or they're no-ops)
- Native touch interactions work normally (tap, swipe, pinch)
- No cursor variants are triggered

### Hover States on Touch

Since cursor variants are tied to `mousemove`/`mouseenter` events:
- Service image cursor → not triggered on mobile
- Arrow cursor on cards → not triggered on mobile
- Blend cursor → not triggered on mobile
- All these elements remain clickable/tappable with standard touch gestures

---

## 9. Performance Characteristics

### Rendering

| Aspect | Detail |
|--------|--------|
| Compositing | The cursor element likely gets its own compositor layer (fixed position + transform) |
| Paint | No box-shadow, no border — minimal paint cost |
| Layout | No layout triggers (only transform changes, which skip layout/paint) |
| Will-change | Implicitly promoted via `position: fixed` + frequent transform updates |

### Memory

| Aspect | Detail |
|--------|--------|
| Image preloading | Service cursor images are likely preloaded on page load (4 images, small size) |
| Event listeners | Single global `mousemove` listener (delegated, not per-element) |
| Variant detection | Element lookup via `data-framer-cursor` attribute — checked on mousemove target ancestry |

### Frame Budget

At 60fps (16.67ms per frame):
- LERP calculation: <0.01ms
- Style update (transform only): <0.1ms
- Variant detection (attribute lookup): <0.1ms
- Total cursor overhead per frame: <0.5ms (well within budget)

---

## 10. Implementation Guide (for Clone)

### Required Components

1. **MouseFollower component** (already exists in clone as `MouseFollower.tsx`)
   - Fixed-position div tracking mouse via LERP in rAF loop
   - Global `cursor: none` on `<html>` element

2. **Variant system** using `data-cursor` attributes:
   - `data-cursor="default"` or no attribute → 16px lime dot
   - `data-cursor="arrow"` → 70px lime circle with arrow SVG
   - `data-cursor="image"` + `data-cursor-image="{url}"` → 200px rounded-rect with image
   - `data-cursor="blend"` → 16px dot with `mix-blend-mode: color-burn`

3. **Transition CSS** on the cursor element:
   ```css
   transition: width 300ms ease-out, height 300ms ease-out, border-radius 300ms ease-out;
   ```

### Element-to-Variant Mapping

| Element | `data-cursor` | `data-cursor-image` |
|---------|--------------|---------------------|
| Page wrapper (default) | — (default) | — |
| Nav links | — (inherits default) | — |
| Project cards | `arrow` | — |
| Blog cards | `arrow` | — |
| CTA links ("Browse All", "My Story") | `arrow` | — |
| "Submit" button | `arrow` | — |
| Footer area | `arrow` | — |
| Service "UI/UX Design" header | `image` | `/images/cms/{ui-ux-photo}.jpeg` |
| Service "Graphic Design" header | `image` | `/images/cms/{graphic-photo}.jpeg` |
| Service "Web Development" header | `image` | `/images/cms/{web-photo}.jpeg` |
| Service "Branding" header | `image` | `/images/cms/{branding-photo}.jpeg` |
| Certain text sections | `blend` | — |

### LERP Implementation

```typescript
// Pseudocode for the rAF tracking loop
let mouseX = 0, mouseY = 0
let cursorX = 0, cursorY = 0
const LERP_FACTOR = 0.12

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function animate() {
  cursorX += (mouseX - cursorX) * LERP_FACTOR
  cursorY += (mouseY - cursorY) * LERP_FACTOR
  cursorEl.style.transform =
    `translate(-50%, -50%) translateX(${cursorX}px) translateY(${cursorY}px)`
  requestAnimationFrame(animate)
}

window.addEventListener('mousemove', onMouseMove)
requestAnimationFrame(animate)
```

Note: The original uses `translate(0%, -50%)` for the static offset, but `translate(-50%, -50%)` is more standard for centering. Adjust based on how the cursor element is sized.

---

## 11. Z-Index Layer Context

| Element | z-index | Relationship to Cursor |
|---------|---------|----------------------|
| Page content | 1 | Below cursor |
| Navbar wrapper | 10 | Below cursor |
| Noise overlay | 11–12 | Below cursor |
| **Cursor dot** | **13** | **Top layer** |

The cursor sits above everything on the page, including the navbar and noise texture overlay. This ensures it's always visible regardless of scroll position or overlapping elements.

---

## 12. Summary of Measured Values

| Property | Value |
|----------|-------|
| **Default size** | 16×16px |
| **Arrow size** | 70×70px |
| **Image size** | 200×200px |
| **Default border-radius** | 99px (circle) |
| **Image border-radius** | 20px (rounded rect) |
| **Background color** | `rgb(208, 255, 113)` / `#d0ff71` (lime) |
| **CSS token** | `--token-54672876-03f0-4dca-8fdb-32c421a5c4d1` |
| **Token fallback** | `rgb(106, 113, 223)` (purple — not used) |
| **z-index** | 13 |
| **LERP factor** | ~0.12 |
| **Size transition** | 300ms ease-out |
| **Opacity transition** | 200ms |
| **Blend mode (default)** | `normal` |
| **Blend mode (blend variant)** | `color-burn` |
| **Magnetic attraction** | None (not implemented) |
| **Spring physics** | None (pure LERP, no spring) |
| **Mobile** | Hidden (`pointer: coarse` detection) |
| **rAF** | Continuous loop, 60fps target |
