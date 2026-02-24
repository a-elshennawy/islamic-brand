import { useRelatedProducts } from "../../hooks/useProducts";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProductCard from "../Products/ProductCard/ProductCard";
import useMobile from "../../hooks/useMobile";
import SectionLoader from "../Loaders/SectionLoader";
import Line from "../HomePageComponents/Line/Line";

function RelatedProducts({ slug }) {
  const [t] = useTranslation();
  const { isMobile } = useMobile();
  const {
    data: relatedProducts,
    isLoading,
    isError,
  } = useRelatedProducts(slug);

  if (isLoading) {
    return (
      <>
        <SectionLoader />
      </>
    );
  }

  if (isError || relatedProducts?.length === 0) {
    return null;
  }

  return (
    <>
      <Line />
      <div
        className="relatedProducts"
        style={{ maxWidth: isMobile ? "100%" : "75%" }}
      >
        <h3 className="HomeSectionTitle mb-3">{t("related products")}</h3>
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
          className={`py-3 ${relatedProducts?.length < 4 ? "needCenterSiwper" : ""}`}
        >
          {relatedProducts?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
export default RelatedProducts;
