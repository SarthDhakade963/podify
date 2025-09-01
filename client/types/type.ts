export interface Topic {
  name: string;
  emoji: string;
  description: string;
}


export type Podcast = {
  id: string; // internal id (Mongo id) or fallback to videoId
  videoId: string;
  title: string;
  channelTitle: string;
  durationSec?: number;
  publishedAt?: string;
  thumbnailUrl: string;
  topic?: string;
  hasTranscript?: boolean;
  description?: string;
};