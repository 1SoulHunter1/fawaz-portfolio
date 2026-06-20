# Raw Findings: Projects Page (/projects)

> **Compared:** 2026-06-20

---

## Page-Level

| Metric | Original | Clone | Delta |
|--------|----------|-------|-------|
| Total height | 5546px | 5388px | -158px |

---

## Matches
- H1 "Featured Projects": 120px/700/Antonio — ✅ Match
- 4 featured projects in correct order — ✅ Match
- 4 "More Projects" cards in 2×2 grid — ✅ Match
- H3 titles: 32px/400/Antonio — ✅ Match
- All blog links point to correct slugs — ✅ Match
- Footer present with same links — ✅ Match

---

## Differences

### Difference 1: Global Left Offset (16px)
- **Difference:** Original H1 left=200.4. Clone left=184.4 (16px left)
- **Severity:** Medium (same root cause as all pages)
- **Location:** All projects page content
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 2: Featured Card Width
- **Difference:** 1120px (original) vs 1152px (clone) — 32px wider
- **Severity:** Medium (global padding root cause)
- **Location:** Featured project cards
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 3: Featured Card Image Height
- **Difference:** 1120×746.66px (original) vs 1152×768px (clone) — proportionally scaled with wider card
- **Severity:** Medium
- **Location:** Featured project cover images
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 4: "Summer Vibes" Title Wraps to 2 Lines
- **Difference:** Original: height=78px (1 line). Clone: height=156px (2 lines, wraps)
- **Severity:** **High**
- **Location:** First featured project title
- **Likely Cause:** Title container width is narrower or text layout differs at 60px font
- **Suggested Fix:** Ensure project title has enough width for single-line display. May need wider title container or adjusted letter-spacing.
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 5: "More Projects" H2 Width
- **Difference:** Original: width=345.85px (shrink-wrap). Clone: width=1152px (full container)
- **Severity:** Low
- **Location:** "More Projects" section heading
- **Likely Cause:** Clone H2 fills parent width; original shrink-wraps to text
- **Suggested Fix:** Add `w-fit` to the "More Projects" heading
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 6: More Projects Card Image Dimensions
- **Difference:** Original: 540×320px. Clone: 564×376px (+24w, +56h)
- **Severity:** Medium
- **Location:** "More Projects" grid card images
- **Likely Cause:** Clone cards are wider due to padding difference (24px vs 40px). Image aspect ratio also differs (clone taller).
- **Suggested Fix:** Fix container padding (global fix). Ensure image aspect ratio matches original (540:320 = 1.6875:1)
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 7: More Projects Grid Gap
- **Difference:** Original: 40px gap between columns (200.4 + 540 = 740.4, next at 780.4). Clone: 24px gap (184.4 + 564 = 748.4, next at 772.4)
- **Severity:** Medium (padding root cause)
- **Location:** "More Projects" 2×2 grid
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 8: Featured Card Border Radius
- **Difference:** Clone has `rounded-[20px]` on featured project cards. Original featured project images appear to have no border radius (borderRadius=0 per homepage comparison).
- **Severity:** Medium (needs visual verification)
- **Location:** Featured project card containers
- **Suggested Fix:** Remove `rounded-[20px]` from featured project cards if original has no rounding
- **Files Involved:** `src/app/projects/page.tsx`

### Difference 9: Footer Height
- **Difference:** Same as all pages — 205.4px (original) vs 88px (clone)
- **Severity:** **High** (duplicate of homepage #33)
- **Location:** Footer
- **Files Involved:** `src/components/Footer.tsx`
