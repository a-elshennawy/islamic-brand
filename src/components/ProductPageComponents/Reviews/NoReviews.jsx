import Lottie from "lottie-react";
import noReviewsLottie from "../../../assets/lotties/noReviews.json";
import { useTranslation } from "react-i18next";

function NoReviews({ textColor = "#66452c" }) {
  const [t] = useTranslation();

  return (
    <>
      <div className="noReviews row justify-content-center align-items-center gap-2 m-0 col-xl-9 col-lg-8 col-md-10 col-sm-12 col-12">
        <div className="col-xl-3 col-lg-4 col-md-10 col-sm-10 col-10">
          <Lottie animationData={noReviewsLottie} loop={true} />
        </div>
        <div className="col-12 text-center">
          <h4 style={{ color: textColor }}>{t("no reviews yet")}</h4>
        </div>
      </div>
    </>
  );
}

export default NoReviews;
