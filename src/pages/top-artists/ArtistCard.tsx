import { Track } from "common/interfaces";
import { memo } from "react";
import { Link } from "react-router-dom";

export default memo(function ArtistCard({ track }: { track: Track }) {
  return (
    <Link
      className="flex flex-col w-60 p-4 bg-white/5 bg-opacity-80 border dark:border-transparent animate-slideup rounded-lg"
      to={`/artists/${track?.artists[0].adamid}`}
    >
      <img
        src={track?.images?.coverart}
        className="w-full h-56 rounded-lg"
        alt="artist"
      />
      <p className="mt-4 font-semibold text-lg truncate">
        {track?.subtitle}
      </p>
    </Link>
  );
});
