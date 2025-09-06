"use client";

import YouTube, { YouTubeProps } from "react-youtube";
interface VideoPlayerProps {
  videoId: string;
}

// Video Player Component
const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
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

  const onReady: YouTubeProps["onReady"] = (event) => {
    console.log("YouTube player ready:", event.target);
  };

  const onError: YouTubeProps["onError"] = (event) => {
    console.error("YouTube player error:", event.data);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl w-full mb-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};

export default VideoPlayer;
