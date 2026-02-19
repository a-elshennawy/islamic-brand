import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useHomeProducts } from "../../../hooks/useProducts";
import ProductCard from "../../Products/ProductCard/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./RecentProducts.css";
import SectionLoader from "../../Loaders/SectionLoader";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import useMobile from "../../../hooks/useMobile";
import { motion as Motion } from "motion/react";

function RecentProducts() {
  const { data: homeProducts, isLoading } = useHomeProducts();
  const products = homeProducts?.latest_products || [];
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  if (isLoading) return <SectionLoader />;

  if (products.length === 0) return null;

  return (
    <section
      className="recentProducts"
      dir={isAr ? "rtl" : "ltr"}
      style={{ width: isMobile ? "100%" : "75%" }}
    >
      <Motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="HomeSectionTitle mb-3"
      >
        {t("latest_products")}
      </Motion.h2>

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
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        className="productSwiper p-3"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default RecentProducts;
