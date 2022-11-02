import { Error, Loader } from "components";
import DetailsHeader from "components/DetailsHeader";
import { Track } from "common/interfaces";
import SongBar from "components/SongBar";
import { playPause, setActiveSong } from "features/player/playerSlice";
import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from "features/shazam-core/shazamCoreAPI";
import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "redux-store";

export default memo(function SongDetailsPage() {
  const dispatch = useAppDispatch();
  const { id = "" } = useParams();
  const {
    data: songData,
    isFetching: isSongDetailsFetching,
    error: songDetailsError,
  } = useGetSongDetailsQuery(id);
  const {
    data: relatedSongs = [],
    isFetching: relatedSongsFetching,
    error: relatedSongError,
  } = useGetRelatedSongsQuery(id);

  const handlePlayClick = useCallback(
    (song: Track, i: number) => {
      dispatch(setActiveSong({ song, data: relatedSongs, i }));
      dispatch(playPause(true));
    },
    [relatedSongs, dispatch]
  );

  const handlePauseClick = useCallback(() => {
    dispatch(playPause(false));
  }, [dispatch]);

  if (songDetailsError || relatedSongError) return <Error />;

  if (isSongDetailsFetching || relatedSongsFetching) return <Loader />;

  return (
    <section className="flex flex-col dark:bg-gradient-to-br dark:from-primary dark:to-secondary">
      <DetailsHeader song={songData} />
      <div className="w-full dark:bg-gradient-to-t from-black/80 to-black/60 p-4 pb-32">
        <h3 className="font-medium text-2xl opacity-90 mb-4">Tracks</h3>
        <div className="flex flex-col gap-3">
          {relatedSongs.map((song, i) => (
            <SongBar
              key={i}
              handlePlay={handlePlayClick}
              handlePause={handlePauseClick}
              song={song}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
