'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
  description: string;
}

export function ShareButton({ title, description }: ShareButtonProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration,
    // making window and navigator available.
    setIsClient(true);
  }, []);

  const handleShare = async () => {
    // Guard against being called on the server or before hydration.
    if (typeof window === 'undefined') return;
    const currentUrl = window.location.href;
    
    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: currentUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // User might have cancelled the share, so we don't show an error toast.
      }
    } else { // Fallback to copying the link
      try {
        await navigator.clipboard.writeText(currentUrl);
        toast({
          title: 'Link Copied!',
          description: 'The project link has been copied to your clipboard.',
        });
      } catch (error) {
        console.error('Failed to copy:', error);
        toast({
          variant: 'destructive',
          title: 'Copy Failed',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  // Don't render the button on the server or before hydration is complete
  if (!isClient) {
    return null;
  }
  
  const canShareNatively = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2"
    >
      {canShareNatively ? (
        <Share2 className="w-5 h-5" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
      {canShareNatively ? 'Share' : 'Copy Link'}
    </Button>
  );
}
