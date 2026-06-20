# Raw Findings: Homepage — Navbar + Hero (0–800px)

> **Compared:** 2026-06-20
> **Original:** https://portavia.framer.website/ (viewport 1536×674)
> **Clone:** http://localhost:3000 (viewport 1536×730)

---

## Navbar Differences

| Property | Original | Clone | Severity |
|----------|----------|-------|----------|
| Top offset | 20px | 16px | Medium |
| z-index | 10 | 50 | Low |
| Background | `rgba(15, 15, 15, 0.9)` | `rgba(15, 15, 15, 0.9)` | ✅ Match |
| Backdrop filter | `blur(5px)` | `blur(5px)` | ✅ Match |
| Border radius | 28px | 28px | ✅ Match |
| Padding | `8px 10px` | `8px 10px` | ✅ Match |
| Width (open) | 508px | 508px | ✅ Match |
| Height | 56px | 56px | ✅ Match |
| Position | fixed | fixed | ✅ Match |
| Centering | `left:50%; translateX(-50%)` | `left:50%; translateX(-50%)` | ✅ Match |

### Difference 1: Nav Top Offset
- **Difference:** Nav sits 4px higher in clone (16px vs 20px)
- **Severity:** Medium
- **Location:** Navbar wrapper, top offset
- **Likely Cause:** Hardcoded `top-4` (16px) in Tailwind instead of `top-5` (20px)
- **Suggested Fix:** Change nav parent wrapper from `top-4` to `top-[20px]`
- **Files Involved:** `src/components/Navbar.tsx`

### Difference 2: Nav z-index
- **Difference:** z-index 50 vs 10
- **Severity:** Low (functionally equivalent — both above content)
- **Location:** Navbar parent wrapper
- **Likely Cause:** Used `z-50` for safety; original uses 10
- **Suggested Fix:** Change to `z-[10]` for precision match
- **Files Involved:** `src/components/Navbar.tsx`

---

## Hero Section Differences

### Difference 3: Hero Height
- **Difference:** Original = 673.6px (100vh at 674 viewport), Clone = 729.6px (100vh at 730 viewport)
- **Severity:** Low (viewport-dependent, behaves correctly at 100vh)
- **Location:** Hero section
- **Likely Cause:** Both use 100vh — viewport height difference from browser chrome. Not a bug.
- **Suggested Fix:** None needed

### Difference 4: H1 Vertical Alignment — "DIGITAL" vs "DESIGNER"
- **Difference:** Original: BOTH h1s share the same top (270.8px). Clone: "DIGITAL" at 321.6px, "DESIGNER" at 267.8px — 53.8px apart vertically
- **Severity:** High
- **Location:** Hero section, heading row
- **Likely Cause:** Original uses a single row where both headings align to the same vertical baseline. Clone positions them in separate columns with independent vertical alignment.
- **Suggested Fix:** Ensure both h1s share the same `top` alignment. In original, "Duncan Robert" is ABOVE "digital" (225.8 vs 270.8), and description is BELOW "designer" (413.8 vs 270.8). The three-column layout (left text | card | right text) has both heading groups vertically centered with their h1 baselines aligned.
- **Files Involved:** `src/app/page.tsx` (hero section layout)

### Difference 5: Left Column Horizontal Position
- **Difference:** Original "digital" left = 272.4px (~112px from 1200px container left edge). Clone "DIGITAL" left = 184.4px (~24px from container left edge)
- **Severity:** Medium
- **Location:** Hero left column
- **Likely Cause:** Original's "Hero Heading Wrap / Left" (415px wide) positions content flush-right or centered-right, pushing text toward the center card. Clone positions text flush-left.
- **Suggested Fix:** Add right-alignment or increased left padding to left heading column to push text closer to the center card
- **Files Involved:** `src/app/page.tsx`

### Difference 6: H1 Width
- **Difference:** Original "digital" h1 width = 293px (intrinsic text width). Clone "DIGITAL" h1 width = 391px (fills column width)
- **Severity:** Low (visual appearance is similar since text is the same)
- **Location:** Hero h1 elements
- **Likely Cause:** Clone h1 fills its grid column; original h1 shrink-wraps to text
- **Suggested Fix:** Add `w-fit` to h1 elements if needed for precise matching
- **Files Involved:** `src/app/page.tsx`

### Difference 7: Card Image Top Position
- **Difference:** Original card top = 98.8px, Clone card top = 126.8px (28px lower)
- **Severity:** Medium
- **Location:** Hero card images (340×476px portrait)
- **Likely Cause:** Vertical centering calculation differs; original "Avatar Wrap" starts at 98.8px within the 673.6px hero. Clone card starts at 126.8px within 729.6px hero. Both are roughly vertically centered but the padding distribution differs.
- **Suggested Fix:** Check vertical centering — the card should be positioned so it appears centered within the viewport with room for the badge below
- **Files Involved:** `src/components/StickyScrollSection.tsx`

### Difference 8: "Duncan Robert" Position
- **Difference:** Original: top=225.8, left=277.4, width=177.8px. Clone: top=276, left=184.4, width=391px
- **Severity:** Medium
- **Location:** Hero left column, above "digital" heading
- **Likely Cause:** Text width (177.8 vs 391) shows original shrink-wraps while clone fills column. Position is 50px lower and 93px more left in clone.
- **Suggested Fix:** Tied to Difference 4/5 — fixing the heading column layout will fix this
- **Files Involved:** `src/app/page.tsx`

### Difference 9: Description Text Position
- **Difference:** Original: top=413.8, left=984. Clone: top=407.8, left=945.4
- **Severity:** Low
- **Location:** Hero right column, below "designer" heading
- **Likely Cause:** Left offset difference (984 vs 945.4 = 38.6px) indicates original description has additional left padding/margin within the right column
- **Suggested Fix:** Add ~40px left indent to the description paragraph in the right column
- **Files Involved:** `src/app/page.tsx`

### Difference 10: Badge Position and Size
- **Difference:** Original badge (lime circle): the "Text" container is 123×123px at top=514.5. Clone badge: 123×123px at top=510.4. Close match.
- **Severity:** Low (within acceptable tolerance)
- **Location:** Hi badge on hero card
- **Suggested Fix:** None needed — positions are within 4px

---

## Section Summary

| Category | Matches | Differences |
|----------|---------|-------------|
| Navbar styling | 6 | 2 (top offset, z-index) |
| Hero typography | Font family, size, weight, color all match | Positioning differs |
| Hero layout | Card size, badge size match | Vertical alignment, horizontal positioning differ |
| Hero card | 340×476, 20px radius, object-fit:cover match | Top position off by 28px |

### Priority Fixes
1. **High:** H1 vertical alignment — both "digital" and "designer" should be at the same Y coordinate
2. **Medium:** Nav top offset (16px → 20px)
3. **Medium:** Left column horizontal positioning (text should be closer to center)
4. **Low:** Description left indent (~40px additional offset)
