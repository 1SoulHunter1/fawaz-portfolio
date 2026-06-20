# Phase 6 — Custom Cursor System Analysis (Homepage)

> Source: https://portavia.framer.website/ at 1440×900 viewport

## Cursor Element

The original site replaces the default browser cursor with a custom lime dot.

### DOM Structure

```html
<div data-framer-name="Default"
     style="position: fixed; z-index: 13; width: 16px; height: 16px;
            background: rgb(208, 255, 113); border-radius: 99px;
            pointer-events: none; top: 0; left: 0;
            transform: matrix(1, 0, 0, 1, X, Y);">
</div>
```

- Sits as a direct child of `#main`, outside the content wrapper
- Highest z-index on the page (13) — above everything including navbar (10)

### Properties

| Property | Value |
|----------|-------|
| Position | `fixed` |
| Size | 16×16px |
| Background | `rgb(208, 255, 113)` — lime green (matches accent color) |
| Border radius | 99px (perfect circle) |
| Pointer events | `none` — click-through |
| Z-index | 13 |
| Top/Left | `0px` / `0px` (base position) |
| Transform | `matrix(1,0,0,1, mouseX, mouseY)` — position via translate |

### Tracking Mechanism

The cursor follows the mouse via **CSS transforms** (not top/left positioning):
- `transform: matrix(1, 0, 0, 1, X, Y)` where X,Y = mouse coordinates
- This is GPU-accelerated and avoids layout reflows
- Framer likely uses `requestAnimationFrame` + `mousemove` listener
- The transform may have slight easing/smoothing for buttery feel

### Cursor States (Expected)

Based on Framer's cursor component patterns:

| State | Appearance | Trigger |
|-------|------------|---------|
| Default | 16×16 lime dot | Normal mouse movement |
| Hover on link | Possibly enlarged (e.g., 40×40) or with blend mode | Hovering interactive elements |
| Hover on card | May show "View" text or scale up | Hovering project cards |
| Hidden | Opacity 0 or display:none | Mouse leaves viewport |

**Note:** Only the "Default" variant was captured in this snapshot. Interactive states need testing by hovering over different elements.

## Implementation for Clone

### Approach: Framer Motion Component

```typescript
// MouseFollower component (already exists in codebase)
// Key requirements:
// 1. Fixed position, pointer-events: none
// 2. Transform-based positioning (not top/left)
// 3. Smooth follow with slight spring delay
// 4. Z-index: 13 (above everything)
// 5. Hide default cursor via CSS: body { cursor: none; }
// 6. State changes on hover (scale up, blend mode, text)
```

### CSS Requirements

```css
/* Hide default cursor on desktop */
@media (pointer: fine) {
  body {
    cursor: none;
  }
  
  /* Show cursor for inputs/textareas */
  input, textarea, select {
    cursor: text;
  }
}

/* Don't hide cursor on touch devices */
@media (pointer: coarse) {
  body {
    cursor: auto;
  }
}
```

### Motion Values for Smooth Follow

```typescript
// Use useSpring for smooth cursor tracking
const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
const cursorX = useSpring(0, springConfig);
const cursorY = useSpring(0, springConfig);

// On mousemove:
cursorX.set(event.clientX - 8);  // -8 = half of 16px width
cursorY.set(event.clientY - 8);
```

### Existing Clone Implementation

The codebase already has a `MouseFollower` component. It needs to match these exact specs:
- 16×16px lime dot
- `rgb(208, 255, 113)` background
- `border-radius: 99px`
- `z-index: 13`
- Transform-based positioning
- `pointer-events: none`
- Desktop only (hide on touch devices)
