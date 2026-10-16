"use client";

import * as React from "react";
import { MOCK_PROJECTS, type Project } from "./project-types";
import { readProjects, writeProjects } from "@/lib/project-storage";

type ProjectContextValue = {
  projects: Project[];
  isLoading: boolean;
  storageError: string | null;
  createProject: (name: string) => void;
  renameProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
};

const ProjectContext = React.createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = React.useState<Project[]>(MOCK_PROJECTS);
  const [isLoading, setIsLoading] = React.useState(true);
  const [storageError, setStorageError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      setProjects(readProjects(window.localStorage, MOCK_PROJECTS));
    } catch {
      setStorageError(
        "Saved projects could not be loaded. Sample projects are shown. Creating or editing a project, or resetting the demo, will try to save a new local copy.",
      );
    }
    setIsLoading(false);
  }, []);

  function updateProjects(next: Project[]) {
    setProjects(next);
    try {
      writeProjects(window.localStorage, next);
      setStorageError(null);
    } catch {
      setStorageError(
        "Browser storage is unavailable. Your changes are kept for this visit only and will be lost after reloading.",
      );
    }
  }

  function createProject(name: string) {
    const trimmed = name.trim();
    if (!trimmed || isLoading) return;
    updateProjects([
      ...projects,
      {
        id: crypto.randomUUID(),
        name: trimmed,
        status: "active",
        updatedAt: "Just now",
        members: 1,
      },
    ]);
  }

  function renameProject(id: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed || isLoading) return;
    updateProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, name: trimmed, updatedAt: "Just now" }
          : project,
      ),
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoading,
        storageError,
        createProject,
        renameProject,
        deleteProject: (id) => {
          if (!isLoading)
            updateProjects(projects.filter((project) => project.id !== id));
        },
        resetProjects: () => {
          if (!isLoading) updateProjects(MOCK_PROJECTS);
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = React.useContext(ProjectContext);
  if (!context)
    throw new Error("useProjects must be used within ProjectProvider");
  return context;
}
