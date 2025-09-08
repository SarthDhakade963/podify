"use client";

import { useEffect, useRef } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
  onPlay: () => void;
  onProgressUpdate: (progress: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  onPlay,
  onProgressUpdate,
}) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start or stop progress tracking based on player state
  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const player = event.target;
    playerRef.current = player;

    if (event.data === 1) {
      // Playing
      onPlay();
      startTracking();
    } else {
      // Paused or ended
      stopTracking();
    }
  };

  const startTracking = () => {
    if (intervalRef.current) return; // avoid multiple intervals
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0) {
          const progress = (currentTime / duration) * 100;
          onProgressUpdate(Math.floor(progress));
        }
      }
    }, 1000); // check every second
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopTracking();
    };
  }, []);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    console.log("YouTube player ready");
  };

  const onError: YouTubeProps["onError"] = (event) => {
    console.error("YouTube player error:", event.data);
  };

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl w-full mb-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        onError={onError}
      />
    </div>
  );
};

export default VideoPlayer;
