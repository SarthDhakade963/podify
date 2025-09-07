"use client";

import { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { Folder, X } from "lucide-react";
import { useParams } from "next/navigation";
import { Podcast } from "@/types/type";
import PodcastCard from "@/component/PodcastCard";
import VideoPlayer from "@/component/VideoPlayer";
import LoadingPage from "@/component/LoadingPage";

const InsidePlaylist = () => {
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [playlist, setPlaylist] = useState<Podcast[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading || !playlist) {
    return <LoadingPage title="Loading your playlist..." />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        📂 {name}
      </h1>

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
                onPlayClick={(p) => setCurrentPodcast(p)}
                onAddToPlaylist={(p) => {
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
              <VideoPlayer videoId={currentPodcast.id} />
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
