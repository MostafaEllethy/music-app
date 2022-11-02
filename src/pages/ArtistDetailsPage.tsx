import { Error, Loader } from "components";
import DetailsHeader from "components/DetailsHeader";
import { ArtistSong } from "common/interfaces";
import { playPause, setActiveSong } from "features/player/playerSlice";
import { useGetArtistDetailsQuery } from "features/shazam-core/shazamCoreAPI";
import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "redux-store";
import SongBar from "../components/SongBar";

export default memo(function ArtistDetailsPage() {
  const dispatch = useAppDispatch();
  const { id = "" } = useParams();
  const { data, isFetching, error } = useGetArtistDetailsQuery(id);

  const songs = Object.values(data?.songs ?? {});

  const handlePlayClick = useCallback(
    (song: ArtistSong, i: number) => {
      dispatch(setActiveSong({ data: songs, i, song }));
      dispatch(playPause(true));
    },
    [dispatch, songs]
  );

  const handlePauseClick = useCallback(() => {
    dispatch(playPause(false));
  }, [dispatch]);

  if (error) return <Error />;

  if (isFetching) return <Loader />;

  const artist = data?.artists[id].attributes;

  return (
    <section className="flex flex-col dark:bg-gradient-to-br dark:from-primary dark:to-secondary">
      <DetailsHeader artist={artist} />

      <div className="w-full dark:bg-gradient-to-t from-black/80 to-black/60 p-4 pb-32">
        <h3 className="font-medium text-2xl opacity-90 mb-4">Tracks</h3>
        <div className="flex flex-col gap-3">
          {data &&
            songs.map((s, i) => (
              <SongBar
                key={i}
                handlePlay={handlePlayClick}
                handlePause={handlePauseClick}
                song={s}
                i={i}
              />
            ))}
        </div>
      </div>
    </section>
  );
});
