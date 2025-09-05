// components/PodcastCard.tsx
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Podcast } from "@/types/type";

interface Props {
  podcast: Podcast;
  onPlayClick: (podcast: Podcast) => void;
  onAddToPlaylist: (podcast: Podcast) => void;
}

export default function PodcastCard({
  podcast,
  onPlayClick,
  onAddToPlaylist,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 flex flex-col">
      <Image
        src={podcast.thumbnail}
        alt={podcast.title}
        width={400}
        height={200}
        className="rounded-xl w-full h-40 object-cover"
      />
      <h3 className="mt-2 text-lg font-semibold">{podcast.title}</h3>
      <p className="text-sm text-gray-500">{podcast.channel}</p>
      <p className="text-xs text-gray-400">{podcast.duration}</p>

      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => onPlayClick(podcast)}>
          <Play className="w-4 h-4 mr-1" /> Play
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAddToPlaylist(podcast)}
        >
          + Playlist
        </Button>
      </div>
    </div>
  );
}
