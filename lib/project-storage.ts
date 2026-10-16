import type { Project } from "../components/projects/project-types";

export const PROJECT_STORAGE_KEY = "pycolors-starter-free:projects:v1";

type ProjectStorage = Pick<Storage, "getItem" | "setItem">;

function isProject(value: unknown): value is Project {
  if (typeof value !== "object" || value === null) return false;
  return (
    "id" in value &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    "name" in value &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    "status" in value &&
    typeof value.status === "string" &&
    ["active", "trialing", "paused"].includes(value.status) &&
    "updatedAt" in value &&
    typeof value.updatedAt === "string" &&
    "members" in value &&
    typeof value.members === "number" &&
    Number.isSafeInteger(value.members) &&
    value.members >= 0
  );
}

export function readProjects(
  storage: ProjectStorage,
  fallback: Project[],
): Project[] {
  const raw = storage.getItem(PROJECT_STORAGE_KEY);
  if (raw === null) return fallback;
  const value: unknown = JSON.parse(raw);
  if (
    !Array.isArray(value) ||
    !value.every(isProject) ||
    new Set(value.map((project) => project.id)).size !== value.length
  ) {
    throw new Error("Invalid saved projects");
  }
  // Keep only the demo fields, even if storage contains additional properties.
  return value.map(({ id, name, status, updatedAt, members }) => ({
    id,
    name,
    status,
    updatedAt,
    members,
  }));
}

export function writeProjects(storage: ProjectStorage, projects: Project[]) {
  storage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
}
