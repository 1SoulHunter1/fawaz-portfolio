# Sheik Mohammad Fawaz — Portfolio

![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)

Personal portfolio showcasing my work in **AI/ML engineering**, **multi-agent automation**, and **full-stack development**. Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## Featured Projects

| Project | Description | Stack |
|---------|-------------|-------|
| **Veritas Neural** | 4-modality deepfake detection engine with sub-1.5s CPU inference | PyTorch, EfficientNet, FastAPI, Docker, React |
| **LinkedIn Resume ATS Pipeline** | Autonomous workflow that scrapes jobs, tailors resumes, and delivers daily digests | n8n, Google Gemini, Apify, LaTeX-on-HTTP, Supabase |
| **Knowledge Graph Builder** | NLP pipeline with force-directed graph rendering and NER-based clustering | spaCy, Streamlit, Barnes-Hut simulation |
| **Heart Disease Prediction** | Compared 6 ML classifiers — 91.80% accuracy, 96.10% ROC-AUC with KNN | scikit-learn, StratifiedKFold CV |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) |
| Styling | Tailwind CSS v4 with oklch design tokens |
| UI Components | shadcn/ui (Radix primitives) |
| Animations | Framer Motion (motion v12) — 3D peel-off card stack, scroll reveals, stagger effects |
| Smooth Scroll | Lenis |
| Contact Form | Web3Forms |
| Fonts | Inter (body), Antonio (headings) |
| Deployment | Vercel |

## Highlights

- **3D Peel-Off Card Stack** — Project cards rotate on the X-axis as they scroll away, with responsive breakpoints (45deg desktop, 20deg mobile)
- **Scroll-Linked Animations** — Parallax hero, sticky scroll sections, staggered reveals powered by Framer Motion
- **Custom Cursor** — Context-aware mouse follower with magnetic hover effects
- **Responsive** — Mobile-first design tested across 390px, 768px, and 1280px+ viewports
- **Contact Form** — Connected to Web3Forms for instant email delivery

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

Get your free access key at [web3forms.com](https://web3forms.com).

## Project Structure

```
src/
  app/                # Next.js routes (home, about, blogs, projects)
  components/         # React components
    ui/               # shadcn/ui primitives
    animations/       # ScrollReveal, StaggerReveal wrappers
    icons.tsx         # SVG icons as React components
  data/               # Blog posts and project data
  hooks/              # Custom React hooks
  lib/utils.ts        # cn() utility
  types/              # TypeScript interfaces
public/
  images/             # Project covers, blog images, portraits
  seo/                # Favicon, OG images
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Run lint + typecheck + build |

## Contact

- **Email:** sheikfawaz32@gmail.com
- **LinkedIn:** [Sheik Mohammad Fawaz](https://linkedin.com/in/sheik-mohammad-fawaz-83605a291)
- **GitHub:** [1SoulHunter1](https://github.com/1SoulHunter1)

## License

MIT
