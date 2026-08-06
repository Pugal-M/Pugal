import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Code, PlayCircle, Calendar, Download } from "lucide-react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Navigation */}
        <Link href="/#projects">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-black/5 dark:hover:bg-white/10 transition-colors mb-12 cursor-none">
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Back to Projects</span>
          </div>
        </Link>

        {/* Header */}
        <header className="space-y-6 mb-16">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {project.date && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{project.date}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-google-blue" />
              <span className="w-1.5 h-1.5 rounded-full bg-google-red" />
              <span className="w-1.5 h-1.5 rounded-full bg-google-yellow" />
              <span className="w-1.5 h-1.5 rounded-full bg-google-green" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-border bg-black/5 dark:bg-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Main Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-border shadow-2xl">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Two Column Layout for Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </section>

            {project.videoUrl && (
              <section className="space-y-4 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold">
                  {project.videoTitle || "Video Demo"}
                </h2>
                {project.videoDescription && (
                  <p className="text-muted-foreground mb-4">
                    {project.videoDescription}
                  </p>
                )}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-lg">
                  <iframe
                    src={project.videoUrl}
                    title={project.videoTitle || "Video Demo"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </section>
            )}

            {/* Gallery */}
            {project.sliderImages && project.sliderImages.length > 0 && (
              <section className="space-y-4 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.sliderImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-xl overflow-hidden border border-border group"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-3xl glass border border-border space-y-6">
              <h3 className="text-xl font-bold">Links & Resources</h3>

              <div className="space-y-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-border transition-all cursor-none"
                  >
                    <Code className="text-google-blue" />
                    <span className="font-medium">Source Code</span>
                  </a>
                )}

                {project.downloadUrl && (
                  <a
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-border transition-all cursor-none"
                  >
                    <Download className="text-google-red" />
                    <span className="font-medium">Download App</span>
                  </a>
                )}

                {!project.githubUrl && !project.downloadUrl && (
                  <p className="text-muted-foreground text-sm">
                    No public links available for this project.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
