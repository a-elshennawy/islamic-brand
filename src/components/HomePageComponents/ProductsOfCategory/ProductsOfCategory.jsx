import { useCategories, useCategoriesBanners } from "../../../hooks/useGeneral";
import { useProducts } from "../../../hooks/useProducts";
import useMobile from "../../../hooks/useMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../Products/ProductCard/ProductCard";
import { motion as Motion } from "motion/react";
import SectionLoader from "../../Loaders/SectionLoader";

function ProductsOfCategory({ categoryId }) {
  const { isMobile } = useMobile();
  const [t] = useTranslation();
  const navigate = useNavigate();

  // get all banners
  const {
    data: banners,
    isLoading: isBannersLoading,
    isError: isBannerError,
  } = useCategoriesBanners();
  // get the target categry banner
  const targetBanner = banners?.find(
    (item) => item.category.id === categoryId,
  )?.image;

  // get all categories details
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  // get the target category name
  const targetCategoryName = categoriesData?.find(
    (category) => category.id === categoryId,
  )?.name;

  // get products of target category
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProducts({
    category_id: categoryId,
  });

  console.log(products);

  const loading = isBannersLoading || isCategoriesLoading || isProductsLoading;
  const error = isBannerError || isCategoriesError || isProductsError;

  if (error || products?.data?.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <>
        <SectionLoader />
      </>
    );
  }

  return (
    <>
      <section
        className="homeProductsCategorySection text-center"
        style={{ width: isMobile ? "100%" : "75%", margin: "auto" }}
      >
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="banner p-0"
        >
          <img src={targetBanner} alt={targetCategoryName} loading="lazy" />
        </Motion.div>
        <div className="productsSection my-3">
          <button
            className="my-2 viewAllBtn"
            onClick={() => navigate(`/shop/category_id/${categoryId}`)}
          >
            {t("view all")}
          </button>
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
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className={`productSwiper p-3 ${products?.data?.length < 4 ? "needCenterSiwper" : ""}`}
          >
            {products?.data?.map((product, index) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
export default ProductsOfCategory;
