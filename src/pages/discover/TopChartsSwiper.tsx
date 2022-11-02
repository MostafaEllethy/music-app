import { Track } from "common/interfaces";
import { memo, useCallback, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "redux-store";
import { playPause, setActiveSong } from "features/player/playerSlice";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayPause from "components/PlayPause";
import { isArtistSong } from "common/utils";

export default memo(function TopChartsSwiper({
  data,
  topPlays,
}: {
  data: Array<Track>;
  topPlays: Array<Track>;
}) {
  const dispatch = useAppDispatch();
  const { activeSong } = useAppSelector((state) => state.player);

  const handlePlayClick = useCallback(
    (e: MouseEvent, song: Track, i: number) => {
      e.preventDefault();
      if (data) {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
      }
    },
    [data, dispatch]
  );

  const handlePauseClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      dispatch(playPause(false));
    },
    [dispatch]
  );

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Top Charts</h2>
        <Link to="/top-charts" className="text-sm opacity-80 font-medium">
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
            className="border dark:border-white/10 rounded-lg animate-slideright mb-7 !w-40"
          >
            <Link
              to={`/songs/${o?.key}`}
              className="group relative block rounded-t-lg overflow-hidden"
            >
              <img
                onClick={(e) => e.preventDefault()}
                src={o?.images?.coverart}
                alt={o?.title}
                className="w-full h-auto"
              />
              <div
                className={`flex justify-center items-center absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100 ${
                  !isArtistSong(activeSong) && activeSong?.key === o.key
                    ? ""
                    : "opacity-0"
                }`}
              >
                <PlayPause
                  song={o}
                  handlePause={handlePauseClick}
                  handlePlay={(e) => handlePlayClick(e, o, i)}
                />
              </div>
            </Link>
            <div className="flex flex-col gap p-2">
              <Link
                to={`/songs/${o?.key}`}
                className="text-[15px] font-bold truncate"
              >
                {o?.title}
              </Link>
              <Link
                to={`/artists/${o?.artists[0]?.adamid}`}
                className="text-[13px] truncate base-300 opacity-80 font-medium"
              >
                {o?.subtitle}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
});
