export interface Topic {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

// types/podcast.ts
export interface Podcast {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
  topicName: string;
  description: string;
  videoUrl: string;
  transcript?: string;
}

export interface Playlist {
  id: string;
  name: string;
  podcastIds: string[];
}

// Sidebar Types
export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

// Post card Props
export interface PostcardProps {
  podcast: Podcast;
  onPlayClick: (podcast: Podcast) => void;
  onAddToPlaylist: (podcast: Podcast) => void;
  enablePlaylistBtn: boolean;
}
