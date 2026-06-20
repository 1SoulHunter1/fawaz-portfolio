# Raw Findings: Blogs Page (/blogs)

> **Compared:** 2026-06-20

---

## Page-Level

| Metric | Original | Clone | Delta |
|--------|----------|-------|-------|
| Total height | 3303px | 3336px | +33px |

---

## Matches
- H1 "Design Insights & Ideas": 120px/700/Antonio — ✅ Match
- 6 blog articles with correct titles — ✅ Match
- Layout: 1 featured full-width + 5 in 2-column grid — ✅ Match
- H3 titles: 32px/400/Antonio — ✅ Match
- Category badges: "Tutorials", "Insights", "Resources" — ✅ Match
- Blog card dates present — ✅ Match
- All links point to correct blog slugs — ✅ Match

---

## Differences

### Difference 1: Global Left Offset (16px)
- **Difference:** Original H1 left=200.4. Clone left=184.4 (16px left)
- **Severity:** Medium (same root cause as all pages)
- **Location:** All blogs page content
- **Files Involved:** `src/app/blogs/page.tsx`

### Difference 2: Featured Blog Image Size
- **Difference:** Original: 1120×500px. Clone: 1152×648px (+32w, +148h)
- **Severity:** **High**
- **Location:** Featured blog card image (top article)
- **Likely Cause:** Clone uses a different aspect ratio for the featured image. Original is ~2.24:1, clone is ~1.78:1 (16:9). Image is significantly taller.
- **Suggested Fix:** Set featured blog image to aspect ratio ~2.24:1 or fixed height of 500px
- **Files Involved:** Blog page component

### Difference 3: Blog Image Border Radius
- **Difference:** Original: all blog images have borderRadius=20px. Clone: all blog images have borderRadius=0px.
- **Severity:** **High**
- **Location:** All blog card images (featured + grid)
- **Likely Cause:** Clone is missing `rounded-[20px]` on blog card images
- **Suggested Fix:** Add `rounded-[20px]` to all blog card images
- **Files Involved:** Blog page component

### Difference 4: Grid Card Image Height
- **Difference:** Original: 540×320px. Clone: 564×317.25px (+24w, -2.75h)
- **Severity:** Low
- **Location:** Grid blog card images
- **Likely Cause:** Width difference from global padding; height nearly matches
- **Files Involved:** Blog page component

### Difference 5: Description Text Color
- **Difference:** Original: rgb(255, 255, 255) (white). Clone: rgb(181, 181, 181) (gray)
- **Severity:** Medium
- **Location:** Blog card description paragraphs
- **Likely Cause:** Clone uses muted text color instead of white
- **Suggested Fix:** Change description text color to white (text-white)
- **Files Involved:** Blog page component

### Difference 6: Featured Card Description Font Size
- **Difference:** Original: 14px. Clone: 16px (+2px)
- **Severity:** Low
- **Location:** Featured blog card description text
- **Suggested Fix:** Change to text-sm (14px) to match
- **Files Involved:** Blog page component

### Difference 7: Intro Paragraph Width
- **Difference:** Original: 500px wide. Clone: 640px wide (+140px)
- **Severity:** Medium
- **Location:** Page subtitle paragraph below H1
- **Likely Cause:** Clone paragraph doesn't have a max-width constraint
- **Suggested Fix:** Add `max-w-[500px]` to intro paragraph
- **Files Involved:** Blog page component

### Difference 8: Footer Height
- **Difference:** Same as all pages — 205.4px (original) vs 88px (clone)
- **Severity:** **High** (duplicate of homepage #33)
- **Location:** Footer
- **Files Involved:** `src/components/Footer.tsx`
