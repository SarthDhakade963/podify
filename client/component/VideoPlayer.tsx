"use client";

import YouTube, { YouTubeProps } from "react-youtube";

interface VideoPlayerProps {
  videoId: string; // YouTube video ID, e.g., "qHl3st9tlSE"
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  // Player options
  const opts: YouTubeProps["opts"] = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1, // 0 = don't autoplay, 1 = autoplay
      controls: 1, // show controls
      modestbranding: 1, // hides YouTube logo
      rel: 0, // prevents showing related videos
    },
  };

  // Example: event handler when video is ready
  const onReady: YouTubeProps["onReady"] = (event) => {
    console.log("YouTube player ready:", event.target);
  };

  const onError: YouTubeProps["onError"] = (event) => {
    console.error("YouTube player error:", event.data);
  };

  console.log("Now trying to play via react-youtube:", videoId);

  return (
    <div className="rounded-2xl overflow-hidden shadow-md w-full h-[500px] mb-4">
      <YouTube videoId={videoId} opts={opts} onReady={onReady} onError={onError} />
    </div>
  );
};

export default VideoPlayer;
