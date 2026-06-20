# Final Differences Report — Clone vs Original

> **Source:** https://portavia.framer.website/ vs http://localhost:3000
> **Date:** 2026-06-20
> **Method:** Side-by-side comparison via Playwright MCP, every page, every 200px scroll increment
> **Raw Findings:** See `RAW_FINDINGS/` directory (9 files)

---

## Summary

- **Total unique differences:** 42 (after deduplication)
- **High severity:** 10
- **Medium severity:** 21
- **Low severity:** 11
- **Pages compared:** Homepage, About (/about), Projects (/projects), Blogs (/blogs)

### Root Cause Categories

| Root Cause | Count | Impact |
|-----------|-------|--------|
| Global container padding (px-6 vs 40px) | ~12 | Affects every page — left offset + element widths |
| Footer missing content | 4 (1 per page) | Single fix resolves all pages |
| Missing border radius on images | 3 | Blogs + process images |
| Missing animations/interactions | 2 | About page sticky scroll, badge |
| Layout structure differences | 5 | Contact form, accordion state, title wrapping |
| Dimension mismatches | 8 | Heights, widths, aspect ratios |
| Typography/color mismatches | 8 | Font sizes, weights, text colors |

---

## HIGH Severity Differences (fix first)

| # | Difference | Pages Affected | Root Cause | Suggested Fix | Files |
|---|-----------|----------------|------------|--------------|-------|
| H1 | Footer height 205px vs 88px — missing content rows | All 4 pages | Footer component is incomplete | Add navigation links row, separator, social icons row to match original's multi-row layout | `Footer.tsx` |
| H2 | Contact form: Name & Email stacked vertically vs side-by-side | Homepage | Layout structure | Place Name (270px) and Email (270px) in a flex row | `page.tsx` |
| H3 | "Summer Vibes" title wraps to 2 lines (78px vs 156px) | Homepage, Projects | Title container too narrow or letter-spacing | Ensure title container allows single-line display at 60px | `page.tsx`, `projects/page.tsx` |
| H4 | About page service accordion expanded vs collapsed | About | Accordion default state | Default accordion items to collapsed on about page | `about/page.tsx` |
| H5 | About page scroll-driven image animation missing | About | Missing sticky scroll architecture | Implement sticky scroll with useScroll/useTransform for right-column image stack | `about/page.tsx` |
| H6 | Featured blog image 1120×500 vs 1152×648px (+148px taller) | Blogs | Wrong aspect ratio | Set featured blog image to ~2.24:1 aspect ratio or fixed 500px height | blogs page component |
| H7 | All blog images borderRadius=20px vs 0px | Blogs | Missing rounded class | Add `rounded-[20px]` to all blog card images | blogs page component |
| H8 | Hero h1s "DIGITAL"/"DESIGNER" at different Y coordinates | Homepage | Vertical alignment | Align hero heading positions to match original | `page.tsx` |
| H9 | H1 vertical position top=105 vs 176px on about page | About | Extra top padding | Reduce top padding on about hero | `about/page.tsx` |
| H10 | Project card total height 746 vs 888px (+141px) | Homepage | Extra vertical space in info area | Check project info area sizing | `page.tsx` |

---

## MEDIUM Severity Differences

