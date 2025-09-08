"use client";

import { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { ChevronLeft, Folder, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Podcast } from "@/types/type";
import dynamic from "next/dynamic";

const PodcastCard = dynamic(() => import("@/component/PodcastCard"), {
  ssr: false,
});

const VideoPlayer = dynamic(() => import("@/component/VideoPlayer"), {
  ssr: false,
});

const LoadingPage = dynamic(() => import("@/component/LoadingPage"), {
  ssr: false,
});

const InsidePlaylist = () => {
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [playlist, setPlaylist] = useState<Podcast[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!name) return;
    fetchPlaylist();
  }, [name]);

  const fetchPlaylist = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithToken(`/playlists/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch playlist", res.status);
        return;
      }

      const data: Podcast[] = await res.json();

      setPlaylist(data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePodcast = async (podcastId: string) => {
    if (!playlist) return;

    console.log(podcastId);

    try {
      const res = await fetchWithToken(`/playlists/${name}/podcast`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(podcastId),
      });

      if (!res.ok) {
        console.error("Failed to remove podcast", res.status);
        return;
      }

      fetchPlaylist();
    } catch (error) {
      console.error("Error removing podcast:", error);
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

      console.log("Topic Name", topicName);

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

  if (isLoading || !playlist) {
    return <LoadingPage title="Loading your playlist..." />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white p-6">
      <div className="relative z-10 p-6 mb-4 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-6 max-w-7xl mx-auto">
          <button
            className="group flex items-center justify-center w-12 h-12 bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10"
            onClick={() => router.push("/playlist")}
          >
            <ChevronLeft
              className="text-gray-400 group-hover:text-orange-400 group-hover:-translate-x-0.5 transition-all duration-300"
              size={24}
            />
          </button>

          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                {name}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {playlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlist.map((podcast) => (
            <div key={podcast.id} className="relative group">
              {/* Remove Button */}
              <button
                className="absolute top-2 right-2 z-10 bg-gray-800 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors duration-200"
                onClick={() => handleRemovePodcast(podcast.id)}
              >
                <X size={20} />
              </button>

              {/* Podcast Card */}
              <PodcastCard
                podcast={podcast}
                onPlayClick={(p) => {
                  setCurrentPodcast(p);
                }}
                onAddToPlaylist={() => {
                  console.log("Already in playlist");
                }}
                enablePlaylistBtn={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Folder className="mx-auto w-16 h-16 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">No Podcasts</h3>
          <p className="text-gray-400">Add some podcasts to this playlist.</p>
        </div>
      )}

      {/* Fullscreen video overlay */}
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
                onPlay={() =>
                  onPodcastPlay(currentPodcast, currentPodcast.topicName)
                }
                onProgressUpdate={(progress) =>
                  onProgressUpdate(
                    currentPodcast,
                    currentPodcast.topicName,
                    progress
                  )
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

export default InsidePlaylist;
