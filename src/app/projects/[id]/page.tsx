import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/sections/project-detail-view";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
