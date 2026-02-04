import "./CategoriesBar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCategories } from "../../../hooks/useGeneral";
import useMobile from "../../../hooks/useMobile";
import SectionLoader from "../../Loaders/SectionLoader";
import { motion as Motion } from "motion/react";

function CategoriesBar() {
  const { data: categories, isLoading } = useCategories();
  const { isMobile } = useMobile();
  const categoriesArray = Array.isArray(categories) ? categories : [];

  if (isLoading) return <SectionLoader />;
  if (categoriesArray.length === 0) return null;

  return (
    <>
      <div
        className="categoriesBar m-0 mx-auto py-5"
        style={{ width: isMobile ? "100%" : "65%" }}
      >
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
          className="categoriesSwiper p-3"
        >
          {categoriesArray.map((category) => (
            <SwiperSlide key={category.id}>
              <Motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="categoryIcon text-center p-0 mx-auto"
              >
                <img src={category.image} alt={category.name} />
                <h4 className="m-0">{category.name}</h4>
              </Motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default CategoriesBar;
