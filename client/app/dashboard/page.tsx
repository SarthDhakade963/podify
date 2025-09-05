"use client";
import { useEffect, useState } from "react";
import { Podcast } from "@/types/type";
import { fetchWithToken } from "@/lib/fetchWithToken";
import PodcastCard from "@/component/PodcastCard";
import ReactPlayer from "react-player";

interface PlayerProps {
  url: string;
}

export default function Dashboard() {
  const [podcasts, setPodcasts] = useState<Record<string, Podcast[]>>({});
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);

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

  return (
    <div className="p-6">
      {/* Player at the top */}
      {currentPodcast && (
        <div className="mb-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">
            Now Playing: {currentPodcast.title}
          </h2>
          {currentPodcast.videoUrl ? (
            <ReactPlayer
              url={currentPodcast.videoUrl}
              controls
              width="100%"
              height="200px"
            />
          ) : (
            <div className="text-center text-gray-500 py-6">
              Select a podcast to start playing 🎧
            </div>
          )}
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
