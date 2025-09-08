"use client";
import React, { useRef, useState } from "react";
import { Podcast } from "@/types/type";
import PodcastCard from "@/component/PodcastCard";
import VideoPlayer from "@/component/VideoPlayer";
import { X } from "lucide-react";
import { fetchWithToken } from "@/lib/fetchWithToken";

interface PodcastSliderProps {
  title: string;
  podcasts: Podcast[];
}

const PodcastSlider: React.FC<PodcastSliderProps> = ({ title, podcasts }) => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // adjust per card width
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleAddPodcastToHistory = async (
    podcast: Podcast,
    topicName: string,
    progress: number
  ) => {
    try {
      const watchHistoryItem = {
        podcastId: podcast.id,
        watchedAt: Date.now(),
        completed: progress >= 95,
        progress: progress,
        watchHistoryDTO: null, // you can remove this if it's not required or adjust based on your API expectations
      };

      const res = await fetchWithToken(`/watch-history/${topicName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchHistoryItem),
      });

      if (!res.ok) {
        console.error("Failed to add podcast to history", res.status);
        return;
      }

      console.log("Podcast history updated successfully");
    } catch (error) {
      console.error("Error adding podcast to history:", error);
    }
  };

  const onPodcastPlay = (podcast: Podcast, topicName: string) => {
    setCurrentPodcast(podcast);
    handleAddPodcastToHistory(podcast, topicName, 0); // starting with 0% progress
  };

  const onProgressUpdate = (
    podcast: Podcast,
    topicName: string,
    progress: number
  ) => {
    handleAddPodcastToHistory(podcast, topicName, progress);
  };

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &#8592;
          </button>
          <button
            onClick={scrollRight}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide"
      >
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="relative group">
            {/* Podcast Card */}
            <PodcastCard
              podcast={podcast}
              onPlayClick={(p) => setCurrentPodcast(p)}
              onAddToPlaylist={(p) => {
                console.log("In History");
              }}
              enablePlaylistBtn={false}
            />
          </div>
        ))}
      </div>

      {currentPodcast && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-3xl max-h-[90vh] bg-black">
            <button
              className="absolute top-0 right-0 text-2xl hover:text-orange-500"
              onClick={() => setCurrentPodcast(null)}
            >
              <X size={30} />
            </button>
            <div className="mb-8">
              <h3 className="text-xl sm:2xl font-semibold mb-4 text-orange-400">
                Now Playing
              </h3>
              <VideoPlayer
                videoId={currentPodcast.id}
                onPlay={() => onPodcastPlay(currentPodcast, title)}
                onProgressUpdate={(progress) =>
                  onProgressUpdate(currentPodcast, title, progress)
                }
              />
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-1">
                  {currentPodcast.title}
                </h4>
                <p className="text-gray-400">{currentPodcast.channel}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastSlider;