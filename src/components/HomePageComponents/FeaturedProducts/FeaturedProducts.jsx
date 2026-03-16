import "./FeaturedProducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useHomeProducts } from "../../../hooks/useProducts";
import "swiper/css";
import SectionLoader from "../../Loaders/SectionLoader";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import useMobile from "../../../hooks/useMobile";
import { motion as Motion } from "motion/react";
import FirstProduct from "./FirstProduct";
import FeaturedProductCard from "../../Products/FeaturedProductCard/FeaturedProductCard";

function FeaturedProducts() {
  const { data: homeProducts, isLoading } = useHomeProducts();
  const products = homeProducts?.featured_products || [];
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  if (isLoading) return <SectionLoader />;

  if (products.length === 0) return null;
  const firstProduct = products[0];

  return (
    <>
      <section
        className="featuredProducts homeSection p-2"
        style={{
          width: isMobile ? "95%" : "75%",
          direction: isAr ? "rtl" : "ltr",
        }}
      >
        <div className="inner row justify-content-center align-items-end gap-1 m-0 p-2 pb-5">
          <Motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="HomeSectionTitle mb-3"
          >
            {t("featured_products")}
          </Motion.h2>
          <div
            className={`col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ${isMobile ? "order-2" : ""}`}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={50}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="productSwiper p-3"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <FeaturedProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <FirstProduct product={firstProduct} />
        </div>
      </section>
    </>
  );
}

export default FeaturedProducts;
