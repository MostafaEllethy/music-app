import { useState, useEffect, useCallback, FormEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "redux-store";
import { nextSong, playPause, prevSong } from "../playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

export default memo(function MusicPlayer() {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useAppSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex, dispatch, currentSongs.length]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = useCallback(() => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  }, [currentIndex, currentSongs, dispatch, shuffle]);

  const handlePrevSong = useCallback(() => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  }, [currentIndex, currentSongs, dispatch, shuffle]);

  const handleTimeUpdate = useCallback(
    (event: FormEvent<HTMLAudioElement>) =>
      setAppTime(event.currentTarget.currentTime),
    []
  );
  const handleLoadedData = useCallback(
    (event: FormEvent<HTMLAudioElement>) =>
      setDuration(event.currentTarget.duration),
    []
  );

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-primary/20 to-secondary/20 w-full items-center justify-between text-body gap-4 z-50 h-24 backdrop-blur-xl
      px-4 sm:px-7"
    >
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
      <div className="flex-1 flex flex-col items-center justify-center select-none">
        <Controls
          isPlaying={isPlaying}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          setSeekTime={setSeekTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          onEnded={handleNextSong}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" setVolume={setVolume} />
    </div>
  );
});
