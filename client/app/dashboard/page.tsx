"use client";
import { useEffect, useState } from "react";
import { Podcast } from "@/types/type";
import { fetchWithToken } from "@/lib/fetchWithToken";
import PodcastCard from "@/component/PodcastCard";
import ReactPlayer from "react-player";
import VideoPlayer from "@/component/VideoPlayer";
import { url } from "inspector";

interface PlayerProps {
  url: string;
}

export default function Dashboard() {
  const [podcasts, setPodcasts] = useState<Record<string, Podcast[]>>({});
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    if (currentPodcast?.videoUrl) {
      console.log("Now trying to play:", currentPodcast.videoUrl);
    }
  }, [currentPodcast]);

  useEffect(() => {
    const fetchingPodcast = async () => {
      try {
        const res = await fetchWithToken("/podcasts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch podcasts", res.status);
          return;
        }

        const data: Record<string, Podcast[]> = await res.json();

        console.log(data);

        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchingPodcast();
  }, []);

  console.log("Currently playing podcast : ", currentPodcast);

  return (
    <div className="p-6">
      {/* Player at the top */}
      {currentPodcast?.videoUrl ? (
        <VideoPlayer videoId={currentPodcast.id} />
      ) : (
        <div className="text-center text-gray-500 py-6">
          Select a podcast to start playing 🎧
        </div>
      )}

      {/* Topic-wise podcasts */}
      {Object.entries(podcasts).map(([topic, list]) => (
        <div key={topic} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{topic}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {list.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onPlayClick={(p) => setCurrentPodcast(p)}
                onAddToPlaylist={(p) => console.log("Add", p)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
