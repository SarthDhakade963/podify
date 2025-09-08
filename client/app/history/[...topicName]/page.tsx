"use client";

import { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { ChevronLeft, Folder, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Podcast } from "@/types/type";

const PodcastCard = dynamic(() => import("@/component/PodcastCard"), {
  ssr: false,
});

const VideoPlayer = dynamic(() => import("@/component/VideoPlayer"), {
  ssr: false,
});

const LoadingPage = dynamic(() => import("@/component/LoadingPage"), {
  ssr: false,
});

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const InsideHistory = () => {
  const params = useParams();
  const topicName = Array.isArray(params.topicName)
    ? params.topicName[0]
    : params.topicName;
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [history, setHistory] = useState<Podcast[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!topicName) return;
    fetchHistory();
  }, [topicName]);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithToken(`/watch-history/${topicName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch history", res.status);
        return;
      }

      const data: Podcast[] = await res.json();

      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
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
        watchHistoryDTO: null,
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
    handleAddPodcastToHistory(podcast, topicName, 0);
  };

  const onProgressUpdate = (
    podcast: Podcast,
    topicName: string,
    progress: number
  ) => {
    handleAddPodcastToHistory(podcast, topicName, progress);
  };

  if (isLoading || !history) {
    return <LoadingPage title="Loading your history..." />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400 rounded-full opacity-5 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-600 rounded-full opacity-8 blur-lg"></div>
      <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-orange-300 rounded-full opacity-3 blur-2xl"></div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 p-6 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-6 max-w-7xl mx-auto">
          <button
            className="group flex items-center justify-center w-12 h-12 bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10"
            onClick={() => router.push("/history")}
          >
            <ChevronLeft
              className="text-gray-400 group-hover:text-orange-400 group-hover:-translate-x-0.5 transition-all duration-300"
              size={24}
            />
          </button>

          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                {topicName}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {history.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {history.map((podcast) => (
                <div
                  key={podcast.id}
                  className="group relative transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
                    <PodcastCard
                      podcast={podcast}
                      onPlayClick={(p) => {
                        setCurrentPodcast(p);
                      }}
                      onAddToPlaylist={() => {
                        console.log("Already in history");
                      }}
                      enablePlaylistBtn={false}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full mx-auto flex items-center justify-center border-2 border-orange-500/30">
                <Folder className="w-16 h-16 text-orange-400" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              No Podcasts Watched
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Watch some podcasts on this Topic to build your history.
            </p>

            <Button
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold text-lg rounded-2xl hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
              onClick={() => router.push("/dashboard")}
            >
              Start Watching
            </Button>
          </div>
        )}
      </div>

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

export default InsideHistory;
