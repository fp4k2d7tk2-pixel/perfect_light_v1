#!/usr/bin/env node
/*
  build.mjs
  Perfect Light Chicago — content build step (Vercel).

  What it does:
    Reads every project entry under /content/projects/*.md (frontmatter + notes)
    Writes /public/content/projects.json  — consumed by /public/js/projects.js

  Vercel then serves everything under /public/ as static content, plus /api/*.js
  as Serverless Functions. No output directory needed.

  Zero dependencies — uses only Node's built-in fs/path modules.
*/

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_DIR = path.join(ROOT, "public");

// Tiny YAML-frontmatter parser (subset)
function parseFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n([\s\S]*))?$/);
  if (!m) return { data: {}, body: text };
  const yaml = m[1];
  const body = m[2] || "";
  const data = {};

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
      const block = [];
      i++;
      while (i < lines.length && (lines[i].startsWith("  ") || lines[i] === "")) {
        block.push(lines[i].replace(/^ {2}/, ""));
        i++;
      }
      data[key] = block.join("\n").trim();
      continue;
    }
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

async function buildProjects() {
  const dir = path.join(CONTENT_DIR, "projects");
  if (!existsSync(dir)) {
    console.log("[build] no content/projects/ directory; writing empty array");
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

async function main() {
  console.log("[build] Perfect Light Chicago — content build");

  const projects = await buildProjects();
  console.log(`[build] projects: ${projects.length} entries (${projects.filter((p) => p.published).length} published)`);

  const contentOut = path.join(PUBLIC_DIR, "content");
  await mkdir(contentOut, { recursive: true });
  await writeFile(path.join(contentOut, "projects.json"), JSON.stringify(projects, null, 2));

  console.log(`[build] wrote ${path.relative(ROOT, path.join(contentOut, "projects.json"))}`);
  console.log("[build] done");
}

main().catch((err) => {
  console.error("[build] failed:", err);
  process.exit(1);
});
