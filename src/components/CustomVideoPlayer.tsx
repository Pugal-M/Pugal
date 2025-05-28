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

// Helper function to extract YouTube Video ID
function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    let videoId = null;
    if (parsedUrl.hostname.includes('youtube.com')) {
      if (parsedUrl.pathname === '/watch') {
        videoId = parsedUrl.searchParams.get('v');
      } else if (parsedUrl.pathname.startsWith('/embed/')) {
        videoId = parsedUrl.pathname.substring('/embed/'.length);
      }
    } else if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.substring(1);
    }

    if (videoId && videoId.includes('?')) videoId = videoId.split('?')[0];
    if (videoId && videoId.includes('&')) videoId = videoId.split('&')[0];
    return videoId;
  } catch (e) {
    return null;
  }
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
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const youtubeVideoId = getYouTubeVideoId(videoUrl);

  if (!videoUrl) {
    return (
      <div className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center", className)}>
        <p className="text-white">Video URL is not available.</p>
      </div>
    );
  }

  if (youtubeVideoId) {
    const iframeSrc = `https://www.youtube.com/embed/${youtubeVideoId}`;
    return (
      <div ref={playerRef} className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden", className)}>
        <iframe
          src={iframeSrc}
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    );
  }

  if (videoUrl.includes('youtube') && !youtubeVideoId) {
    return (
      <div className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center", className)}>
        <p className="text-white">Unsupported or invalid YouTube URL format.</p>
      </div>
    );
  }

  // --- Local/MP4 video playback logic ---

  const formatTime = (time: number) => `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`;

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => setVideoError("Could not play the video. Please check the source."));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
      setIsMuted(vol === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const muted = !videoRef.current.muted;
      videoRef.current.muted = muted;
      setIsMuted(muted);
      if (!muted && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleProgressChange = (newProgress: number[]) => {
    const time = newProgress[0];
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const handleVideoError = (error: MediaError | null) => {
    const errorMsg = error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
      ? 'Unsupported video format or URL.'
      : 'An error occurred while loading the video.';
    setVideoError(errorMsg);
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoError(null);
    }
  };

  const toggleFullScreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
      if (videoRef.current.error) handleVideoError(videoRef.current.error);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    if (isPlaying && !videoError) {
      controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
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
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    } else {
      handleMouseMove();
    }
  }, [isPlaying, videoError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onError = () => handleVideoError(video.error);

    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
    video.addEventListener('ended', () => setIsPlaying(false));
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
      video.removeEventListener('ended', () => setIsPlaying(false));
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', onError);
    };
  }, [videoUrl]);

  useEffect(() => {
    const onFullScreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);

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
      {videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 z-10">
          <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
          <p className="text-base font-semibold">Video Playback Error</p>
          <p className="text-sm text-center text-gray-300 mt-1">{videoError}</p>
        </div>
      )}
      {!videoError && showControls && (
        <div
          className="absolute inset-0 flex flex-col justify-between p-4"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
        >
          {(title || description) && (
            <div className="text-white select-none">
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              {description && <p className="text-sm text-gray-300">{description}</p>}
            </div>
          )}
          <div className="flex-grow" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-white text-xs font-mono">{formatTime(progress)}</span>
              <Slider
                min={0}
                max={duration || 100}
                step={1}
                value={[progress]}
                onValueChange={handleProgressChange}
                className="w-full"
              />
              <span className="text-white text-xs font-mono">{formatTime(duration)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleSkip(-10)}>
                  <Rewind className="text-white w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="text-white w-6 h-6" /> : <Play className="text-white w-6 h-6" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSkip(10)}>
                  <FastForward className="text-white w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
                </Button>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
                <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
                  {isFullScreen ? <Minimize className="text-white" /> : <Maximize className="text-white" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
