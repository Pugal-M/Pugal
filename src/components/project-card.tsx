
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  githubUrl?: string | null;
  dataAiHint?: string;
}

export function ProjectCard({ id, title, description, imageUrl, githubUrl, dataAiHint }: ProjectCardProps) {
  const handleGitHubClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the Link's navigation
    if (githubUrl) {
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link
      href={`/project/${id}`}
      passHref
      className="block h-full group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`View details for project ${title}`}
    >
      <Card className="overflow-hidden bg-card border border-border/50 transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-lg hover:scale-[1.02] relative">
        {imageUrl && (
          <CardHeader className="p-0 overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${title} screenshot`}
              data-ai-hint={dataAiHint || title.toLowerCase().split(" ").slice(0, 2).join(" ")}
              width={600}
              height={400}
              className="object-cover w-full aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
            />
          </CardHeader>
        )}
        <CardContent className="p-4 md:p-6 flex-grow">
          <CardTitle className="text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 md:p-6 pt-0 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            View Project
          </Button>
          {githubUrl && githubUrl !== "#" && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={handleGitHubClick}
              aria-label={`View ${title} on GitHub`}
            >
              <Github className="mr-1.5 h-4 w-4" />
              GitHub
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
