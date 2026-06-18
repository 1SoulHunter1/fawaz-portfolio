# Portavia — Complete Route Audit

> Source: https://portavia.framer.website
> Date: 2026-06-18
> Method: Chrome DevTools MCP — accessibility snapshots, JS extraction, screenshots at 390px / 768px / 1440px

---

## Global Elements (present on every route)

### Navbar
- **Position:** fixed, top-center, `z-index` high
- **Shape:** pill, `border-radius: 28px`, `height: 56px`, `padding: 8px 10px`
- **Background:** `rgba(15, 15, 15, 0.9)` + `backdrop-blur`
- **Desktop (≥810px):** expanded (~508px wide), shows avatar + "Available for work" badge + 5 links
- **Mobile (<810px):** collapsed (~278px), shows avatar + badge only; hamburger opens full menu
- **Avatar:** 40×40px circle, `border-radius: 99px`
- **Green dot:** animated pulse, `#0bde66` (NOT the lime accent)
- **Links:** Home, About, Projects, Blogs, Contact
- **Link hover:** text-swap Y-axis rolling animation (two stacked `<span>` inside `overflow: hidden`, one slides up, duplicate slides in from below)
- **Link font:** Inter, 16px, weight 300, line-height 24px
- **Active link color:** `#d0ff71` (lime)
- **Framer components:** `Desktop / Open`, `Avatar & Button Wrap`, `Scroll Hide Wrap`, `Nav Link Wrap`, `Link Wrap` per link

### Custom Cursor
- **Size:** 16×16px circle, `border-radius: 99px`
- **Color:** `#d0ff71` (lime)
- **Behavior:** `position: fixed`, `z-index: 13`, `pointer-events: none`, follows mouse with spring lag
- **Hidden on touch/mobile**

### Footer
- **Background:** `#d0ff71` (lime)
- **Layout (desktop):** 3-column row
  - Left: `Email :` + `designer@example.com` (mailto) | `Call Today :` + `+1 (555) 123-4567` (tel)
  - Center: `Social :` + 4 icon circles (X, Instagram, Behance, Dribbble) — black bg, white icons
  - Right: copyright text + "Created by" + logo + "Duncan Shen" link
- **Social icon size:** ~36px circles
- **Footer font:** 14px, weight 300 (labels) / 600 (values)
- **Label color:** `rgb(48, 48, 48)` (dark gray on lime bg)

### Noise Background
- Framer component `Noise BG` — subtle noise texture overlay across all pages

### "Get Template" Floating Banner
- Fixed bottom-right, links to Framer marketplace — this is a Framer template badge, not part of the design to clone

---

## Route: `/` (Homepage)

### Section 1: Hero

**Framer names:** `OutterWraper`, `Sticky Wrap`, `Avatar Card Flip`, `Content`, `Hero`

**Components:**
- Portrait card flip (3D): two images stacked with `transform-style: preserve-3d`
  - Back: `portrait-back.jpeg` (340×476px) — `matrix3d(-1, 0, 0, 0, ...)` (rotated 180°)
  - Front: `portrait-front.jpg` (340×476px) — `matrix3d(1, 0, 0, 0, ...)`
  - Mouse-track parallax: images subtly rotate following cursor position
- "Hi" wave element: circular lime container with "Hi" text + 👋 wave image
  - Sticky positioned, scrolls with parallax
- Name text: "DUNCAN ROBERT"
- H1 "DIGITAL" — left-aligned
- Animated SVG line divider between headings
- H1 "DESIGNER" — right-aligned, outlined/stroke style
- Subtitle: "I'm a US-based digital designer and Framer developer"

**Typography:**
| Element | Font | Size | Weight | Line-height | Letter-spacing | Color |
|---------|------|------|--------|-------------|----------------|-------|
| H1 (DIGITAL / DESIGNER) | Antonio | 120px | 700 | 132px | -3.6px | white |
| "DUNCAN ROBERT" | Inter | 18px | 300 | 27px | 2px tracking | white |
| Subtitle | Inter | 18px | 300 | 27px | normal | white |

