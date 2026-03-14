import { getReviews } from "../../../services/api/products";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ReviewCard from "./ReviewCard";
import { useTranslation } from "react-i18next";
import SubmitReview from "./SubmitReview";
import NoReviews from "./NoReviews";

function ProductReviews({ product }) {
  const [t] = useTranslation();
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", product?.id],
    queryFn: () => getReviews(product?.id),
  });
  return (
    <>
      <section className="col-12 text-center row justify-content-center align-items-start gap-2 m-0">
        <h3 className="HomeSectionTitle mb-3 col-12">{t("product reviews")}</h3>
        <SubmitReview id={product?.id} />
        {reviews?.length > 0 ? (
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
                slidesPerView: 1,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            className="needCenterSiwper col-xl-9 col-lg-8 col-md-10 col-sm-12 col-12"
          >
            {reviews?.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NoReviews />
        )}
      </section>
    </>
  );
}

export default ProductReviews;
