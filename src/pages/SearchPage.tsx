import { Error, Loader, SongCard } from "components";
import { useGetSongsBySearchQuery } from "features/shazam-core/shazamCoreAPI";
import { memo, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

export default memo(function SearchPage() {
  const { q = "" } = useParams();
  const { data, error, isFetching } = useGetSongsBySearchQuery(q);

  const songs = useMemo(
    () => data && data?.tracks?.hits?.map((song) => song?.track),
    [data]
  );

  const artists = useMemo(
    () => data && data?.artists.hits.map((a) => a.artist),
    [data]
  );

  if (error) return <Error />;

  if (isFetching) return <Loader />;

  return (
    <div className="flex flex-col p-4 pb-32">
      <h2 className="font-semibold text-3xl mt-4 mb-10">
        Showing results for <span className="font-black">`{q}` </span>
      </h2>
      <div className="flex flex-col">
        <section>
          <h3 className="opacity-90 font-semibold text-2xl mb-5">Artists</h3>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
          >
            {artists?.map((a, i) => (
              <SwiperSlide
                key={i}
                title={a.name}
                className="!w-1/4 sm:!w-32 shadow-lg rounded-full animate-slideright mb-5 select-none"
              >
                <Link to={`/artists/${a.adamid}`}>
                  {
                    <img
                      src={a?.avatar}
                      alt={a?.adamid}
                      className="rounded-full"
                    />
                  }
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section>
          <h3 className="opacity-90 font-semibold text-2xl mb-5">Tracks</h3>
          <div className="flex flex-wrap gap-8">
            {songs?.map((song, i) => (
              <SongCard key={i} song={song} data={songs} i={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});