**Responsive:**
| Viewport | H1 size | H1 line-height |
|----------|---------|----------------|
| ≥1200px | 120px | 132px |
| 390px | 56px | 61.6px |
| 768px | 56px | 61.6px |

**Entrance animations:** `data-framer-appear-id` on "Hi" element, heading groups — fade/slide-in on page load

---

### Section 2: What I Can Do For You (Services)

**Framer names:** `Service`, `Container`, `Service Column`, `Desktop / Closed`

**Components:**
- Section heading + subtitle paragraph
- 4 service categories in a 2-column grid (accordion)
- Each category: numbered title (h3) + expand/collapse toggle icon (+/−)
- Sub-items: 4 bullet points per category with checkmark icons
- **Accordion behavior:** only one expanded at a time; `Desktop / Closed` is default state

**Content:**
1. UI/UX Design — Wireframing, UI design, Usability testing, Interaction design
2. Graphic Design — Logo/brand, Social media, Infographics, Illustrations
3. Web Design — Responsive design, Landing pages, Webflow, Maintenance
4. Branding — Brand strategy, Style guides, Typography/color, Storytelling

**Typography:**
| Element | Font | Size | Weight | Line-height |
|---------|------|------|--------|-------------|
| Section H2 | Antonio | 60px | 700 | 78px |
| Subtitle | Inter | 18px | 300 | 27px |
| Service H3 | Antonio | 32px | 400 | 41.6px |
| Sub-item text | Inter | 18px | 300 | 27px |
| Checkmark icon color | `rgb(106, 113, 223)` (blue-purple) | | |

**Spacing:** 2-column grid, border-top `#333` per item, padding ~40px vertical per item

---

### Section 3: About Me

**Components:**
- Section heading + bio paragraph
- 3 stat cards in row (lime background `#d0ff71`, rounded 20px)
  - "12" — Years of Experience
  - "270" — Completed Projects
  - "50+" — Clients on Worldwide
  - Stat numbers animate from 0 on scroll (counter animation)
- Contact row: "Call Today" + phone | "Email" + email
- 4 social icon links (circles, `#303030` bg, `#b5b5b5` text → hover: `#d0ff71` bg, black text)
- "MY STORY" link → `/about` (pill button, `border-radius: 99px`, lime border, arrow icon)

**Typography:**
| Element | Font | Size | Weight | Line-height |
|---------|------|------|--------|-------------|
| Stat number | Antonio | 60px | 700 | 60px |
| Stat label | Inter | 14px | 300 | 21px |
| Contact labels | Inter | 14px | 300 | 21px |
| "MY STORY" button | Antonio | 26px | 400 | 33.8px |

**Stat card:** `bg: #d0ff71`, `border-radius: 20px`, `padding: ~32px`, text color black

---

### Section 4: Featured Projects

**Components:**
- Section heading + subtitle
- 4 full-width project cards, stacked vertically, each `1120×746px` (3:2 aspect), `border-radius: 20px`
- Each card: cover image + gradient overlay + centered text (category badge, title h2, description)
- "BROWSE ALL PROJECTS" pill button → `/projects`

**Project cards:**
| Project | Category | Slug |
|---------|----------|------|
| Summer Vibes Festival Campaign | Graphic Design | `summer-vibes-festival-campaign` |
| Coral Spiral Abstract | Branding | `coral-spiral-abstract` |
| ShopEase Redesign Sprint | UI / UX Design | `shopease-redesign-sprint` |
| Black Geometric Prisms | Branding | `black-geometric-prisms` |

**Card typography:**
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Category badge | Inter | 14px | 300 |
| Card H2 title | Antonio | 60px | 700 |
| Card description | Inter | 14px | 300 |

