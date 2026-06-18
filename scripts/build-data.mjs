// Parses scraped snapshots in docs/research/snapshots/ into typed data files
// (src/data/projects.ts, src/data/blogs.ts) and downloads every referenced
// image into public/images/cms/. Run: node scripts/build-data.mjs
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join } from "path";

const ROOT = process.cwd();
const SNAP = join(ROOT, "docs/research/snapshots");
const CMS_DIR = join(ROOT, "public/images/cms");

const PROJECT_ORDER = [
  "summer-vibes-festival-campaign",
  "coral-spiral-abstract",
  "shopease-redesign-sprint",
  "black-geometric-prisms",
  "pantone-very-peri-poster-design",
  "intenza-brand-boutique-e-gift-card-design",
  "vistahaven-stunning-real-estate-template",
  "innovatetech-identity-rollout",
];
const FEATURED = new Set(PROJECT_ORDER.slice(0, 4));

const BLOG_ORDER = [
  "how-to-streamline-your-design-workflow",
  "5-design-trends-that-will-define-2024",
  "the-power-of-typography-in-web-design",
  "the-role-of-color-psychology-in-branding",
  "mastering-ui-ux-design-key-principles-for-success",
  "balancing-creativity-and-functionality-in-design",
];
const PINNED_BLOG = "how-to-streamline-your-design-workflow";

const AVATAR = "IUYreEo8ON7qCLgK2tgDOW0xoI";
const CREATOR = "ZdGiQIvKJf4dbNyeWSaZP6Vyw";

const images = new Map(); // dl url -> local path

function imgLocal(url) {
  const u = new URL(url);
  const file = u.pathname.split("/").pop();
  const local = `/images/cms/${file}`;
  const dl = `${u.origin}${u.pathname}`;
  if (!images.has(dl)) images.set(dl, local);
  return local;
}

function isJunkImg(src) {
  return src.includes(AVATAR) || src.includes(CREATOR);
}

async function load(name) {
  return JSON.parse(await readFile(join(SNAP, name), "utf8"));
}

function parseProject(slug, seq) {
  const h1i = seq.findIndex((n) => n.t === "h1");
  const category = [...seq.slice(0, h1i)].reverse().find((n) => n.t === "p")?.x ?? "";
  const title = seq[h1i].x;
  const description = seq[h1i + 1].x;

  // metadata: next 8 p's after description
  const metaP = seq.slice(h1i + 2).filter((n) => n.t === "p").slice(0, 8).map((n) => n.x);
  const meta = {};
  for (let i = 0; i < metaP.length; i += 2) {
    const key = metaP[i].replace(/\s*:\s*$/, "").toLowerCase();
    meta[key] = metaP[i + 1];
  }

  // cover = first framer img after h1
  const coverNode = seq.slice(h1i).find((n) => n.t === "img" && !isJunkImg(n.src));
  const cover = imgLocal(coverNode.src);

  // sections: from cover until "More Projects" h2
  const moreI = seq.findIndex((n) => n.t === "h2" && /more projects/i.test(n.x));
  const coverI = seq.indexOf(coverNode);
  const body = seq.slice(coverI + 1, moreI === -1 ? undefined : moreI);

  const sections = [];
  let cur = null;
  for (const n of body) {
    if (n.t === "h3") {
      cur = { heading: n.x.replace(/\s*:\s*$/, ""), paragraphs: [], images: [] };
      sections.push(cur);
    } else if (cur && n.t === "p") {
      cur.paragraphs.push(n.x);
    } else if (cur && n.t === "img" && !isJunkImg(n.src)) {
      cur.images.push(imgLocal(n.src));
    }
  }

  return {
    slug,
    category,
    title,
    description: description.replace(/^Description:\s*/i, ""),
    cover,
    year: meta["year"] ?? "",
    industry: meta["industry"] ?? "",
    client: meta["client"] ?? "",
    duration: meta["project duration"] ?? "",
    featured: FEATURED.has(slug),
    sections,
  };
}

