import "./WhyUs.css";
import { useChooseUs } from "../../../hooks/useGeneral";
import { useTranslation } from "react-i18next";
import useMobile from "../../../hooks/useMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion as Motion } from "motion/react";

function WhyUs() {
  const { data: chooseUsArray, isLoading } = useChooseUs();
  const [t] = useTranslation();
  const { isMobile } = useMobile();

  console.log(chooseUsArray);
  return (
    <>
      <section
        className="whyUs text-center py-2"
        style={{ width: isMobile ? "90%" : "70%" }}
      >
        <h2 className="mb-3 mx-auto">{t("why_choose_us")}</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {chooseUsArray?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="whyChooseItem py-2 px-1">
                <div className="imgContainer p-2 mx-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={
                      isMobile
                        ? { width: "5rem", height: "5rem" }
                        : { width: "6.25rem", height: "6.25rem" }
                    }
                  />
                </div>
                <h3 className="my-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default WhyUs;
