export interface Topic {
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