**Card interactions:**
- Hover: image scales up, overlay darkens
- Category badge: dark bg pill on lime, `border-radius: 99px`

**"BROWSE ALL PROJECTS" button:**
- `border-radius: 99px`, `padding: 6px 40px 8px`
- Color: `#d0ff71` lime, border lime
- Font: Antonio, 26px, weight 400
- Hover: bg fills lime, text goes black
- Arrow icon included

---

### Section 5: What My Clients Say (Testimonials)

**Components:**
- Section heading + subtitle
- 3-column grid:
  - Column 1: 2 testimonial cards stacked
  - Column 2: 2 stat metric cards stacked (lime bg)
  - Column 3: 2 testimonial cards stacked

**Testimonial cards:** `bg: #303030`, `border-radius: 20px`, `padding: 24px`
- 5 star icons (blue-purple `rgb(106, 113, 223)`)
- Quote text (Inter, 16px, weight 300)
- Reviewer: avatar 48×48px circle + name (14px, 500) + title (12px, muted)

**Testimonials data:**
| Name | Title | Quote (excerpt) |
|------|-------|-----------------|
| John Harris | Marketing Director | "Duncan truly understood my vision..." |
| Michael Lee | Product Manager | "He took the time to understand our goals..." |
| Sarah Johnson | CEO | "His design skills are unmatched..." |
| Laura Bennett | Small Business Owner | "...how stress-free Duncan made the process." |

**Stat metric cards:** `bg: #d0ff71`, `border-radius: 20px`, `padding: 24px`
- Label text (Inter, 14px, black)
- Animated counter (Antonio, 60px, bold, black): 98% Satisfaction Rate / 200% Growth
- Counter animates from 0 on scroll

---

### Section 6: Frequently Asked Questions

**Layout:** 2-column — heading/subtitle left (1fr), accordion right (1.5fr)

**Accordion items:** 6 FAQ entries, separated by `border-top: #333`
- Each row: number (Antonio, 26px) + question (Antonio, 26px, weight 400, uppercase) + chevron icon
- Expand: reveals answer paragraph (Inter, 18px, 300, muted)
- Chevron rotates 180° on expand
- Only one open at a time

**FAQ content:**
1. What services do you offer?
2. How does the design process work?
3. How long does a project usually take?
4. What do I need to provide before starting a project?
5. Do you offer revisions?
6. How do I get started?

---

### Section 7: Design Insights & Ideas (Blog)

**Components:**
- Section heading + subtitle
- 2 blog cards in 2-column grid
- "BROWSE ALL INSIGHTS" pill button → `/blogs`

**Blog cards:** `border: 1px solid #333`, `border-radius: 20px`
- Cover image (16:9 aspect, `border-radius: 20px` top), hover: image zooms
- Category badge (pill, `#303030` bg) + date
- Title (Antonio, 32px, 400) + description (Inter, 14px, 300, muted)

**Blog posts on homepage:**
| Title | Category | Date |
|-------|----------|------|
| 5 Design Trends That Will Define 2024 | Insights | Apr 30, 2025 |
| How to Streamline Your Design Workflow | Tutorials | Apr 27, 2025 |

---

### Section 8: Let's Work Together (Contact)

**Layout:** 2-column — portrait image + wave circle left, form right

**Left column:**
- Portrait image (340×476px, `border-radius: 20px`)
- "Hi" wave circle (lime bg, `#d0ff71`)

**Right column:**
- H2 heading + subtitle
- Form with 4 fields:
  - Name (text, required, placeholder "John Smith")
  - Email (email, required, placeholder "johnsmith@gmail.com")
  - Service Needed (select: Branding, Web Design, UI / UX)
  - What Can I Help You... (textarea, required, placeholder "Hello, I'd like to enquire about...")
- "SUBMIT" pill button (`border-radius: 99px`, lime border, Antonio 26px)

**Form inputs:** border-bottom style, `border-color: #333`, focus: `border-color: #d0ff71`

---

