import Lottie from "lottie-react";
import emptyWishlistLottie from "../../assets/lotties/emptyWishlist.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function EmptyWishlist({ textColor = "#66452c" }) {
  const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="col-xl-9 col-lg-8 col-md-10 col-sm-10 col-10 text-center row justify-content-center align-items-center">
        <div className="col-xl-4 col-lg-5 col-md-10 col-sm-1 col-10">
          <Lottie animationData={emptyWishlistLottie} loop={true} />
        </div>
        <div className="col-12 text-center">
          <h4 style={{ color: textColor }}>{t("your wishlist is empty")}</h4>
          <button className="toShopBtn mt-1" onClick={() => navigate("/shop")}>
            {t("shop now")}
          </button>
        </div>
      </div>
    </>
  );
}
export default EmptyWishlist;
