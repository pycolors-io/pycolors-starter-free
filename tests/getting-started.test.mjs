import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

import { GETTING_STARTED_STEPS } from "../lib/getting-started.ts";

const appRoot = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, appRoot), "utf8");

test("the first-session path has three distinct, ordered steps", () => {
  assert.deepEqual(
    GETTING_STARTED_STEPS.map((step) => step.id),
    ["projects", "customize", "pro"],
  );
  assert.equal(
    new Set(GETTING_STARTED_STEPS.map((step) => step.title)).size,
    3,
  );
  for (const step of GETTING_STARTED_STEPS) {
    assert.ok(step.title.trim());
    assert.ok(step.description.trim());
    assert.ok(step.links.length > 0);
  }
});

test("the first action reuses the delivered projects routes", () => {
  const step = GETTING_STARTED_STEPS[0];
  assert.deepEqual(step.links, [{ label: "Try projects", href: "/projects" }]);
  for (const path of [
    "app/(app)/projects/page.tsx",
    "app/(app)/projects/[id]/page.tsx",
  ]) {
    assert.ok(statSync(new URL(path, appRoot)).isFile(), path);
  }
  assert.match(step.description, /create.*details.*rename.*delete/iu);
  assert.match(step.description, /this browser.*storage is available/iu);
  assert.match(step.note, /No shared database is connected/u);
});

test("customization references files in the delivered starter", () => {
  const files = GETTING_STARTED_STEPS[1].files;
  assert.deepEqual(
    files.map((file) => file.path),
    ["app/layout.tsx", "app/(app)/layout.tsx", "app/globals.css"],
  );
  for (const file of files) {
    assert.ok(statSync(new URL(file.path, appRoot)).isFile(), file.path);
    assert.ok(file.purpose.trim());
  }
});

test("guide links use explicit existing destinations without tracking", () => {
  const links = GETTING_STARTED_STEPS.flatMap((step) => step.links);
  assert.deepEqual(
    links.map((link) => link.href),
    [
      "/projects",
      "https://pycolors.io/docs/starter/project-structure",
      "https://pycolors.io/docs/starter/getting-started",
      "https://pycolors.io/starters/pro",
      "https://pycolors.io/docs/starter-pro/what-is-included",
    ],
  );
  assert.equal(new Set(links.map((link) => link.label)).size, links.length);
  for (const link of links) {
    assert.ok(link.label.trim().length > 5);
    const url = new URL(link.href, "https://pycolors.io");
    assert.equal(url.origin, "https://pycolors.io");
    assert.equal(url.search, "");
    assert.equal(url.hash, "");
  }
});

test("Pro keeps the demo-unlock and migration boundary explicit", () => {
  const step = GETTING_STARTED_STEPS[2];
  for (const capability of [
    "Auth.js",
    "protected routes",
    "Prisma/PostgreSQL",
    "Stripe billing foundations",
  ]) {
    assert.ok(step.description.includes(capability));
  }
  assert.match(step.note, /separate source code to configure and adapt/u);
  assert.match(step.note, /does not unlock.*or automatically migrate/u);
});

test("dashboard source composes the guide before illustrative metrics", () => {
  // Source integration checks supplement the real Next build, not browser QA.
  const page = read("app/(app)/dashboard/page.tsx");
  const start = page.indexOf(
    '<section aria-labelledby="getting-started-title"',
  );
  assert.ok(start >= 0);
  const end = page.indexOf("</section>", start);
  assert.ok(end > start);
  const guide = page.slice(start, end);
  assert.match(guide, /<h2\s+id="getting-started-title"/u);
  assert.match(guide, /<ol\s+role="list"/u);
  assert.match(guide, /GETTING_STARTED_STEPS\.map/u);
  assert.match(guide, /<li\s+key=\{step\.id\}/u);
  assert.match(guide, /<h3\b[^>]*>\s*\{step\.title\}/u);
  assert.match(guide, /href=\{link\.href\}/u);
  assert.match(guide, /\{link\.label\}/u);
  assert.match(guide, /\{file\.path\}/u);
  assert.match(guide, /\{file\.purpose\}/u);
  assert.match(guide, /\{step\.note\}/u);
  assert.doesNotMatch(page, /["']use client["']/u);
  assert.doesNotMatch(
    guide,
    /\bonClick\b|\bonKeyDown\b|\buseState\b|\buseEffect\b|\blocalStorage\b|\bfetch\s*\(|<Checkbox\b|role="progressbar"/u,
  );
  const notice = page.indexOf("Illustrative demo data.");
  assert.ok(notice > end);
  assert.ok(page.indexOf('label="MRR"') > notice);
});

test("README explains the guide and the untracked navigation boundary", () => {
  const readme = read("README.md");
  assert.match(readme, /## Dashboard getting-started guide/u);
  assert.match(readme, /does not track completion/u);
  for (const step of GETTING_STARTED_STEPS) {
    for (const link of step.links) assert.ok(readme.includes(link.href));
  }
});