## Route: `/about`

### Section 1: About Hero

**Framer names:** `About`, `Container`, `About Content Wrap`, `H1 Title Wrap`

**Components:**
- H1 "ABOUT ME" (Antonio, 120px, 700)
- H3 "DUNCAN ROBERT" (Antonio, 32px, 400)
- Portrait image (green-tinted/filtered)
- Bio text: "I'm a digital designer and Framer developer passionate about crafting meaningful, user-centered experiences."
- Extended bio: "With a strong foundation in visual design and a deep understanding of interactive systems, I bring ideas to life through thoughtful design, smooth animations, and responsive layouts."
- 4 social icon links (X, Instagram, Behance, Dribbble)

**Responsive H1:**
| Viewport | Size |
|----------|------|
| ≥1200px | 120px |
| 390px | 56px |

---

### Section 2: What I Can Do For You (Services)

Same accordion structure as homepage Section 2. 4 categories, accordion behavior.

---

### Section 3: Discover My Journey in Design

**Framer names:** career timeline section

**Components:**
- H2 "DISCOVER MY JOURNEY IN DESIGN" (Antonio, 60px, 700)
- Subtitle paragraph
- Timeline with 4 entries, each showing:
  - Role title (Antonio, 32px, h3)
  - Company name (Inter, 18px, weight 600, lime color `#d0ff71`)
  - Year range (Inter, 18px)

**Timeline data:**
| Role | Company | Years |
|------|---------|-------|
| Creative Art Director | NovaWorks Agency | 2023 – Present |
| Senior UI/UX Designer | BrightLabs Digital | 2020 – 2023 |
| UI Designer | PixelForge Interactive | 2018 – 2020 |
| Graphic Designer | Creative Studio 101 | 2016 – 2018 |

---

### Section 4: My Tech Stack

**Components:**
- H2 "MY TECH STACK" (Antonio, 60px, 700)
- Grid of tool/logo images, each 56×56px, `border-radius: 12px`
- 5 tech logos identified (Figma, and 4 others — exact tools need visual ID)

---

### Section 5: Design with Strategy and Creativity

**Components:**
- H2 "DESIGN WITH STRATEGY AND CREATIVITY" (Antonio, 60px, 700)
- 5 process cards in a staggered grid layout

**Process cards:**
| # | Title | Background | Size | Border-radius | Padding |
|---|-------|-----------|------|---------------|---------|
| 01 | Research & Strategy | white `#fff` | 360×380px | 20px | 40px |
| 02 | Concept & Ideation | lime `#d0ff71` | 360×380px | 20px | 40px |
| 03 | Feedback & Refinement | dark `#333` | 740×380px (wide) | 20px | 40px |
| 04 | Testing & Optimization | lime `#d0ff71` | 360×380px | 20px | 40px |
| 05 | Launch & Delivery | white `#fff` | 360×380px | 20px | 40px |

**Card layout:** asymmetric grid — cards 01+02 side-by-side, card 03 full-width, cards 04+05 side-by-side

**Card typography:**
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Number (01.) | Antonio | 60px | 700 | `#303030` (dark cards) or white (on dark bg) |
| Title | Antonio | 32px | 400 | `#303030` or white |
| Description | Inter | 18px | 300 | `#303030` or white |

Some cards have accompanying images (360×380px, `border-radius: 20px`):
- Research & Strategy — image
- Feedback & Refinement — image
- Testing & Optimization — image

---

### Section 6: Let's Work Together (Contact)

Same as homepage Section 8 — contact form + portrait image.

---

## Route: `/projects`

### Section 1: Projects Hero

**Components:**
- H1 "FEATURED PROJECTS" (Antonio, 120px, 700, line-height 132px)
- Subtitle paragraph (Inter, 18px, 300)

---

### Section 2: Featured Projects Grid

Same 4 project cards as homepage Section 4. Full-width, stacked, each 1120×746px, `border-radius: 20px`.

