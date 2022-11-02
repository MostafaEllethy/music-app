import { Song } from "common/interfaces";
import { isArtistSong } from "common/utils";

const Track = ({
  isPlaying,
  isActive,
  activeSong,
}: {
  isPlaying: boolean;
  isActive: boolean;
  activeSong?: Song;
}) => {
  const isArtistSongFlag = isArtistSong(activeSong);

  return (
    <div className="flex-1 flex items-center justify-start min-w-0 select-none">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={
            isArtistSongFlag
              ? activeSong.attributes?.artwork.url
              : activeSong?.images?.coverart
          }
          alt="cover art"
          className="rounded-full min-w-[64px] w-auto"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <p className="truncate font-bold text-lg">
          {isArtistSongFlag ? activeSong.attributes?.name : activeSong?.title}
        </p>
        <p className="truncate">
          {isArtistSongFlag
            ? activeSong.attributes?.artistName
            : activeSong?.subtitle}
        </p>
      </div>
    </div>
  );
};

export default Track;
