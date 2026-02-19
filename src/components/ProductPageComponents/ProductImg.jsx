import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState } from "react";
import useMobile from "../../hooks/useMobile";
import { motion as Motion } from "motion/react";
function ProductImg({ product }) {
  const [selectedImg, setSelectedImg] = useState(product?.main_image);
  const { isMobile } = useMobile();
  const productImages = product?.grouped_variations.map(
    (variation) => variation.main_image,
  );

  console.log(productImages);
  return (
    <>
      <div className="imgSide p-0 col-xl-5 col-lg-5 col-md-10 col-sm-12 col-12 row gap-2 m-0 justify-content-center">
        <Motion.div
          className="mainImg col-12 p-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={selectedImg}
            alt={product.name}
            loading="lazy"
            style={{ height: isMobile ? "21.875rem" : "40.625rem" }}
          />
        </Motion.div>
        <div className="thumbnails">
          <Swiper
            modules={[Autoplay]}
            loop={productImages?.length > 1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            onSlideChange={(swiper) => {
              const currentImg = productImages[swiper.realIndex];
              setSelectedImg(currentImg);
            }}
            spaceBetween={isMobile ? 10 : 50}
            breakpoints={{
              320: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="thumbnailsSwiper py-2 col-12"
          >
            {productImages?.map((img) => (
              <SwiperSlide key={img.id} onClick={() => setSelectedImg(img)}>
                <div className="thumbnailImg">
                  <img
                    src={img}
                    alt={product}
                    loading="lazy"
                    style={{ height: isMobile ? "6.25rem" : "9.375rem" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default ProductImg;
