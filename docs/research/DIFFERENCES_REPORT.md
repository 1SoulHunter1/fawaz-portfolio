# Clone vs Original — Accumulated Differences

> **Source:** https://portavia.framer.website/ vs http://localhost:3000
> **Date:** 2026-06-20
> **Method:** Side-by-side comparison via Playwright MCP

Raw findings are appended below as each section comparison completes. See `RAW_FINDINGS/` for individual agent outputs.

---

<!-- Findings will be appended below as sections complete -->

## Section 1: Navbar + Hero (0–800px) — 10 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 1 | Nav top offset 16px vs 20px | Medium | Navbar wrapper | Navbar.tsx |
| 2 | Nav z-index 50 vs 10 | Low | Navbar wrapper | Navbar.tsx |
| 3 | Hero height viewport-dependent (not a bug) | Low | Hero section | — |
| 4 | H1s "DIGITAL"/"DESIGNER" at different Y coords (should be same) | **High** | Hero headings | page.tsx |
| 5 | Left column text flush-left vs original flush-right (~88px off) | Medium | Hero left col | page.tsx |
| 6 | H1 width fills column vs shrink-wrap | Low | Hero h1 | page.tsx |
| 7 | Card image 28px lower than original | Medium | Hero card | StickyScrollSection.tsx |
| 8 | "Duncan Robert" position off (tied to #4/#5) | Medium | Hero left col | page.tsx |
| 9 | Description ~40px left indent missing | Low | Hero right col | page.tsx |
| 10 | Badge position within 4px tolerance | Low | Hi badge | — |

## Section 2: Services (800–1600px) — 2 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 11 | Global left offset 16px (px-6 vs original's 40px padding) | Medium | Services section | page.tsx |
| 12 | Accordion item height 83 vs 81.6px | Low | Service accordion | — |

## Section 3: About/CTA (1400–2200px) — 5 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 13 | Global left offset 16px | Medium | About section | page.tsx |
| 14 | Stats counters may be missing/different structure | Medium | About stats row | AboutSection.tsx |
| 15 | "My Story" button 166×48 vs 122×39 (smaller in clone) | Medium | About CTA | AboutSection.tsx |
| 16 | About container height 545.6 vs 630px | Low | About section | page.tsx |
| 17 | Contact info grid layout differs (label+value columns) | Medium | About contact info | AboutSection.tsx |

## Section 4: Projects (2200–5000px) — 5 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 18 | Project card width 1120 vs 1152px (padding root cause) | Medium | Project cards | page.tsx |
| 19 | Project image height 746.66 vs 768px | Medium | Project images | page.tsx |
| 20 | Project card total height 746.66 vs 888px (+141px) | Medium | Project cards | page.tsx |
| 21 | "Summer Vibes" title wraps to 2 lines (156px vs 78px) | **High** | Project 1 title | Projects component |
| 22 | Global left offset 16px | Medium | Projects section | page.tsx |

## Section 5: Testimonials + FAQ (5000–8000px) — 5 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 23 | Testimonial card styling needs verification (bg=#333) | Medium | Testimonials | TestimonialsSection.tsx |
| 24 | Testimonial brickwork grid layout needs verification | Medium | Testimonial grid | TestimonialsSection.tsx |
| 25 | FAQ item width 600 vs 662.4px | Medium | FAQ accordion | page.tsx |
| 26 | FAQ item heights variable vs uniform 73.8px | Low | FAQ accordion | page.tsx |
| 27 | FAQ left column width ~440px vs flexible | Low | FAQ layout | page.tsx |

## Section 6: Blog + Contact + Footer (8000–end) — 8 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 28 | Blog card count/layout needs verification | Medium | Blog section | BlogSection.tsx |
| 29 | Name & Email inputs stacked vs side-by-side | **High** | Contact form | page.tsx |
| 30 | Input heights 43.2 vs 48.8px | Low | Contact form | page.tsx |
| 31 | Textarea height 140 vs 120.8px | Low | Contact form | page.tsx |
| 32 | Contact H2 left offset 16px | Medium | Contact heading | page.tsx |
| 33 | Footer height 205.4 vs 88px (missing content) | **High** | Footer | Footer.tsx |
| 34 | Total page height 9799 vs 9404px | Low | Full page | — |
| 35 | Blog card dimensions need verification | Low | Blog section | BlogSection.tsx |

## Section 7: About Page (/about) — 8 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 36 | H1 height 132 vs 120px (-12px) | Low | About hero h1 | about/page.tsx |
| 37 | H1 vertical position top=105 vs 176px (+71px lower) | Medium | About hero h1 | about/page.tsx |
| 38 | Global left offset 16px | Medium | All about content | about/page.tsx |
| 39 | Service accordion expanded vs collapsed on about page | **High** | About services section | about/page.tsx |
| 40 | Process step images borderRadius 20px vs 0px | Medium | Process section | about/page.tsx |
| 41 | Scroll-driven image animation missing (sticky scroll) | **High** | About right column images | about/page.tsx |
| 42 | Footer height 205 vs 88px (duplicate) | **High** | Footer | Footer.tsx |
| 43 | H1 width 480 (shrink-wrap) vs 560px (fills column) | Low | About hero h1 | about/page.tsx |

## Section 8: Projects Page (/projects) — 9 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 44 | Global left offset 16px | Medium | All projects content | projects/page.tsx |
| 45 | Featured card width 1120 vs 1152px | Medium | Featured project cards | projects/page.tsx |
| 46 | Featured image 1120×746 vs 1152×768px | Medium | Featured cover images | projects/page.tsx |
| 47 | "Summer Vibes" title wraps to 2 lines (78 vs 156px) | **High** | First project title | projects/page.tsx |
| 48 | "More Projects" H2 shrink-wrap vs full-width | Low | More Projects heading | projects/page.tsx |
| 49 | More Projects card images 540×320 vs 564×376px | Medium | More Projects grid | projects/page.tsx |
| 50 | More Projects grid gap 40px vs 24px | Medium | More Projects grid | projects/page.tsx |
| 51 | Featured cards have rounded-[20px] (original may not) | Medium | Featured card containers | projects/page.tsx |
| 52 | Footer height 205 vs 88px (duplicate) | **High** | Footer | Footer.tsx |

## Section 9: Blogs Page (/blogs) — 8 differences found

| # | Difference | Severity | Location | Files |
|---|-----------|----------|----------|-------|
| 53 | Global left offset 16px | Medium | All blogs content | blogs page component |
| 54 | Featured blog image 1120×500 vs 1152×648px (+148h) | **High** | Featured blog image | blogs page component |
| 55 | All blog images borderRadius 20px vs 0px | **High** | All blog card images | blogs page component |
| 56 | Grid card images 540×320 vs 564×317px | Low | Blog grid images | blogs page component |
| 57 | Description text color white vs gray (rgb(181,181,181)) | Medium | Card descriptions | blogs page component |
| 58 | Featured description font 14px vs 16px | Low | Featured card text | blogs page component |
| 59 | Intro paragraph width 500 vs 640px | Medium | Page subtitle | blogs page component |
| 60 | Footer height 205 vs 88px (duplicate) | **High** | Footer | Footer.tsx |
