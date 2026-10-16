// Canonical-monorepo browser regression, using the existing UI test toolchain.
// Start Starter Free on 127.0.0.1:3113 before running this file.
import { createRequire } from "node:module";
import fs from "node:fs";
import process from "node:process";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
const requireUI = createRequire(
  new URL("../../../../packages/ui/package.json", import.meta.url),
);
const { chromium } = requireUI("playwright");
const evidence = fs.mkdtempSync(
  path.join(os.tmpdir(), "pycolors-free-browser-"),
);
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const mutations = [];
  page.on("request", (r) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(r.method()))
      mutations.push(r.url());
  });
  const routes = [
    "/",
    "/dashboard",
    "/projects",
    "/projects/missing-demo",
    "/assistant",
    "/settings",
    "/admin",
    "/billing",
    "/login",
    "/register",
    "/forgot-password",
  ];
  const results = [];
  for (const width of [390, 1440])
    for (const mode of ["light", "dark"]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("http://127.0.0.1:3113");
      await page.evaluate(
        (m) => localStorage.setItem("pycolors-starter-free:theme:v1", m),
        mode,
      );
      for (const route of routes) {
        await page.goto("http://127.0.0.1:3113" + route, {
          waitUntil: "networkidle",
        });
        assert.equal(await page.locator("h1").count(), 1, route + " h1");
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          route + " overflow " + width,
        );
        if (route === "/settings")
          for (const tab of ["Organization", "Security", "Danger zone"]) {
            await page.getByRole("tab", { name: tab, exact: true }).click();
            assert(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
              route + tab + " overflow",
            );
          }
        await page.screenshot({
          path: `${evidence}/${route.replaceAll("/", "_") || "home"}-${width}-${mode}.png`,
          fullPage: true,
        });
        results.push({ route, width, mode });
      }
    }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:3113/register");
  await page.getByLabel(/^Full name/).fill("Test Person");
  await page.getByLabel(/^Email/).fill("test@example.com");
  await page.getByLabel(/^Sample password/).fill("demo123456");
  await page.getByLabel(/^Confirm sample password/).fill("different123");
  await page
    .getByRole("button", { name: "Try account creation", exact: true })
    .click();
  await page.getByText("Passwords do not match.", { exact: true }).waitFor();
  await page.getByLabel(/^Confirm sample password/).fill("demo123456");
  await page
    .getByRole("button", { name: "Try account creation", exact: true })
    .click();
  await page
    .getByText("Demo complete. No account was created.", { exact: true })
    .waitFor();
  assert.equal(await page.getByLabel(/^Email/).inputValue(), "");
  for (const [route, button, feedback] of [
    [
      "login",
      "Try sign-in flow",
      "Demo complete. No session was created. You can explore the workspace below.",
    ],
    [
      "forgot-password",
      "Try reset flow",
      "Demo complete. No reset email was sent.",
    ],
  ]) {
    await page.goto("http://127.0.0.1:3113/" + route);
    await page.getByLabel(/^Email/).fill("test@example.com");
    if (route === "login")
      await page.getByLabel(/^Sample password/).fill("demo123456");
    await page.getByRole("button", { name: button, exact: true }).click();
    await page.getByText(feedback, { exact: true }).waitFor();
  }
  await page.goto("http://127.0.0.1:3113/projects");
  await page.getByRole("button", { name: "New project", exact: true }).click();
  await page
    .getByLabel("Project name", { exact: true })
    .fill("Browser regression");
  await page.getByRole("button", { name: "Create", exact: true }).click();
  await page
    .getByRole("link", { name: "Browser regression", exact: true })
    .click();
  const detailUrl = page.url();
  await page
    .getByRole("heading", { name: "Browser regression", exact: true })
    .waitFor();
  await page.reload();
  await page
    .getByRole("heading", { name: "Browser regression", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Edit project", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("textbox")
    .fill("Renamed regression");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Save|Rename/ })
    .click();
  await page
    .getByRole("heading", { name: "Renamed regression", exact: true })
    .waitFor();
  await page.screenshot({
    path: `${evidence}/project-detail-1440-dark.png`,
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:3113/projects");
  const row = page.getByRole("row").filter({
    has: page.getByRole("link", { name: "Renamed regression", exact: true }),
  });
  await row.getByRole("button", { name: "Actions", exact: true }).click();
  await page.getByRole("menuitem", { name: "Delete", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Delete", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("link", { name: "Renamed regression", exact: true })
      .count(),
    0,
  );
  await page.reload();
  assert.equal(
    await page
      .getByRole("link", { name: "Renamed regression", exact: true })
      .count(),
    0,
  );
  await page.goto("http://127.0.0.1:3113/assistant");
  await page
    .getByRole("button", { name: "Plan a product", exact: true })
    .click();
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page
    .getByRole("button", { name: "Copy assistant message", exact: true })
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  await page.setViewportSize({ width: 390, height: 900 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Settings", exact: true })
    .click();
  assert.equal(await page.getByRole("dialog").count(), 0);
  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const noScriptPage = await noScript.newPage();
  for (const route of ["login", "register", "forgot-password"]) {
    await noScriptPage.goto("http://127.0.0.1:3113/" + route);
    assert(await noScriptPage.locator("form button[type=submit]").isDisabled());
    assert(await noScriptPage.getByLabel(/^Email/).isDisabled());
  }
  await noScript.close();
  assert.deepEqual(errors, []);
  assert.deepEqual(
    mutations.filter((x) => !x.includes("/_vercel/")),
    [],
  );
  fs.writeFileSync(
    `${evidence}/results.json`,
    JSON.stringify({ pages: results, detailUrl, errors, mutations }, null, 2),
  );
  console.log("Evidence:", evidence);
  console.log(
    "PASS: 44 route/viewport/theme checks, settings tabs, auth validation/local-only results/no-JS guard, project create/reload/rename/delete, assistant sample/reset, mobile navigation, no page errors or application mutations.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
