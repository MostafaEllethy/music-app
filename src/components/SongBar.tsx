import { memo, MouseEventHandler } from "react";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import { isArtistSong } from "common/utils";
import { useAppSelector } from "redux-store";
import { Song } from "common/interfaces";

export default memo(function SongBar({
  i,
  handlePlay,
  handlePause,
  song,
}: {
  i: number;
  handlePlay: Function;
  handlePause: MouseEventHandler;
  song: Song;
}) {
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);

  const isArtist = isArtistSong(song);

  return (
    <div
      className="flex items-center gap-4 hover:bg-black/5 dark:hover:bg-white/10 rounded px-3 py-2 max-w-full sm:max-w-xl select-none group"
      key={i}
    >
      <span className="text-gray-500 dark:text-gray-300">{i + 1}</span>
      <img
        src={isArtist ? song.attributes?.artwork.url : song.images?.coverart}
        alt="song cover"
        className="rounded-sm w-14 h-14"
      />
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h2 className="font-semibold text-lg opacity-95 truncate">
          {isArtist ? song.attributes?.name : song.title}
        </h2>
        <h3 className="text-sm text-gray-500 dark:text-gray-300 truncate">
          {isArtist ? song.attributes?.albumName : song.subtitle}
        </h3>
      </div>

      <div className="rounded-full bg-gradient-to-tr from-primary/50 to-secondary/50 p-1 hover:cursor-pointer opacity-80 hover:opacity-100">
        {isPlaying &&
        (isArtistSong(activeSong)
          ? isArtist && activeSong.attributes?.name === song.attributes?.name
          : !isArtist && activeSong?.title === song.title) ? (
          <BiPauseCircle size={28} onClick={handlePause} />
        ) : (
          <BiPlayCircle size={28} onClick={() => handlePlay(song, i)} />
        )}
      </div>
    </div>
  );
});
