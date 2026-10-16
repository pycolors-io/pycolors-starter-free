import { ProjectDetails } from "@/components/projects/project-details";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectDetails id={id} />;
}
