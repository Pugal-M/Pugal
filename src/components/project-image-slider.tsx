
'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  // CarouselNext, // Removed import
  // CarouselPrevious, // Removed import
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface ProjectImageSliderProps {
  images: string[];
  altPrefix: string;
  dataAiHint?: string;
}

export function ProjectImageSlider({ images, altPrefix, dataAiHint }: ProjectImageSliderProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false }) // Changed options here
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    }

    api.on("select", onSelect);
    api.on("reInit", onReInit);
    
    // Cleanup
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);
  
  const displayImages = images && images.length > 0 ? images : ['https://picsum.photos/seed/placeholder/800/600'];

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className="relative w-full aspect-video rounded-md overflow-hidden mb-6 shadow-md bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full mb-6">
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        setApi={setApi}
        className="w-full shadow-md rounded-lg overflow-hidden"
      >
        <CarouselContent>
          {displayImages.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-video">
                <Image
                  src={src}
                  alt={`${altPrefix} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                  data-ai-hint={dataAiHint || altPrefix.toLowerCase().split(" ").slice(0,2).join(" ")}
                  priority={index === 0} 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Removed CarouselPrevious and CarouselNext */}
      </Carousel>
      {/* Dots Indicator */}
      {api && displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 z-20 p-1.5 bg-card/30 backdrop-blur-sm rounded-full">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-1 ring-offset-card/30",
                index === current ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/60 hover:bg-muted-foreground"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

