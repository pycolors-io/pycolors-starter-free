import assert from "node:assert/strict";
import test from "node:test";
import {
  PROJECT_STORAGE_KEY,
  readProjects,
  writeProjects,
} from "../lib/project-storage.ts";

const examples = [
  {
    id: "sample",
    name: "Sample",
    status: "active",
    updatedAt: "Just now",
    members: 1,
  },
];

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("first visit uses examples; created, renamed and deleted records survive reloads", () => {
  const storage = memoryStorage();
  assert.deepEqual(readProjects(storage, examples), examples);
  const created = { ...examples[0], id: "new", name: "My product" };
  writeProjects(storage, [...examples, created]);
  assert.deepEqual(readProjects(storage, examples), [...examples, created]);
  writeProjects(storage, [{ ...created, name: "Renamed" }]);
  assert.equal(readProjects(storage, examples)[0].name, "Renamed");
  writeProjects(storage, []);
  assert.deepEqual(readProjects(storage, examples), []);
  writeProjects(storage, examples);
  assert.deepEqual(readProjects(storage, []), examples);
});

test("corrupt data and invalid records are rejected without overwriting storage", () => {
  for (const raw of [
    "{",
    "null",
    "{}",
    "[null]",
    JSON.stringify([{ ...examples[0], members: -1 }]),
    JSON.stringify([{ ...examples[0], status: "unknown" }]),
    JSON.stringify([{ ...examples[0], name: " " }]),
    JSON.stringify([examples[0], examples[0]]),
  ]) {
    const storage = memoryStorage();
    storage.setItem(PROJECT_STORAGE_KEY, raw);
    assert.throws(() => readProjects(storage, examples));
    assert.equal(storage.getItem(PROJECT_STORAGE_KEY), raw);
  }
});

test("only demo fields are loaded", () => {
  const storage = memoryStorage();
  storage.setItem(
    PROJECT_STORAGE_KEY,
    JSON.stringify([{ ...examples[0], unexpected: "ignored" }]),
  );
  assert.deepEqual(readProjects(storage, []), examples);
});

test("storage errors are surfaced to the UI caller", () => {
  const storage = {
    getItem() {
      throw new Error("Storage blocked");
    },
    setItem() {
      throw new Error("Quota exceeded");
    },
  };
  assert.throws(() => readProjects(storage, examples), /Storage blocked/);
  assert.throws(() => writeProjects(storage, examples), /Quota exceeded/);
});
