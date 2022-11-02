import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";
import { SetStateAction, Dispatch, MouseEventHandler } from "react";
import { ArtistSong, Song } from "common/interfaces";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: Dispatch<SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
  currentSongs: Array<Song | ArtistSong>;
  handlePlayPause: MouseEventHandler;
  handlePrevSong: MouseEventHandler;
  handleNextSong: MouseEventHandler;
}) => (
  <div className="flex items-center justify-around sm:gap-3 h-11">
    <BsArrowRepeat
      size={24}
      onClick={() => setRepeat((prev) => !prev)}
      className={`hidden sm:block cursor-pointer ${
        repeat ? "text-accent" : ""
      }`}
    />
    {currentSongs?.length && (
      <MdSkipPrevious
        size={32}
        className="cursor-pointer"
        onClick={handlePrevSong}
      />
    )}
    {isPlaying ? (
      <BsFillPauseFill
        size={48}
        className="cursor-pointer"
        onClick={handlePlayPause}
      />
    ) : (
      <BsFillPlayFill
        size={48}
        onClick={handlePlayPause}
        className="cursor-pointer"
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        size={32}
        className="cursor-pointer"
        onClick={handleNextSong}
      />
    )}
    <BsShuffle
      size={24}
      onClick={() => setShuffle((prev) => !prev)}
      className={`hidden sm:block cursor-pointer ${
        shuffle ? "text-accent" : ""
      }`}
    />
  </div>
);

export default Controls;
