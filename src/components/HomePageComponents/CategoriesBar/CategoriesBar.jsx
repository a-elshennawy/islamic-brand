import "./CategoriesBar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCategories } from "../../../hooks/useGeneral";
import SectionLoader from "../../Loaders/SectionLoader";

function CategoriesBar() {
  const { data: categories, isLoading } = useCategories();
  const categoriesArray = Array.isArray(categories) ? categories : [];

  if (isLoading) return <SectionLoader />;
  if (categoriesArray.length === 0) return null;

  return (
    <>
      <div className="categoriesBar m-0 py-5">
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
            <SwiperSlide
              key={category.id}
              className="categoryIcon text-center p-2"
            >
              <img src={category.image} alt={category.name} />
              <h4 className="m-0">{category.name}</h4>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default CategoriesBar;
