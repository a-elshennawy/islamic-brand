import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useSliders } from "../../../hooks/useGeneral";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Hero.css";
import SectionLoader from "../../Loaders/SectionLoader";

function Hero() {
  const { data: sliders, isLoading } = useSliders();

  if (isLoading) return <SectionLoader />;

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
            <img src={slider.image} alt="slide" loading="eager" />
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
