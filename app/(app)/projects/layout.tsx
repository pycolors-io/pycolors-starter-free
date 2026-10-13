import { ProjectProvider } from "@/components/projects/project-provider";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectProvider>{children}</ProjectProvider>;
}
