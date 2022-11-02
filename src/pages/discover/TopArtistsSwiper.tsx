import { memo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { Track } from "common/interfaces";

export default memo(function TopArtistsSwiper({
  topPlays,
}: {
  topPlays: Array<Track>;
}) {
  return (
    <section className="mb-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Top Artists</h2>
        <Link to="/top-artists" className="text-sm opacity-80 font-medium">
          See All
        </Link>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-5"
      >
        {topPlays?.map((o, i) => (
          <SwiperSlide
            key={i}
            className="!w-1/4 sm:!w-32 shadow-lg rounded-full animate-slideright mb-7"
          >
            <Link to={`/artists/${o?.artists[0]?.adamid}`}>
              {
                <img
                  src={o?.images.background}
                  alt={o?.artists[0]?.adamid}
                  className="rounded-full w-full object-cover"
                />
              }
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
});
