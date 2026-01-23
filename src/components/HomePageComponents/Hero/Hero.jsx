import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useSliders } from "../../../hooks/useGeneral";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import ComponentLoader from "../../Loaders/ComponentLoader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Hero.css";

function Hero() {
  const { data: sliders, isLoading } = useSliders();

  if (isLoading)
    return (
      <section className="hero">
        <ComponentLoader />
      </section>
    );

  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation={{ prevEl: ".navPrev", nextEl: ".navNext" }}
        pagination={{ clickable: true }}
        className="heroSwiper"
      >
        {sliders?.map((slider) => (
          <SwiperSlide key={slider.id}>
            <img src={slider.image} alt="slide" />
          </SwiperSlide>
        ))}

        <button className="navBtn navPrev">
          <FaChevronLeft />
        </button>
        <button className="navBtn navNext">
          <FaChevronRight />
        </button>
      </Swiper>
    </section>
  );
}

export default Hero;