---

### Section 3: More Projects

**Components:**
- H2 "MORE PROJECTS" (Antonio, 60px, 700)
- 2-column grid of smaller project cards (540×511px each)

**Additional projects:**
| Title | Category | Slug | Card size |
|-------|----------|------|-----------|
| Pantone Very Peri Poster Design | Graphic Design | `pantone-very-peri-poster-design` | 540×511px |
| Intenza Brand Boutique E-Gift Card Design | Graphic Design | `intenza-brand-boutique-e-gift-card-design` | 540×511px |
| VistaHaven | Web Design | `vistahaven-stunning-real-estate-template` | 540×490px |
| InnovateTech Identity Rollout | Branding | `innovatetech-identity-rollout` | 540×511px |

**Card structure:** cover image (540×320px, `border-radius: 20px`) + category badge (lime text) + title (Antonio, 32px) + description (Inter, 14px)

---

## Route: `/projects/[slug]` (Project Detail)

**Framer names:** `Project Page`, `Container`, `Project Wrap`, `Project Info`, `Project Meta Grid`, `Project Content`, `Main Cover Image`, `Content Block`, `Image Wrap`

### Section 1: Project Hero

**Components:**
- Category badge (lime pill, `#d0ff71`, 14px)
- H1 project title (Antonio, 120px, 700)
- Description paragraph (Inter, 18px, 300)
- Metadata grid (4 columns):
  - Year : `<value>` (e.g., 2024)
  - Industry : `<value>` (e.g., Event / Festival)
  - Client : `<value>` (e.g., FestivalWorks)
  - Project Duration : `<value>` (e.g., 6 weeks)
- Metadata labels: Inter, 18px, 300, white
- Metadata values: Inter, 18px, 600, lime `#d0ff71`

---

### Section 2: Main Cover Image

- Full-width project cover (1000×600px, `border-radius: 20px`)

---

### Section 3: Content Blocks

Repeating pattern of text block + image(s):

**Content Block structure:**
- H3 section heading: "Problem :", "Solution :", "Challenge :", "Summary :" (Antonio, 32px, 400)
- Body paragraphs (Inter, 18px, 300, white)
- Content image(s):
  - Full-width: 1000×450px, `border-radius: 20px`
  - Half-width pair: 2× 480×400px, `border-radius: 20px`, side-by-side

**Summer Vibes project has:**
- 1 main cover (1000×600)
- 1 full-width content image (1000×450)
- 4 half-width content images (480×400) in 2 rows of 2

---

### Section 4: More Projects

- H2 "MORE PROJECTS" (Antonio, 60px, 700)
- 2×3 grid of project cards (480×320px each, `border-radius: 20px`)
- Shows 6 other projects (excludes the current project)
- "LOAD MORE" pill button at bottom (Antonio, 26px, `#333` bg, `#333` text)

---

### Known Project Slugs (8 total)

| Slug | Category | Year | Client | Duration |
|------|----------|------|--------|----------|
| `summer-vibes-festival-campaign` | Graphic Design | 2024 | FestivalWorks | 6 weeks |
| `coral-spiral-abstract` | Branding | — | — | — |
| `shopease-redesign-sprint` | UI / UX Design | — | — | — |
| `black-geometric-prisms` | Branding | — | — | — |
| `pantone-very-peri-poster-design` | Graphic Design | — | — | — |
| `intenza-brand-boutique-e-gift-card-design` | Graphic Design | — | — | — |
| `vistahaven-stunning-real-estate-template` | Web Design | 2025 | VistaHaven | 2 weeks |
| `innovatetech-identity-rollout` | Branding | — | — | — |

---

## Route: `/blogs`

**Framer names:** `Blog`, `Container`, `Post Wrap`, `Pinned Post`, `Blog Badge`

### Section 1: Blog Hero

**Components:**
- H1 "DESIGN INSIGHTS & IDEAS" (Antonio, 120px, 700)
- Subtitle paragraph (Inter, 18px, 300)

