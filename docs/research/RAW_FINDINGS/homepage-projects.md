# Raw Findings: Homepage — Projects (2200–5000px)

> **Compared:** 2026-06-20

---

## Matches
- H2 "FEATURED PROJECTS": 60px/700/Antonio/uppercase — ✅ Match
- 4 featured projects — ✅ Match
- Project titles: 60px/700/Antonio/uppercase — ✅ Match
- Project info text: 14px — ✅ Match
- Image object-fit: cover, borderRadius: 0px — ✅ Match
- Project order: Summer Vibes, Coral Spiral, ShopEase, Black Geometric — ✅ Match

## Differences

### Difference 1: Project Card Width
- **Difference:** 1120px (original) vs 1152px (clone) — 32px wider
- **Severity:** Medium
- **Location:** Featured project cards
- **Likely Cause:** Original has 40px inner padding each side within 1200px container (1200-80=1120). Clone has 24px padding (1200-48=1152). Same root cause as global 16px offset.
- **Suggested Fix:** Fix global container padding from px-6 (24px) to px-10 (40px) — this will fix both the width and the left offset
- **Files Involved:** `src/app/page.tsx`, project container

### Difference 2: Project Image Dimensions
- **Difference:** 1120×746.66px (original) vs 1152×768px (clone) — proportionally larger
- **Severity:** Medium
- **Location:** Project cover images
- **Likely Cause:** Clone's wider container stretches the image
- **Suggested Fix:** Will self-resolve when container padding is fixed
- **Files Involved:** `src/app/page.tsx` or projects component

### Difference 3: Project Card Total Height
- **Difference:** 746.66px (original) vs 888px (clone) — 141px taller
- **Severity:** Medium
- **Location:** Project card wrapper
- **Likely Cause:** Clone includes more vertical space for project info below image. Original image fills the entire card height. Clone has extra info area.
- **Suggested Fix:** Check if the project info/description area height differs
- **Files Involved:** `src/app/page.tsx`, projects component

### Difference 4: "SUMMER VIBES" Title Height
- **Difference:** Original h2 height=78px (single line). Clone h2 height=156px (wraps to 2 lines)
- **Severity:** High
- **Location:** First project card title
- **Likely Cause:** Title text wrapping differently in clone — likely because the title container is narrower or the text doesn't fit in one line
- **Suggested Fix:** Ensure project titles have enough width to display in one line at 60px font size
- **Files Involved:** Projects component

### Difference 5: Global Left Offset
- **Difference:** H2 "FEATURED PROJECTS" left=200.4 vs 184.4 (16px)
- **Severity:** Medium (same global issue)
