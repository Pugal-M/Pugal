
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  dataAiHint?: string;
}

export function ProjectCard({ id, title, description, imageUrl, dataAiHint }: ProjectCardProps) {
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
          <CardTitle className="text-lg md:text-xl mb-2 transition-colors">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 md:p-6 pt-0">
          <Button variant="outline" size="sm" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-colors">
            View Project
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
