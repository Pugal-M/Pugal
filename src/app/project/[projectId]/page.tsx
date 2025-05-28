
import { projects } from '@/components/projects-section';
import { Footer } from '@/components/footer';
import { ProjectImageSlider } from '@/components/project-image-slider';
import { CustomVideoPlayer } from '@/components/CustomVideoPlayer'; // Import CustomVideoPlayer
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Download } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper';


interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

// Pre-render static paths for each project
export async function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.id === params.projectId);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  return {
    title: `${project.title} | Pugalarasu M Projects`,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen">
        {/* Intentionally not rendering Header here */}
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Button
              asChild
              variant="outline"
              className="mb-8 group border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </Button>

            <article className="bg-card p-6 md:p-8 rounded-lg shadow-xl border border-border/50">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {project.title}
              </h1>
              
              {project.displayVideoOnly && project.videoUrl ? (
                <div className="relative w-full mb-6 shadow-md rounded-lg overflow-hidden">
                  <CustomVideoPlayer
                    videoUrl={project.videoUrl}
                    title={project.videoTitle || project.title}
                    description={project.videoDescription || project.description}
                  />
                </div>
              ) : (
                <ProjectImageSlider 
                  images={project.sliderImages || (project.imageUrl ? [project.imageUrl] : [])}
                  altPrefix={project.title}
                  dataAiHint={project.dataAiHint}
                  videoUrl={project.videoUrl} // Pass videoUrl for combined slider/video
                  videoTitle={project.videoTitle}
                  videoDescription={project.videoDescription}
                />
              )}

              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground mb-6">
                <p className="lead">{project.description}</p>
                <p>{project.longDescription}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.githubUrl && project.githubUrl !== "#" && (
                  <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-colors">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </Button>
                )}
                
                {project.downloadUrl && (
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
                    <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download App
                    </a>
                  </Button>
                )}
              </div>
            </article>
          </div>
        </main>
        <Footer isProjectPage={true} />
      </div>
    </PageTransitionWrapper>
  );
}
