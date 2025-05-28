
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null; // Allow imageUrl to be optional or null
  dataAiHint?: string;
}

export function ProjectCard({ id, title, description, imageUrl, dataAiHint }: ProjectCardProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // This function can be used if specific actions are needed before navigation,
    // or to stop propagation if there were interactive elements inside the Link.
    // For now, it's just a placeholder for a standard Link click.
  };

  return (
    <Link
      href={`/project/${id}`}
      passHref
      className="block h-full group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`View details for project ${title}`}
      onClick={handleLinkClick}
    >
      <Card className="overflow-hidden bg-card border border-border/50 transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-lg hover:scale-[1.02] relative">
        {imageUrl && ( // Conditionally render CardHeader and Image
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
        {/* Overlay for hover effect (no text) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100">
          {/* Removed the "Click to view project" text */}
        </div>
      </Card>
    </Link>
  );
}
