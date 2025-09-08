"use client";

import { Button } from "@/components/ui/button";
import { PostcardProps } from "@/types/type";
import { Play } from "lucide-react";
import Image from "next/image";

// Podcast Card Component
const PodcastCard = ({
  podcast,
  onPlayClick,
  onAddToPlaylist,
  enablePlaylistBtn,
}: PostcardProps) => {
  return (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 shadow-xl rounded-2xl p-4 flex flex-col hover:border-orange-500/50 transition-all duration-300 group hover:transform hover:scale-105">
      <div className="relative overflow-hidden rounded-xl mb-3">
        <Image
          src={podcast.thumbnail}
          alt={podcast.title}
          width={400}
          height={200}
          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>

      <h3 className="text-white text-lg font-semibold mb-1 line-clamp-2 group-hover:text-orange-400 transition-colors">
        {podcast.title}
      </h3>
      <p className="text-gray-400 text-sm mb-1">{podcast.channel}</p>
      <p className="text-gray-500 text-xs mb-4">{podcast.duration}</p>

      <div className="mt-auto flex gap-2">
        <Button
          size="sm"
          onClick={() => onPlayClick(podcast)}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold hover:from-orange-400 hover:to-orange-500 transition-all duration-300"
        >
          <Play className="w-4 h-4 mr-1" /> Play
        </Button>
        {enablePlaylistBtn && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddToPlaylist(podcast)}
            className="border-gray-500 text-gray-500 hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300"
          >
            + Playlist
          </Button>
        )}
      </div>
    </div>
  );
};

export default PodcastCard;
