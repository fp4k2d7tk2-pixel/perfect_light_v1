#!/usr/bin/env node
/*
  build.mjs
  Perfect Light Chicago — minimal static build.

  What it does:
    1. Reads every project entry in /content/projects/*.md (frontmatter + notes)
    2. Emits /site/content/projects.json — consumed by /site/js/projects.js
    3. Copies /site → /dist (the folder Cloudflare Pages publishes)

  Zero dependencies: uses only Node's built-in fs/path modules.
*/

import { readdir, readFile, writeFile, mkdir, cp, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content");
const SITE_DIR = path.join(ROOT, "site");
const DIST_DIR = path.join(ROOT, "dist");

// --- tiny frontmatter parser ---------------------------------------------
// Format: --- \n key: value \n ... \n --- \n body
function parseFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n([\s\S]*))?$/);
  if (!m) return { data: {}, body: text };
  const yaml = m[1];
  const body = m[2] || "";
  const data = {};

  // Extremely small YAML subset: `key: value` and `key: |` block literals.
  const lines = yaml.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const kv = line.match(/^([A-Za-z0-9_.-]+):\s*(.*)$/);
    if (!kv) { i++; continue; }
    const key = kv[1];
    let val = kv[2];
    if (val === "|" || val === ">") {
      // Block literal — collect indented lines
      const block = [];
      i++;
      while (i < lines.length && (lines[i].startsWith("  ") || lines[i] === "")) {
        block.push(lines[i].replace(/^ {2}/, ""));
        i++;
      }
      data[key] = block.join("\n").trim();
      continue;
    }
    // Strip quotes if present
    val = val.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val === "true") val = true;
    else if (val === "false") val = false;
    else if (/^-?\d+(\.\d+)?$/.test(val)) val = Number(val);
    data[key] = val;
    i++;
  }
  return { data, body: body.trim() };
}

// --- projects -------------------------------------------------------------
async function buildProjects() {
  const dir = path.join(CONTENT_DIR, "projects");
  if (!existsSync(dir)) {
    console.log("[build] no content/projects/ directory; skipping");
    return [];
  }
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md") && !f.startsWith("."));
  const projects = [];
  for (const f of files) {
    const src = await readFile(path.join(dir, f), "utf8");
    const { data, body } = parseFrontmatter(src);
    projects.push({
      slug: f.replace(/\.md$/, ""),
      title: data.title || "",
      room: data.room || "",
      neighborhood: data.neighborhood || "",
      image: data.image || "",
      image_alt: data.image_alt || "",
      year: data.year || null,
      published: data.published !== false,
      order: typeof data.order === "number" ? data.order : 999,
      notes: data.notes || body || "",
    });
  }
  projects.sort((a, b) => (a.order || 999) - (b.order || 999));
  return projects;
}

// --- main -----------------------------------------------------------------
async function main() {
  console.log("[build] Perfect Light Chicago");
  console.log(`[build] root: ${ROOT}`);

  // 1. Compile content
  const projects = await buildProjects();
  console.log(`[build] projects: ${projects.length} entries (${projects.filter((p) => p.published).length} published)`);

  // 2. Fresh dist
  if (existsSync(DIST_DIR)) await rm(DIST_DIR, { recursive: true, force: true });
  await mkdir(DIST_DIR, { recursive: true });

  // 3. Copy site/ → dist/
  await cp(SITE_DIR, DIST_DIR, { recursive: true });

  // 4. Copy content/ → dist/content/ so Sveltia + fetch() can read the source files
  await cp(CONTENT_DIR, path.join(DIST_DIR, "content"), { recursive: true });

  // 5. Emit compiled JSON — must run AFTER the cp above or it gets overwritten
  const contentOut = path.join(DIST_DIR, "content");
  await writeFile(path.join(contentOut, "projects.json"), JSON.stringify(projects, null, 2));

  // 6. Copy CMS admin (if present) to dist/admin
  const adminSrc = path.join(ROOT, "admin");
  if (existsSync(adminSrc)) {
    await cp(adminSrc, path.join(DIST_DIR, "admin"), { recursive: true });
    console.log("[build] admin: CMS admin copied to /admin");
  }

  console.log("[build] done → dist/");
}

main().catch((err) => {
  console.error("[build] failed:", err);
  process.exit(1);
});
