import { Loader, Error, SongCard } from "components";
import { GENRES } from "common/constants,";
import { useGetSongsByGenreQuery } from "features/shazam-core/shazamCoreAPI";
import { FormEvent, memo, useCallback, useState } from "react";

export default memo(function GenreSongs() {
  const [genre, setGenre] = useState("POP");
  const { data, isFetching, error } = useGetSongsByGenreQuery(genre);

  const handleOnChangeGenre = useCallback(
    (e: FormEvent<HTMLSelectElement>) => {
      setGenre(e.currentTarget.value);
    },
    [setGenre]
  );

  if (error) return <Error />;

  return (
    <section>
      <div className="flex gap-5 mb-7">
        <h2 className="font-bold text-3xl">Discover</h2>
        <select
          onChange={handleOnChangeGenre}
          value={genre}
          className="p-2 text-center rounded-lg outline-none bg-gradient-to-br from-primary/80 to-secondary/80 bg-base-200 font-bold"
        >
          {GENRES.map((g) => (
            <option key={g.value} value={g.value}>
              {g.title}
            </option>
          ))}
        </select>
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {data?.map((song, i) => (
            <SongCard key={song.key} song={song} i={i} data={data} />
          ))}
        </div>
      )}
    </section>
  );
});
