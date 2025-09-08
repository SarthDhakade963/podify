"use client";

import { fetchWithToken } from "@/lib/fetchWithToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Topic } from "@/types/type";
import dynamic from "next/dynamic";
import { Folder, Music, Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoadingPage = dynamic(() => import("@/component/LoadingPage"), {
  ssr: false,
});

export default function HistoryPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithToken("/topic", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch topics", res.status);
        return;
      }

      const data: Topic[] = await res.json();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage title="Loading your history..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white p-6">
      <div
        className={`transition-all duration-300 ease-in-out  ${
          // No margin on mobile when sidebar is closed
          sidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                🎵 My History
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              <p className="text-xl text-gray-300 mt-4">
                Organized your Watched Content by Topic
              </p>
            </div>
          </div>
        </div>

        {topics.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full mx-auto flex items-center justify-center border-2 border-orange-500/30">
                <Music className="w-16 h-16 text-orange-400" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-gray-400 text-lg">
              You have not watched any podcasts yet.
            </p>

            <button onClick={() => router.push("/dashboard")}>
              Watch a Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="group cursor-pointer p-6 bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10"
                onClick={() => router.push(`/history/${topic.name}`)}
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
                    {topic.name}
                  </h3>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
