import { Song } from "common/interfaces";
import { isArtistSong } from "common/utils";
import { useRef, useEffect, ReactEventHandler } from "react";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: {
  activeSong?: Song;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  onEnded: ReactEventHandler<HTMLAudioElement>;
  onTimeUpdate: ReactEventHandler<HTMLAudioElement>;
  onLoadedData: ReactEventHandler<HTMLAudioElement>;
  repeat: boolean;
}) => {
  const ref = useRef<HTMLAudioElement>(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={
        isArtistSong(activeSong)
          ? activeSong.attributes?.previews?.[0].url
          : activeSong?.hub?.actions[1]?.uri
      }
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
