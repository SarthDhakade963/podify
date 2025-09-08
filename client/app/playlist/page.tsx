"use client";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@headlessui/react";
import { Plus, Music, X, Folder, Play, Menu } from "lucide-react";
import { Playlist } from "@/types/type";


const LoadingPage = dynamic(() => import("@/component/LoadingPage"), {
  ssr: false,
});
import dynamic from "next/dynamic";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const router = useRouter();

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

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const res = await fetchWithToken("/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlaylistName.replace(/"/g, "").trim()),
      });

      if (!res.ok) {
        console.error("Failed to create playlist", res.status);
        return;
      }

      const newPlaylist: Playlist = await res.json();
      setPlaylists([...playlists, newPlaylist]);
      setIsModalOpen(false);
      setNewPlaylistName("");
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  if (isLoading) {
    return <LoadingPage title={"Loading your playists..."} />;
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white transition-all duration-300 ease-in-out`}
    >
      {/* Main Content with dynamic margin */}
      <div
        className={`transition-all duration-300 ease-in-out  ${
          // No margin on mobile when sidebar is closed
          sidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400 rounded-full opacity-5 blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-600 rounded-full opacity-8 blur-lg"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-orange-300 rounded-full opacity-3 blur-2xl"></div>

        {/* Content Area */}
        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  🎵 My Playlists
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                <p className="text-xl text-gray-300 mt-4">
                  Organize your favorite podcasts into custom collections
                </p>
              </div>

              {playlists.length > 0 && (
                <Button
                  className="group px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-2xl hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Create Playlist
                </Button>
              )}
            </div>
          </div>

          {/* Empty State */}
          {playlists.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full mx-auto flex items-center justify-center border-2 border-orange-500/30">
                  <Music className="w-16 h-16 text-orange-400" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Create Your First Playlist
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                Start organizing your favorite podcasts into personalized
                collections for easy access
              </p>

              <Button
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold text-lg rounded-2xl hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Create Your First Playlist
              </Button>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                <div className="text-center p-6 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800">
                  <div className="text-4xl mb-3">🎧</div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Organize
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Group podcasts by topic, mood, or any way you like
                  </p>
                </div>

                <div className="text-center p-6 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800">
                  <div className="text-4xl mb-3">⚡</div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Quick Access
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Find and play your favorite content instantly
                  </p>
                </div>

                <div className="text-center p-6 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800">
                  <div className="text-4xl mb-3">🔄</div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Sync Everywhere
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Access your playlists on any device
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Playlists Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group cursor-pointer p-6 bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10"
                  onClick={() => router.push(`/playlist/${playlist.name}`)}
                >
                  {/* Playlist Icon */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl mx-auto flex items-center justify-center border-2 border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300">
                      <Folder className="w-10 h-10 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                    </div>

                    {/* Play overlay on hover */}
                    <div className="absolute inset-0 bg-orange-500/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-black ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Playlist Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                      {playlist.name}
                    </h3>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <Music className="w-4 h-4" />
                      <span>{playlist.podcastIds.length} podcasts</span>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-1 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (playlist.podcastIds.length / 10) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          )}

          {/* Create Playlist Modal */}
          <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <Dialog.Panel className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl mx-auto flex items-center justify-center border-2 border-orange-500/30 mb-4">
                    <Plus className="w-8 h-8 text-orange-400" />
                  </div>

                  <Dialog.Title className="text-2xl font-bold text-white mb-2">
                    Create New Playlist
                  </Dialog.Title>
                  <p className="text-gray-400">
                    Give your playlist a memorable name
                  </p>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Enter playlist name..."
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                    autoFocus
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleCreatePlaylist()
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreatePlaylist}
                    disabled={!newPlaylistName.trim()}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold hover:from-orange-400 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 transition-all duration-300"
                  >
                    Create Playlist
                  </Button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}