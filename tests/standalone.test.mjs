import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const manifest = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

test("standalone dependencies do not require the monorepo checkout", () => {
  for (const section of ["dependencies", "devDependencies"]) {
    for (const [name, range] of Object.entries(manifest[section] ?? {})) {
      assert.doesNotMatch(
        range,
        /^(workspace:|file:|link:|portal:)/,
        `${section}.${name} must be installable from the public registry`,
      );
      assert.doesNotMatch(name, /^@pycolors\/core-/);
    }
  }
});

test("the standalone lockfile contains no local workspace resolutions", () => {
  const lockfile = readFileSync(
    new URL("../pnpm-lock.yaml", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    lockfile,
    /^\s+(?:version|specifier): ['"]?(?:workspace:|file:|link:|portal:)/m,
  );
});
