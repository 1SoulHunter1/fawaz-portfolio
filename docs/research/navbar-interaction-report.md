# Navbar Interaction Report

## Investigation Date: 2026-06-24

## Key Finding: No Sliding Indicator Dot

The lime green dot that appears beneath hovered nav links in screenshots is **the site-wide custom cursor** (16×16px, `position: fixed`, follows mouse position via `transform: translate`). There is **no separate indicator element** that slides between nav links.

---

## Original Navbar Structure

### Container
| Property | Value |
|----------|-------|
| Width (expanded) | ~508px |
| Width (collapsed) | ~229px |
| Height | 56px |
| Border radius | 28px |
| Background | `rgba(15, 15, 15, 0.9)` |
| Backdrop filter | `blur(5px)` |
| Padding | `8px 10px` |
| Overflow | `hidden` |
| Position | Fixed, centered horizontally, top: 20px |

### Nav Link Hover: 3D Text Flip
Each link contains **two text layers** stacked vertically inside an `overflow: hidden` container:
- **Front face** (default): White text (`rgb(255, 255, 255)`), 16px Inter, font-weight 300
- **Back face** (hover): Lime text (`rgb(208, 255, 113)`), 16px Inter, font-weight 300

On hover, the parent container rotates -90° on the X-axis (`rotateX(-90deg)`), revealing the lime text:
- `transform-style: preserve-3d`
- `transform-origin: center top` (50% 0%)
- Perspective: ~1200px (applied as `matrix3d(..., -0.000833333, ...)`)
- Back face pre-rotated: `rotateX(90deg)` with `transform-origin: 50% 0%`

### Contact Button
| Property | Default | Hover |
|----------|---------|-------|
| Size | 118×40px | 118×40px |
| Background | White | White (covered by lime dot) |
| Border radius | 99px | 99px |
| Padding | `3px 30px 4px` | `3px 30px 4px` |
| Overflow | `hidden` | `hidden` |
| Text color | `rgb(48, 48, 48)` | `rgb(48, 48, 48)` |

**Lime dot inside Contact button:**
| Property | Default | Hover |
|----------|---------|-------|
| Size | 20×20px | 180×180px |
| Position | `top: 40px, left: -20px` (hidden below) | `top: -65px, left: -31px` (covers button) |
| Color | `rgb(208, 255, 113)` | `rgb(208, 255, 113)` |
| Border radius | 99px | 99px |
| Z-index | 1 | 1 |

### Custom Cursor (Site-Wide)
| Property | Value |
|----------|-------|
| Size | 16×16px |
| Color | `rgb(208, 255, 113)` (lime) |
| Border radius | 99px |
| Position | `fixed`, translated via `transform` |
| Z-index | 13 |
| Pointer events | `none` |

**Cursor variants by hover target:**
| Target | Variant | Mix-Blend-Mode |
|--------|---------|----------------|
| Nav links | "Default" | `normal` |
| Body text | "Default" | `normal` |
| Contact button | "Blending" | `color-burn` |

### Nav Collapse Behavior
- **Trigger**: Scroll threshold (~70-200px)
- **Expanded**: Avatar + nav links (Home, About, Projects, Blogs) + Contact button
- **Collapsed**: Avatar + "Available for Work" pill (lime text, green dot with glow)
- **Transition**: Width shrinks with `overflow: hidden` clipping links

---

## Local Implementation Comparison

### Matches (correct)
- ✅ Nav container: bg, border-radius, padding, backdrop-blur, z-index
- ✅ Nav link 3D text flip: mechanism, colors, perspective, transform-origin, rotateX values
- ✅ Contact button: dimensions, padding, border-radius, overflow hidden
- ✅ Contact dot: default position (top:40, left:-20), hover position (top:-65, left:-31), sizes (20→180)
- ✅ Custom cursor: 16px size, lime color, z-13, lerp smoothing
- ✅ Available for Work pill: 3D text flip, green dot with glow
- ✅ Collapse/expand: layout animation, scroll threshold

### Differences Found
1. **❌ `data-cursor="arrow"` on nav wrapper** (line 136 of Navbar.tsx)
   - Current: The entire nav shows expanded 70px arrow cursor on hover
   - Original: Nav links show default 16px cursor (no expansion, no arrow)
   - **Fix**: Remove `data-cursor="arrow"` from the outer `<motion.div>`

2. **❌ Contact button missing `data-cursor="blend"`**
   - Current: Contact inherits parent's cursor variant (currently "arrow", should be "default")
   - Original: Contact button triggers "Blending" variant with `mix-blend-mode: color-burn`
   - **Fix**: Add `data-cursor="blend"` to the Contact button's `<Link>` element

---

## Implementation Changes Required

```diff
// Navbar.tsx line 136
- data-cursor="arrow"
+ (remove attribute entirely)

// Navbar.tsx ContactButton Link (line ~59)
- className="relative flex h-10 items-center overflow-hidden rounded-full bg-white px-[30px] py-[3px] pb-1"
+ className="relative flex h-10 items-center overflow-hidden rounded-full bg-white px-[30px] py-[3px] pb-1"
+ data-cursor="blend"
```
