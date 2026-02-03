import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useSliders } from "../../../hooks/useGeneral";
import "swiper/css";

import "./Hero.css";
import SectionLoader from "../../Loaders/SectionLoader";
import useMobile from "../../../hooks/useMobile";

function Hero() {
  const { isMobile } = useMobile();
  const { data: sliders, isLoading } = useSliders();

  if (isLoading) return <SectionLoader />;

  return (
    <section className="hero" style={{ height: isMobile ? "auto" : "80dvh" }}>
      <Swiper
        modules={[Autoplay]}
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
      </Swiper>
    </section>
  );
}

export default Hero;
