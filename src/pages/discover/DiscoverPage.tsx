import { useGetWorldChartsQuery } from "../../features/shazam-core/shazamCoreAPI";
import Error from "components/Error";
import { memo, useMemo } from "react";
import Loader from "components/Loader";
import { Track } from "common/interfaces";
import GenreSongs from "./GenreSongs";
import TopArtistsSwiper from "./TopArtistsSwiper";
import TopChartsSwiper from "./TopChartsSwiper";

function DiscoverPage() {
  const { data = [], isFetching, error } = useGetWorldChartsQuery();

  const topPlays: Array<Track> = useMemo(
    () => (data ? data?.slice(0, 10) : []),
    [data]
  );

  if (error) return <Error />;

  if (isFetching) return <Loader />;

  return (
    <section className="p-4 pb-32">
      <TopArtistsSwiper topPlays={topPlays} />
      <TopChartsSwiper topPlays={topPlays} data={data} />
      <GenreSongs />
    </section>
  );
}

export default memo(DiscoverPage);
