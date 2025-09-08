"use client";

const PodcastCard = dynamic(() => import("@/component/PodcastCard"), {
  ssr: false,
});

const VideoPlayer = dynamic(() => import("@/component/VideoPlayer"), {
  ssr: false,
});

const Sidebar = dynamic(() => import("@/component/Sidebar"), {
  ssr: false,
});
import LoadingPage from "@/component/LoadingPage";
import { Button } from "@/components/ui/button";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { Playlist, Podcast } from "@/types/type";
import { Dialog } from "@headlessui/react";
import { Menu, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface TopicRecommendationDTO {
  topicName: string;
  score: number;
}

export default function Dashboard() {
  const [podcasts, setPodcasts] = useState<Record<string, Podcast[]>>({});
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>();
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(
    null
  );
  const [isAddPodcastModalOpen, setIsAddPodcastModalOpen] = useState(false);
  const [topicName, setTopicName] = useState("");
  

  useEffect(() => {
    const fetchingPodcast = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchingPodcast();
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithToken("/playlists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch playlists", res.status);
        return;
      }

      const data: Playlist[] = await res.json();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetchWithToken(
          "/watch-history/recommendations?limit=12",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch recommendations", res.status);
          return;
        }

        const data: TopicRecommendationDTO[] = await res.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  const handleAddPodcastToPlaylist = async (playlistName: string) => {
    if (!selectedPodcastId) return;

    try {
      const res = await fetchWithToken(`/playlists/${playlistName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedPodcastId.replaceAll(/"/g, "").trim()),
      });

      if (!res.ok) {
        console.error("Failed to add podcast", res.status);
        return;
      }
      const data = await res.text();

      setIsAddPodcastModalOpen(false);
      setSelectedPodcastId(null);
    } catch (error) {
      console.error("Error adding podcast to playlist:", error);
    }
  };

  // Handle window resize to manage sidebar states
  useEffect(() => {
    const handleResize = () => {
      // Close mobile sidebar when resizing to desktop
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return <LoadingPage title={"Loading your Dashboard..."} />;
  }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400 rounded-full opacity-5 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-600 rounded-full opacity-8 blur-lg"></div>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div
        className={`relative z-10 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Sidebar Toggle Button */}

            <h2 className="text-2xl font-bold">
              {activeTab === "home" && "Discover Podcasts"}
              {activeTab === "playlist" && "My Playlists"}
              {activeTab === "history" && "Watch History"}
              {activeTab === "settings" && "Settings"}
            </h2>
          </div>

          <div className="text-sm text-gray-400">
            {Object.values(podcasts).flat().length} podcasts available
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {activeTab === "home" && (
            <>
              {/* Player Section */}
              {currentPodcast?.videoUrl ? (
                <div className="mb-8" ref={}>
                  <h3 className="text-xl sm:2xl font-semibold mb-4 text-orange-400">
                    Now Playing
                  </h3>
                  <VideoPlayer
                    videoId={currentPodcast.id}
                    onPlay={() => onPodcastPlay(currentPodcast, topicName)}
                    onProgressUpdate={(progress) =>
                      onProgressUpdate(currentPodcast, topicName, progress)
                    }
                  />
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {currentPodcast.title}
                    </h4>
                    <p className="text-gray-400">{currentPodcast.channel}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 mb-8 border-2 border-dashed border-gray-700 rounded-2xl">
                  <div className="text-6xl mb-4">🎧</div>
                  <p className="text-xl text-gray-400">
                    Select a podcast to start playing
                  </p>
                  <p className="text-gray-500 mt-2">
                    Your audio adventure awaits!
                  </p>
                </div>
              )}

              {/* Podcasts by Topic */}
              {sortedTopics.map((topic) => (
                <div key={topic} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-white">{topic}</h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {podcasts[topic].map((podcast) => (
                      <PodcastCard
                        key={podcast.id}
                        podcast={podcast}
                        onPlayClick={(p) => {
                          setCurrentPodcast(p);
                          setTopicName(topic);
                        }}
                        onAddToPlaylist={(p) => {
                          setSelectedPodcastId(p.id);
                          setIsAddPodcastModalOpen(true);
                        }}
                        enablePlaylistBtn={true}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <Dialog
                open={isAddPodcastModalOpen}
                onClose={() => setIsAddPodcastModalOpen(false)}
                className="relative z-50"
              >
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                  <Dialog.Panel className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full">
                    <Dialog.Title className="text-2xl font-bold text-white mb-4">
                      Add Podcast to Playlist
                    </Dialog.Title>

                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {playlists &&
                        playlists.map((playlist) => (
                          <div
                            key={playlist.id}
                            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-orange-500/20 cursor-pointer"
                            onClick={() =>
                              handleAddPodcastToPlaylist(playlist.name)
                            }
                          >
                            <span className="text-white">{playlist.name}</span>
                            <Play className="w-5 h-5 text-orange-400" />
                          </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddPodcastModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
