import { Error, Loader, SongCard } from "components";
import { GeoLocation } from "common/interfaces";
import { useGetGeoLocationQuery } from "features/geolocation/geoLocationAPI";
import { useGetSongsByCountryQuery } from "features/shazam-core/shazamCoreAPI";
import { memo } from "react";

export default memo(function AroundYouPage() {
  const { data: geoLocationData } = useGetGeoLocationQuery();

  return (
    <section className="flex flex-col p-4">
      <h2 className="font-semibold text-3xl mt-4 mb-10">
        Around You{" "}
        <span className="font-black">( {geoLocationData?.country_name} )</span>
      </h2>
      {geoLocationData && <SongsListing geoLocation={geoLocationData} />}
    </section>
  );
});

const SongsListing = memo(({ geoLocation }: { geoLocation: GeoLocation }) => {
  const { data, error, isFetching } = useGetSongsByCountryQuery(
    geoLocation.country_code2
  );

  if (error) return <Error />;

  if (isFetching) return <Loader />;

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {data?.map((song, i) => (
        <SongCard key={i} song={song} data={data} i={i} />
      ))}
    </div>
  );
});