---

### Section 2: Most Viewed (Pinned Post)

**Components:**
- "Most Viewed" badge (H4, Antonio, 26px, lime bg pill)
- Large featured blog card — full-width image + title + metadata
- Pinned post: "How to Streamline Your Design Workflow"

---

### Section 3: Blog Grid

**Components:**
- Blog post cards in mixed grid layout (2-column)
- Each card: cover image + category badge (lime text) + date + title (Antonio, 32px) + description

**All blog posts (6 total):**
| Title | Category | Date | Slug |
|-------|----------|------|------|
| How to Streamline Your Design Workflow | Tutorials | Apr 27, 2025 | `how-to-streamline-your-design-workflow` |
| 5 Design Trends That Will Define 2024 | Insights | Apr 30, 2025 | `5-design-trends-that-will-define-2024` |
| The Power of Typography in Web Design | Insights | May 2, 2025 | `the-power-of-typography-in-web-design` |
| The Role of Color Psychology in Branding | Insights | Apr 22, 2025 | `the-role-of-color-psychology-in-branding` |
| Mastering UI/UX Design: Key Principles for Success | Tips | Mar 30, 2025 | `mastering-ui-ux-design-key-principles-for-success` |
| Balancing Creativity and Functionality in Design | Insights | Apr 5, 2025 | `balancing-creativity-and-functionality-in-design` |

---

## Route: `/blogs/[slug]` (Blog Post Detail)

**Framer names:** `Blog Page`, `Container`, `Blog Content`, `Content Wrap`, `Content Block`, `Subscribe Button Wrap`, `Post Wrap`

### Section 1: Blog Hero

**Components:**
- H1 blog title (Antonio, 120px, 700)
- Description/excerpt (Inter, 18px, 300)
- Category badge (lime text, 14px) + date (14px, white)
- Cover image (1000×600px, `border-radius: 20px`)

---

### Section 2: Content Blocks

Numbered content sections (H2 headings):

**"5 Design Trends" example has 5 sections:**
1. 3D Lettering and Bubble Fonts
2. Bold Color Contrasts and Abstract Gradients
3. AI-Assisted Design & Human-Centered Digital Experiences
4. Natural Elements and Tactile Textures
5. Structural Redesign: Visible Grids and Composition

**Content H2 typography:** Antonio, 40px, weight 400, white

**Body text:** Inter, 18px, 300, white, line-height 27px

**Content images:**
- Full-width: 1000×450px, `border-radius: 20px`
- Half-width pair: 480×400px, `border-radius: 20px`

---

### Section 3: Newsletter Subscribe

**Components:**
- H3 "Like what you see? There's more." (Antonio, 32px, `#303030`)
- Subtitle: "Get monthly inspiration, blog updates..." (Inter, 14px, `#303030`)
- "Subscribe" pill button (Antonio, 26px, lime bg)
- Lime background card container

---

### Section 4: More to Discover (Related Posts)

**Components:**
- H3 "More to Discover" (Antonio, 32px)
- 2-column grid of related blog cards (480×320px, `border-radius: 20px`)
- "LOAD MORE" pill button (Antonio, 26px)

---

## Responsive Breakpoints

Based on Framer's built-in responsive system:

| Breakpoint | H1 size | H2 size | Nav state | Grid columns |
|------------|---------|---------|-----------|-------------|
| ≥1200px (Desktop) | 120px | 60px | Expanded with links | 2–3 col |
| 810–1199px (Tablet) | 56px | 42px | Expanded or collapsed | 1–2 col |
| <810px (Mobile) | 56px | 42px | Collapsed + hamburger | 1 col |

**Mobile-specific changes:**
- Hero images scale down
- Services grid → 1 column
- Stats cards → stacked
- Testimonials → 1 column stacked
- FAQ → single column (heading above accordion)
- Blog grid → 1 column
- Contact form → full-width stacked
- Project cards → full-width
- Footer → stacked vertical

