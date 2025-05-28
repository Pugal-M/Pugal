
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
  let controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

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
        setVolume(0.5); // Restore to a default volume if unmuting from 0
        videoRef.current.volume = 0.5;
      } else if (newMutedState) {
         // setVolume(0); // No, keep original volume so unmuting restores it
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
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const toggleFullScreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };
  
  useEffect(() => {
    // Show controls when video is paused
    if (!isPlaying) {
      setShowControls(true);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    } else {
      // If playing, start timer to hide controls
      handleMouseMove(); 
    }
  }, [isPlaying]);


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
      />
      <div 
        className={cn(
          "absolute inset-0 flex flex-col justify-between p-3 sm:p-4 transition-opacity duration-300 ease-in-out",
          showControls ? "opacity-100" : "opacity-0 group-hover/player:opacity-100"
        )}
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.6) 100%)' }}
      >
        {/* Top Info (Title/Description) */}
        {(title || description) && (
          <div className="text-white text-shadow select-none">
            {title && <h3 className="text-base sm:text-lg font-semibold truncate">{title}</h3>}
            {description && <p className="text-xs sm:text-sm text-gray-300 truncate">{description}</p>}
          </div>
        )}

        {/* Spacer to push controls to bottom */}
        <div className="flex-grow" />

        {/* Controls */}
        <div className="space-y-2">
          {/* Timeline */}
          <div className="flex items-center gap-2">
            <span className="text-white text-xs font-mono select-none">
              {formatTime(progress)}
            </span>
            <Slider
              min={0}
              max={duration}
              step={1}
              value={[progress]}
              onValueChange={handleProgressChange}
              className="w-full custom-video-timeline"
              aria-label="Video progress"
            />
            <span className="text-white text-xs font-mono select-none">
              {formatTime(duration)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSkip(-10)}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label="Rewind 10 seconds"
              >
                <Rewind className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label={isPlaying ? "Pause" : "Play"}
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
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullScreen}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label={isFullScreen ? "Exit full screen" : "Full screen"}
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
    </div>
  );
}
