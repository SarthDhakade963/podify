"use client";

import ReactPlayer, { ReactPlayerProps } from "react-player";

interface PlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: PlayerProps) {
  return <ReactPlayer url={url} controls width="100%" height="200px" />;
}
