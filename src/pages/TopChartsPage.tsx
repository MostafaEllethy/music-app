import { Error, Loader, SongCard } from "components";
import { useGetWorldChartsQuery } from "features/shazam-core/shazamCoreAPI";
import { memo } from "react";

export default memo(function TopCharts() {
  const { data, error, isFetching } = useGetWorldChartsQuery();

  if (error) return <Error />;

  if (isFetching) return <Loader />;

  return (
    <div className="flex flex-col p-4">
      <h2 className="font-bold text-3xl mt-4 mb-10">Discover Top Charts</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard key={i} song={song} data={data} i={i} />
        ))}
      </div>
    </div>
  );
});