| # | Difference | Pages Affected | Root Cause | Suggested Fix | Files |
|---|-----------|----------------|------------|--------------|-------|
| M1 | Global left offset — all content 16px further left | All 4 pages | Container padding px-6 (24px) vs original's 40px | Change `px-6` to `px-10` on content containers | Multiple |
| M2 | Element widths 1120 vs 1152px (cards, images, grids) | All 4 pages | Same padding root cause as M1 | Self-resolves with M1 fix | Multiple |
| M3 | Nav top offset 16px vs 20px | Homepage | Navbar wrapper padding | Adjust nav wrapper top padding | `Navbar.tsx` |
| M4 | Left column text flush-left vs original flush-right (~88px) | Homepage | Hero left column alignment | Match original's text alignment | `page.tsx` |
| M5 | Card image 28px lower than original | Homepage | Hero card vertical offset | Adjust card Y position | `StickyScrollSection.tsx` |
| M6 | "Duncan Robert" position off | Homepage | Tied to M4 | Self-resolves with M4 | `page.tsx` |
| M7 | Stats counters may be missing/different structure | Homepage | About section stats | Verify stats row structure | `AboutSection.tsx` |
| M8 | "My Story" button 166×48 vs 122×39px (smaller) | Homepage | Button sizing | Match original button dimensions | `AboutSection.tsx` |
| M9 | Contact info grid layout differs | Homepage | Column layout | Match original label+value grid | `AboutSection.tsx` |
| M10 | Testimonial card styling unverified (bg=#333) | Homepage | Needs visual check | Verify bg, padding, borderRadius | `TestimonialsSection.tsx` |
| M11 | Testimonial brickwork grid layout unverified | Homepage | Staggered pattern | Match 3-col brickwork offset | `TestimonialsSection.tsx` |
| M12 | FAQ item width 600 vs 662px | Homepage | Grid column ratio | Set FAQ column width to 600px | `page.tsx` |
| M13 | Blog card count/layout needs verification | Homepage | Blog section grid | Verify card count and sizing | `BlogSection.tsx` |
| M14 | Process step images borderRadius=20px vs 0px | About | Missing rounded class | Add `rounded-[20px]` to process images | `about/page.tsx` |
| M15 | More Projects card images 540×320 vs 564×376px | Projects | Padding + aspect ratio | Fix padding + set correct aspect ratio | `projects/page.tsx` |
| M16 | More Projects grid gap 40px vs 24px | Projects | Padding root cause | Self-resolves with M1 | `projects/page.tsx` |
| M17 | Featured cards may have incorrect rounded-[20px] | Projects | Needs verification | Remove if original has no rounding | `projects/page.tsx` |
| M18 | Blog description text color white vs gray | Blogs | Wrong text color | Change to `text-white` | blogs page component |
| M19 | Intro paragraph width 500 vs 640px | Blogs | Missing max-width | Add `max-w-[500px]` | blogs page component |
| M20 | About container height 545.6 vs 630px | Homepage | Section sizing | Check inner element spacing | `page.tsx` |
| M21 | About page global left offset 16px | About | Same as M1 | Same fix as M1 | `about/page.tsx` |

---

## LOW Severity Differences

| # | Difference | Pages Affected | Files |
|---|-----------|----------------|-------|
| L1 | Nav z-index 50 vs 10 | Homepage | `Navbar.tsx` |
| L2 | H1 width fills column vs shrink-wrap | Homepage, About | `page.tsx`, `about/page.tsx` |
| L3 | Description ~40px left indent missing | Homepage | `page.tsx` |
| L4 | Badge position within 4px tolerance | Homepage | — |
| L5 | Accordion item height 83 vs 81.6px | Homepage | — |
| L6 | FAQ item heights variable vs uniform 73.8px | Homepage | `page.tsx` |
| L7 | FAQ left column width 440px vs ~480px | Homepage | `page.tsx` |
| L8 | Total page heights differ (accumulated) | All pages | — |
| L9 | About page H1 height 132 vs 120px | About | `about/page.tsx` |
| L10 | "More Projects" H2 shrink-wrap vs full-width | Projects | `projects/page.tsx` |
| L11 | Featured blog description font 14px vs 16px | Blogs | blogs page component |

---

## Recommended Fix Order

### Phase 1: Global Fixes (biggest bang for buck)
1. **Fix global container padding** (M1/M2) — changes `px-6` to `px-10` across all pages. This single change resolves ~12 differences (all left offsets, width mismatches, grid gaps).
2. **Fix Footer component** (H1) — add missing content rows. Resolves the footer difference on all 4 pages.

### Phase 2: High-Impact Layout Fixes
3. **Contact form layout** (H2) — put Name/Email side-by-side
4. **"Summer Vibes" title wrapping** (H3) — ensure single-line display
5. **Blog image border radius** (H7) — add `rounded-[20px]`
6. **Featured blog image aspect ratio** (H6) — fix to ~2.24:1
7. **Hero heading alignment** (H8) — fix vertical positions

### Phase 3: About Page
8. **Accordion default state** (H4) — collapse on about page
9. **Sticky scroll animation** (H5) — implement image stack animation
10. **Process image border radius** (M14) — add `rounded-[20px]`
11. **About hero positioning** (H9) — reduce top padding

### Phase 4: Medium Severity Cleanup
12. Fix remaining medium items (stats, button sizing, testimonial verification, FAQ widths, text colors, intro paragraph width)

### Phase 5: Low Severity Polish
13. Fix remaining low items as time allows

---

## Deduplicated Cross-Page Issues

These differences appear on multiple pages and should be fixed once at the source:

| Issue | Appears On | Fix Location |
|-------|-----------|--------------|
| 16px left offset | Homepage, About, Projects, Blogs | All page containers |
| Footer height 88px vs 205px | Homepage, About, Projects, Blogs | `Footer.tsx` |
| Element widths 1152 vs 1120px | Homepage, About, Projects, Blogs | Container padding |
| "Summer Vibes" title wrapping | Homepage, Projects | Title component |
