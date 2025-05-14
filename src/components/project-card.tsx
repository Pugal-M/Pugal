import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { Github, ExternalLink, Eye } from 'lucide-react'; // Added Eye icon
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  id: string; // Added id for linking
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  dataAiHint?: string; // Added dataAiHint for image
}

export function ProjectCard({ id, title, description, imageUrl, liveUrl, githubUrl, dataAiHint }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-card border border-border/50 hover:border-primary transition-colors duration-300 flex flex-col h-full group rounded-lg shadow-md hover:shadow-lg">
      <CardHeader className="p-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} screenshot`}
          data-ai-hint={dataAiHint || title.toLowerCase().split(" ").slice(0,2).join(" ")}
          width={600}
          height={400}
          className="object-cover w-full aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
        />
      </CardHeader>
      <CardContent className="p-4 md:p-6 flex-grow">
        <CardTitle className="text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 md:p-6 pt-0 flex flex-wrap gap-3 justify-start items-center">
        {liveUrl && (
          <Button asChild variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          </Button>
        )}
        {githubUrl && (
          <Button asChild variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </Button>
        )}
        {/* View Project Button */}
        <Button asChild variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
          <Link href={`/project/${id}`} className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" /> View Project
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
