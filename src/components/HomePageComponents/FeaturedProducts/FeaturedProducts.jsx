import "./FeaturedProducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useHomeProducts } from "../../../hooks/useProducts";
import ProductCard from "../../Products/ProductCard/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionLoader from "../../Loaders/SectionLoader";

function FeaturedProducts() {
  const { data: homeProducts, isLoading } = useHomeProducts();
  const products = homeProducts?.featured_products || [];

  if (isLoading) return <SectionLoader />;

  if (products.length === 0) return null;

  return (
    <>
      <section className="featuredProducts">
        <h2 className="sectionTitle">featured products</h2>
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
    </>
  );
}

export default FeaturedProducts;
