import { Track } from "common/interfaces";
import { isArtistSong } from "common/utils";
import { memo, MouseEventHandler } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useAppSelector } from "redux-store";

function PlayPause({
  handlePlay,
  handlePause,
  song,
}: {
  handlePlay: MouseEventHandler<SVGSVGElement>;
  handlePause: MouseEventHandler<SVGSVGElement>;
  song: Track;
}) {
  const { isPlaying, activeSong } = useAppSelector((state) => state.player);
  return (
    <div className="text-white/80">
      {isPlaying &&
      !isArtistSong(activeSong) &&
      activeSong?.title === song.title ? (
        <FaPauseCircle size={38} onClick={handlePause} />
      ) : (
        <FaPlayCircle size={38} onClick={handlePlay} />
      )}
    </div>
  );
}

export default memo(PlayPause);
