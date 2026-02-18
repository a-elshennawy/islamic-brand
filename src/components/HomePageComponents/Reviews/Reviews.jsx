import "./Reviews.css";
import { useReviews } from "../../../hooks/useGeneral";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import {
  MdCancel,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { AnimatePresence, motion as Motion } from "motion/react";
import SectionLoader from "../../Loaders/SectionLoader";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import useMobile from "../../../hooks/useMobile";

function Reviews() {
  const { data: reviewsArray, isLoading } = useReviews();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const showPrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + reviewsArray.length) % reviewsArray.length,
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % reviewsArray.length);
  };
  if (isLoading) return <SectionLoader />;
  if (reviewsArray.length === 0) return null;

  return (
    <>
      <section className="reviews" dir={isAr ? "rtl" : "ltr"}>
        <Motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="HomeSectionTitle mb-3"
        >
          {t("reviews")}
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
              slidesPerView: 1,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="reviewsSwiper p-3"
        >
          {reviewsArray.map((review, index) => (
            <SwiperSlide
              key={review.id}
              onClick={() => openImageViewer(index)}
              style={{ cursor: "pointer" }}
            >
              <Motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="reviewCard p-0"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  style={
                    isMobile
                      ? { width: "15.625rem", height: "15.625rem" }
                      : { width: "21.875rem", height: "21.875rem" }
                  }
                />
              </Motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* full screen*/}

      <AnimatePresence>
        {isViewerOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="reviewFullscreen"
            onClick={closeImageViewer}
          >
            <button
              className="closeBtn"
              onClick={(e) => {
                e.stopPropagation();
                closeImageViewer();
              }}
            >
              <MdCancel size={30} />
            </button>
            <button
              className="prevBtn"
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
            >
              <MdKeyboardArrowLeft size={40} />
            </button>
            <img
              src={reviewsArray[selectedImageIndex].image}
              alt="review image"
              className="reviewImg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="nextBtn"
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
            >
              <MdKeyboardArrowRight size={40} />
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Reviews;