function parseBlog(slug, seq) {
  const h1i = seq.findIndex((n) => n.t === "h1");
  const title = seq[h1i].x;
  const after = seq.slice(h1i + 1);
  const excerpt = after.find((n) => n.t === "p")?.x ?? "";
  const ps = after.filter((n) => n.t === "p").map((n) => n.x);
  const category = ps[1] ?? "";
  const date = ps[2] ?? "";

  const coverNode = after.find((n) => n.t === "img" && !isJunkImg(n.src));
  const cover = imgLocal(coverNode.src);
  const coverI = seq.indexOf(coverNode);

  const stopI = seq.findIndex((n) => n.t === "h3" && /like what you see/i.test(n.x));
  const body = seq.slice(coverI + 1, stopI === -1 ? undefined : stopI);

  const sections = [];
  let cur = null;
  for (const n of body) {
    if (n.t === "h2") {
      cur = { heading: n.x, paragraphs: [], images: [] };
      sections.push(cur);
    } else if (cur && n.t === "p") {
      cur.paragraphs.push(n.x);
    } else if (cur && n.t === "img" && !isJunkImg(n.src)) {
      cur.images.push(imgLocal(n.src));
    }
  }

  return { slug, category, date, title, excerpt, cover, pinned: slug === PINNED_BLOG, sections };
}

async function downloadAll() {
  if (!existsSync(CMS_DIR)) await mkdir(CMS_DIR, { recursive: true });
  const entries = [...images.entries()];
  console.log(`Downloading ${entries.length} images...`);
  const batch = 5;
  for (let i = 0; i < entries.length; i += batch) {
    await Promise.all(
      entries.slice(i, i + batch).map(async ([url, local]) => {
        const out = join(ROOT, "public", local.replace("/images/", "images/"));
        if (existsSync(out)) return;
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          await mkdir(dirname(out), { recursive: true });
          await writeFile(out, Buffer.from(await res.arrayBuffer()));
          console.log(`OK ${local}`);
        } catch (e) {
          console.error(`FAIL ${local}: ${e.message}`);
        }
      })
    );
  }
}

function tsHeader() {
  return "// AUTO-GENERATED by scripts/build-data.mjs — do not edit by hand.\n";
}

async function main() {
  const files = await readdir(SNAP);

  const projects = [];
  for (const slug of PROJECT_ORDER) {
    const f = `proj-${slug}.json`;
    if (!files.includes(f)) { console.warn(`missing ${f}`); continue; }
    projects.push(parseProject(slug, await load(f)));
  }

  const blogs = [];
  for (const slug of BLOG_ORDER) {
    const f = `blog-${slug}.json`;
    if (!files.includes(f)) { console.warn(`missing ${f}`); continue; }
    blogs.push(parseBlog(slug, await load(f)));
  }

  // Collect About-page images so they are downloaded too (data defined in page).
  if (files.includes("about.json")) {
    for (const n of await load("about.json")) {
      if (n.t === "img" && /framerusercontent/.test(n.src) && !isJunkImg(n.src)) {
        imgLocal(n.src);
      }
    }
  }

  await downloadAll();

  const projectsTs =
    tsHeader() +
    `import type { Project } from "@/types";\n\n` +
    `export const projects: Project[] = ${JSON.stringify(projects, null, 2)};\n\n` +
    `export function getProject(slug: string): Project | undefined {\n` +
    `  return projects.find((p) => p.slug === slug);\n}\n`;

  const blogsTs =
    tsHeader() +
    `import type { BlogPost } from "@/types";\n\n` +
    `export const blogs: BlogPost[] = ${JSON.stringify(blogs, null, 2)};\n\n` +
    `export function getBlog(slug: string): BlogPost | undefined {\n` +
    `  return blogs.find((b) => b.slug === slug);\n}\n`;

  await mkdir(join(ROOT, "src/data"), { recursive: true });
  await writeFile(join(ROOT, "src/data/projects.ts"), projectsTs);
  await writeFile(join(ROOT, "src/data/blogs.ts"), blogsTs);
  console.log(`Wrote ${projects.length} projects, ${blogs.length} blogs.`);
}

main();
