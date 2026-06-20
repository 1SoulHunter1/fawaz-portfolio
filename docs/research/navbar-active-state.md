# Navbar — Active State & 3D Hover Analysis

## Problem

On hover, nav link text disappears instead of showing the lime-colored second face. Only a green dot (the lime text's period/baseline) is faintly visible.

## Root Cause

The 3D text flip container (`motion.div`) is missing `transform-style: preserve-3d`. Without it, the child span's `rotateX(90deg)` is flattened to 2D — rendering it as an edge-on line (invisible) instead of a perpendicular 3D face.

## How the Original Handles It

### Structure (per nav link)

```
<a> (overflow: hidden, height: 24px)
  └─ <div.framer-glk0yt> (transform-style: preserve-3d, height: 24px, overflow: visible)
       ├─ <div> Face 1: white text (transform: none, origin: center)
       └─ <div> Face 2: lime text (transform: rotateX(90deg), origin: 50% 0%)
```

### Key CSS Properties

| Element | Property | Value |
|---------|----------|-------|
| Link (`<a>`) | overflow | hidden |
| Link (`<a>`) | height | 24px |
| Wrap div | transform-style | **preserve-3d** |
| Wrap div | overflow | visible |
| Wrap div | height | 24px |
| Wrap div | perspective | via `perspective(1200px)` in transform |
| Face 1 | transform | none |
| Face 1 | transform-origin | 50% 50% (center) |
| Face 1 | color | rgb(255, 255, 255) — white |
| Face 2 | transform | rotateX(90deg) |
| Face 2 | transform-origin | 50% 0% — top edge |
| Face 2 | color | rgb(208, 255, 113) — lime |

### How the 3D Flip Works

1. Both faces occupy the same 24px height in document flow (face 2 starts at y=24)
2. Face 2 has `rotateX(90deg)` with origin at its own top edge → perpendicular to screen, invisible
3. The link's `overflow: hidden` clips face 2 from view in its resting state
4. On hover, the wrap div animates `rotateX(0 → -90deg)` around the top edge
5. With `preserve-3d`, face 2 composes in 3D → rotates from perpendicular to flat → visible
6. Face 1 simultaneously rotates from flat to perpendicular → hidden

### Active State

The original Portavia site does **not** have a visible active state indicator:
- Active link gets `data-framer-page-link-current="true"` but no CSS change
- All links have identical computed styles regardless of active status
- Face 1 color is always white; face 2 color is always lime
- No green indicator dot or underline exists in the DOM

## Fix

Add `transformStyle: "preserve-3d"` to the motion.div's style prop in the NavLink component.

```diff
 <motion.div
   animate={{ rotateX: hovered ? -90 : 0 }}
   transition={{ duration: 0.35, ease: EASE }}
-  style={{ transformPerspective: 1200, transformOrigin: "50% 0%" }}
+  style={{ transformPerspective: 1200, transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
   className="flex flex-col"
 >
```
