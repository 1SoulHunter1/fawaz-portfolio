import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join } from "path";

const ASSETS = [
  { url: "https://framerusercontent.com/images/IUYreEo8ON7qCLgK2tgDOW0xoI.jpg", path: "public/images/avatar.jpg" },
  { url: "https://framerusercontent.com/images/VRQgkdWsjawSg1qpCm45HfSY1I.jpeg?scale-down-to=1024&width=960&height=1200", path: "public/images/portrait-back.jpeg" },
  { url: "https://framerusercontent.com/images/qrxY8NagVO40NBrdhFEGgFR3PYY.jpg?width=620&height=630", path: "public/images/portrait-front.jpg" },
  { url: "https://framerusercontent.com/images/w08JBQPFYIq2vr4OfcD9W6vxEug.jpeg?scale-down-to=1024", path: "public/images/project-summer-vibes.jpeg" },
  { url: "https://framerusercontent.com/images/qbjsnnvP9w7UaA2syp36oUe8OSo.jpg?scale-down-to=1024", path: "public/images/project-coral-spiral.jpg" },
  { url: "https://framerusercontent.com/images/nTU7b0ZAdWdlqCI4mQ4tGTPpDs.jpeg?scale-down-to=1024", path: "public/images/project-shopease.jpeg" },
  { url: "https://framerusercontent.com/images/2nWXrWvPxxMHSpsOkNYf8KjzP7Q.jpeg?scale-down-to=1024", path: "public/images/project-black-prisms.jpeg" },
  { url: "https://framerusercontent.com/images/xPotMb4VrNT5rTGtXQvpYqXunU.jpg?width=400&height=400", path: "public/images/reviewer-john.jpg" },
  { url: "https://framerusercontent.com/images/hleE21gbHw2Y29KULoer3tF8.jpg?width=400&height=400", path: "public/images/reviewer-michael.jpg" },
  { url: "https://framerusercontent.com/images/RTNUbNmEH3Lg1VzA3NOYHdp3bHQ.jpg?width=400&height=400", path: "public/images/reviewer-sarah.jpg" },
  { url: "https://framerusercontent.com/images/ZbUvwGb7xhhwmovo3t9YO4bAIGs.jpg?width=400&height=400", path: "public/images/reviewer-laura.jpg" },
  { url: "https://framerusercontent.com/images/1wFj19qQG6zNr7gj3iTlH0Gdlu8.jpeg?scale-down-to=1024", path: "public/images/blog-design-trends.jpeg" },
  { url: "https://framerusercontent.com/images/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg?scale-down-to=1024", path: "public/images/blog-workflow.jpeg" },
  { url: "https://framerusercontent.com/images/ZdGiQIvKJf4dbNyeWSaZP6Vyw.png", path: "public/images/creator-logo.png" },
  { url: "https://framerusercontent.com/images/AVsssNQRylEZc5orEWvz8Q1wQT4.gif?width=500&height=700", path: "public/images/hero-pattern.gif" },
  { url: "https://framerusercontent.com/images/vBe56549gs4eoEzOSmyUR33ZTjI.png", path: "public/seo/favicon.png" },
  { url: "https://framerusercontent.com/images/E1WpqVmKDy3dfBvA5ZUr05iM.jpg", path: "public/seo/og-image.jpg" },
];

async function download(url, path) {
  const dir = dirname(path);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(path, buf);
    console.log(`OK ${path} (${(buf.length / 1024).toFixed(1)}KB)`);
  } catch (e) {
    console.error(`FAIL ${path}: ${e.message}`);
  }
}

async function main() {
  console.log(`Downloading ${ASSETS.length} assets...`);
  const batch = 4;
  for (let i = 0; i < ASSETS.length; i += batch) {
    await Promise.all(ASSETS.slice(i, i + batch).map(a => download(a.url, a.path)));
  }
  console.log("Done!");
}

main();
