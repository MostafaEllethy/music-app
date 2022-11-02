import { Track } from "common/interfaces";
import { isArtistSong } from "common/utils";
import { playPause, setActiveSong } from "features/player/playerSlice";
import { memo, useCallback, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux-store";
import PlayPause from "./PlayPause";

export default memo(function SongCard({
  song,
  i,
  data,
}: {
  song: Track;
  i: number;
  data: Array<Track>;
}) {
  const dispatch = useAppDispatch();
  const { activeSong } = useAppSelector((state) => state.player);

  const handlePlayClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      dispatch(setActiveSong({ data: data, i: i, song: song }));
      dispatch(playPause(true));
    },
    [dispatch, data, i, song]
  );

  const handlePauseClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      dispatch(playPause(false));
    },
    [dispatch]
  );

  return (
    <div
      className="w-52 inline-flex bg-white/5 bg-opacity-80 animate-slideup cursor-pointer rounded p-3 flex-col group border dark:border-none"
      title={song.title}
    >
      <Link
        to={`/songs/${song.key}`}
        className="block relative w-full select-none"
      >
        <div
          className={`flex rounded absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:opacity-100 transition-all duration-300 ${
            !isArtistSong(activeSong) && activeSong?.title === song.title
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <PlayPause
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            song={song}
          />
        </div>
        <img src={song.images?.coverart} alt={song.title} className="rounded" />
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        <Link to={`/songs/${song.key}`}>
          <h2 className="font-bold truncate">{song.title}</h2>
        </Link>
        <Link to={`/artists/${song?.artists?.[0]?.adamid}`}>
          <h4 className="text-sm truncate">{song.subtitle}</h4>
        </Link>
      </div>
    </div>
  );
});
