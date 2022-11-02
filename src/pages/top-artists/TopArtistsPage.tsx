import { Error, Loader } from "components";
import { useGetWorldChartsQuery } from "features/shazam-core/shazamCoreAPI";
import { memo } from "react";
import ArtistCard from "./ArtistCard";

export default memo(function TopArtistsPage() {
  const { data, error, isFetching } = useGetWorldChartsQuery();

  if (error) return <Error />;

  if (isFetching) return <Loader />;

  return (
    <div className="flex flex-col p-4">
      <h2 className="font-bold text-3xl mt-4 mb-10">Discover Artists</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {data?.map((track, i) => (
          <ArtistCard key={i} track={track} />
        ))}
      </div>
    </div>
  );
});
