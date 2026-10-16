import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { isTheme, THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from "../lib/theme.ts";

function initialize(saved, systemDark, blocked = false) {
  const classes = new Set(["existing-class"]);
  const root = {
    classList: {
      toggle(name, active) {
        if (active) classes.add(name);
        else classes.delete(name);
      },
    },
    style: {},
  };
  const context = {
    document: { documentElement: root },
    localStorage: {
      getItem(key) {
        assert.equal(key, THEME_STORAGE_KEY);
        if (blocked) throw new Error("Storage denied");
        return saved;
      },
    },
    matchMedia(query) {
      assert.equal(query, "(prefers-color-scheme: dark)");
      return { matches: systemDark };
    },
  };
  vm.runInNewContext(THEME_INIT_SCRIPT, context);
  return { classes, scheme: root.style.colorScheme };
}

test("saved appearance overrides the system before hydration", () => {
  const dark = initialize("dark", false);
  assert.equal(dark.classes.has("dark"), true);
  assert.equal(dark.classes.has("existing-class"), true);
  assert.equal(dark.scheme, "dark");
  const light = initialize("light", true);
  assert.equal(light.classes.has("dark"), false);
  assert.equal(light.scheme, "light");
});

test("first visits, invalid values and denied storage fall back to system appearance", () => {
  for (const saved of [null, "system", "invalid", "<script>bad</script>"]) {
    for (const systemDark of [true, false]) {
      assert.equal(
        initialize(saved, systemDark).scheme,
        systemDark ? "dark" : "light",
      );
    }
  }
  assert.equal(initialize(null, true, true).scheme, "dark");
  assert.equal(initialize(null, false, true).scheme, "light");
});

test("only explicit light and dark values are accepted", () => {
  assert.equal(isTheme("dark"), true);
  assert.equal(isTheme("light"), true);
  for (const value of [null, undefined, {}, true, "system", "Dark"])
    assert.equal(isTheme(value), false);
});