---

## Transitions & Animations Summary (All Routes)

| Animation | Where | Behavior |
|-----------|-------|----------|
| Custom cursor | Global | 16px lime circle follows mouse, grows on hover |
| Page entrance | All pages | Elements fade/slide in on page load (`data-framer-appear-id`) |
| Scroll reveal | All sections | Elements animate in when scrolled into view |
| Counter animation | Homepage, Testimonials | Numbers count up from 0 when in viewport |
| Hero 3D parallax | Homepage | Card flip with mouse-tracking rotation |
| Nav text-swap | Global | Link text rolls on Y-axis hover |
| Nav expand/collapse | Global | Spring-physics width animation |
| Accordion expand | Services, FAQ | Smooth height + opacity transition |
| Project card hover | Projects sections | Image zoom + overlay darken |
| Blog card hover | Blog sections | Image zoom + border highlight |
| CTA button hover | All pill buttons | Bg fills lime, text inverts, arrow slides |
| Social icon hover | About, Footer | Bg color swap with transition |
| Chevron rotation | FAQ | 180° rotate on accordion toggle |
| Noise texture | Global | Subtle animated noise overlay |

---

## Typography System (All Routes)

| Token | Font | Size | Weight | Line-height | Letter-spacing | Usage |
|-------|------|------|--------|-------------|----------------|-------|
| `heading-xl` | Antonio | 120px | 700 | 132px | -3.6px | Page H1 titles |
| `heading-lg` | Antonio | 60px | 700 | 78px | normal | Section H2 titles |
| `heading-md` | Antonio | 40px | 400 | — | normal | Blog content H2 |
| `heading-sm` | Antonio | 32px | 400 | 41.6px | normal | H3 titles, card titles |
| `heading-xs` | Antonio | 26px | 400 | 33.8px | normal | H4 buttons, badge text |
| `body-lg` | Inter | 18px | 300 | 27px | normal | Body text, descriptions |
| `body-md` | Inter | 16px | 300 | 24px | normal | Nav links |
| `body-sm` | Inter | 14px | 300 | 21px | normal | Captions, meta, badges |
| `body-xs` | Inter | 12px | 400 | — | normal | Small text |
| `stat` | Antonio | 60px | 700 | 60px | normal | Counter numbers |
| `meta-value` | Inter | 18px | 600 | 23.4px | normal | Metadata values (lime) |

---

## Color System (All Routes)

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#1a1a1b` / `rgb(26,26,27)` | Page background |
| `foreground` | `#ffffff` | Primary text |
| `lime` (accent) | `#d0ff71` / `rgb(208,255,113)` | Accent, buttons, stat cards, footer bg |
| `green-dot` | `#0bde66` / `rgb(11,222,102)` | "Available for work" indicator |
| `card-dark` | `#303030` / `rgb(48,48,48)` | Testimonial cards, badges |
| `border` | `#333333` / `rgb(51,51,51)` | Dividers, borders, dark process card |
| `muted` | `#b5b5b5` / `rgb(181,181,181)` | Secondary text |
| `star-blue` | `rgb(106,113,223)` | Star ratings, checkmark icons |
| `nav-bg` | `rgba(15,15,15,0.9)` | Navbar background |
| `white` | `#ffffff` | Process cards, CTA text on dark |
| `black` | `#000000` | Text on lime backgrounds |

---

## Spacing Constants

| Token | Value | Usage |
|-------|-------|-------|
| Content max-width | 1200px (homepage), 1000px (detail pages) | Main container |
| Section padding | ~80–120px vertical | Between sections |
| Card border-radius | 20px | All cards |
| Pill border-radius | 99px | Buttons, badges, nav, avatar |
| Card padding | 24–40px | Card internal spacing |
| Grid gap | 20px | Between grid items |
| Small gap | 8–12px | Between inline elements |
