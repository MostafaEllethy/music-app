import { ArtistAttributes, Track } from "common/interfaces";
import { memo } from "react";
import { Link } from "react-router-dom";

export default memo(function DetailsHeader({
  artist,
  song,
}: {
  artist?: ArtistAttributes;
  song?: Track;
}) {
  return (
    <div
      className="flex items-center w-full select-none
        justify-center sm:justify-start 
        gap-3 sm:gap-5
        sm:px-7
        py-4 sm:py-6 md:py-7
        dark:bg-gradient-to-b dark:from-black/10 dark:to-black/50
        bg-gradient-to-br from-secondary/20 to-primary/50"
    >
      <img
        className="h-auto shadow-lg shadow-black rounded-full
        w-20 sm:w-32 md:w-44"
        src={artist ? artist?.artwork?.url : song?.images?.coverart}
        alt="artist"
      />
      <div className="flex flex-col gap-1">
        <h1
          className="font-black opacity-95 truncate
        text-4xl sm:text-6xl md:text-7xl xl:text-8xl"
        >
          {artist ? artist?.name : song?.title}
        </h1>
        {song?.artists && (
          <Link to={`/artists/${song?.artists[0]?.adamid}`}>
            <h2 className="font-medium truncate text-sm sm:text-base">
              {song.subtitle}
            </h2>
          </Link>
        )}
      </div>
    </div>
  );
});
