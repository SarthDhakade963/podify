declare module "react-player" {
  import * as React from "react";

  export interface ReactPlayerProps {
    url?: string | string[];
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    volume?: number;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onError?: (
      error: unknown,
      data?: unknown,
      hlsInstance?: unknown,
      hlsGlobal?: unknown
    ) => void;
  }

  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
