import "./Reviews.css";
import { useReviews } from "../../hooks/useGeneral";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion as Motion } from "motion/react";
import SectionLoader from "../../components/Loaders/SectionLoader";
import {
  MdCancel,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import BackBtn from "../../components/Btns/BackBtn";

function Reviews() {
  const { data: reviewsArray, isLoading } = useReviews();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [t] = useTranslation();

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
      <title>{t("review_page_title")}</title>
      <section className="reviewsPage text-center mt-5 p-2 pt-5 container-fluid">
        <h2>{t("reviews")}</h2>
        <div className="reviews py-3 px-2">
          {reviewsArray?.map((review, index) => (
            <img
              src={review.image}
              alt={review.name}
              key={index}
              onClick={() => openImageViewer(index)}
            />
          ))}
        </div>
      </section>

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
