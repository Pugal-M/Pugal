
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  FastForward,
  Rewind,
  AlertTriangle,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CustomVideoPlayerProps {
  videoUrl: string;
  title?: string;
  description?: string;
  className?: string;
}

// Helper function to extract YouTube Video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  let videoId = null;
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'www.youtube.com') {
      if (parsedUrl.pathname === '/watch') {
        videoId = parsedUrl.searchParams.get('v');
      } else if (parsedUrl.pathname.startsWith('/embed/')) {
        videoId = parsedUrl.pathname.substring('/embed/'.length);
      }
    } else if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.substring(1); // Remove leading '/'
    }
  } catch (e) {
    // Invalid URL
    return null;
  }
  // Sanitize videoId: remove extra query parameters like 'si' from shared links
  if (videoId && videoId.includes('?')) {
    videoId = videoId.split('?')[0];
  }
  if (videoId && videoId.includes('&')) {
    videoId = videoId.split('&')[0];
  }
  return videoId;
}


export function CustomVideoPlayer({
  videoUrl,
  title,
  description,
  className,
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  let controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  if (!videoUrl) {
    return (
      <div className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center", className)}>
        <p className="text-white">Video URL is not available.</p>
      </div>
    );
  }
  
  const youtubeVideoId = getYouTubeVideoId(videoUrl);

  if (youtubeVideoId) {
    const iframeSrc = `https://www.youtube.com/embed/${youtubeVideoId}`;
    return (
      <div ref={playerRef} className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden group/player", className)}>
        <iframe
          src={iframeSrc}
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    );
  }

  // --- HTML5 Video Player Logic (if not YouTube) ---

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const togglePlayPause = useCallback(() => {
    if (videoError) return;
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          console.error("Error playing video:", err);
          setVideoError("Could not play the video. Please check the source.");
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [videoError]);

  const handleVolumeChange = (newVolume: number[]) => {
    if (videoRef.current) {
      const vol = newVolume[0];
      videoRef.current.volume = vol;
      setVolume(vol);
      setIsMuted(vol === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleProgressChange = (newProgress: number[]) => {
    if (videoRef.current) {
      const time = newProgress[0];
      videoRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
      if (videoRef.current.error) {
        handleVideoError(videoRef.current.error);
      }
    }
  };

  const handleVideoError = (errorEvent: MediaError | null) => {
    let errorMsg = "Error loading video.";
    if (errorEvent) {
      switch (errorEvent.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMsg = 'Video playback aborted.';
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMsg = 'A network error caused video download to fail.';
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMsg = 'Video playback aborted due to a corruption problem or because the video used features your browser did not support.';
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMsg = 'The video could not be loaded, either because the server or network failed or because the format is not supported.';
          break;
        default:
          errorMsg = 'An unknown error occurred while loading the video.';
          break;
      }
    }
    setVideoError(errorMsg);
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoError(null); // Reset error if metadata loads successfully
    }
  };

  const toggleFullScreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => {
        // Consider a more user-friendly way to show this error, e.g., a toast
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime += seconds;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    const onErrorListener = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      handleVideoError(target.error);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', onErrorListener);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', onErrorListener);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [videoUrl]); 

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);


  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    if (isPlaying && !videoError) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying && !videoError) {
      setShowControls(false);
    }
  };

  useEffect(() => {
    if (!isPlaying || videoError) {
      setShowControls(true);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    } else {
      // If playing and no error, mouse move will handle showing controls
      // and then hiding them after a timeout.
      // Call handleMouseMove to ensure controls are shown initially if needed.
      handleMouseMove(); 
    }
  }, [isPlaying, videoError]);


  return (
    <div
      ref={playerRef}
      className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden group/player", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onClick={togglePlayPause}
        onDoubleClick={toggleFullScreen}
        // Ensure metadata is loaded for duration and error handling
        onLoadedMetadata={handleLoadedMetadata} 
        onError={(e) => handleVideoError((e.target as HTMLVideoElement).error)}
      />
      {videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 z-10">
          <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
          <p className="text-base font-semibold">Video Playback Error</p>
          <p className="text-sm text-center text-gray-300 mt-1">{videoError}</p>
        </div>
      )}
      {!videoError && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between p-3 sm:p-4 transition-opacity duration-300 ease-in-out",
            showControls ? "opacity-100" : "opacity-0 group-hover/player:opacity-100"
          )}
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.6) 100%)' }}
        >
          {(title || description) && (
            <div className="text-white text-shadow select-none">
              {title && <h3 className="text-base sm:text-lg font-semibold truncate">{title}</h3>}
              {description && <p className="text-xs sm:text-sm text-gray-300 truncate">{description}</p>}
            </div>
          )}
          <div className="flex-grow" /> {/* Spacer */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-white text-xs font-mono select-none">
                {formatTime(progress)}
              </span>
              <Slider
                min={0}
                max={duration || 100} // Fallback max if duration is 0
                step={1}
                value={[progress]}
                onValueChange={handleProgressChange}
                className="w-full custom-video-timeline"
                aria-label="Video progress"
                disabled={!!videoError || duration === 0}
              />
              <span className="text-white text-xs font-mono select-none">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(-10)}
                  className="text-white hover:bg-white/10 hover:text-white"
                  aria-label="Rewind 10 seconds"
                  disabled={!!videoError || duration === 0}
                >
                  <Rewind className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayPause}
                  className="text-white hover:bg-white/10 hover:text-white"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  disabled={!!videoError || duration === 0}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(10)}
                  className="text-white hover:bg-white/10 hover:text-white"
                  aria-label="Fast-forward 10 seconds"
                  disabled={!!videoError || duration === 0}
                >
                  <FastForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/10 hover:text-white"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  disabled={!!videoError || duration === 0}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  className="w-16 sm:w-24 custom-video-volume-slider"
                  aria-label="Volume"
                  disabled={!!videoError || duration === 0}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullScreen}
                  className="text-white hover:bg-white/10 hover:text-white"
                  aria-label={isFullScreen ? "Exit full screen" : "Full screen"}
                  disabled={!!videoError || duration === 0}
                >
                  {isFullScreen ? (
                    <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
