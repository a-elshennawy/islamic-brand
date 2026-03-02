import Lottie from "lottie-react";
import emptyCartLottie from "../../assets/lotties/emptyCart.json";
import { useTranslation } from "react-i18next";

function EmptyCart() {
  const [t] = useTranslation();
  return (
    <>
      <div className="emptyCart row justify-content-center align-items-center">
        <div className="col-12">
          <Lottie animationData={emptyCartLottie} loop={true} />
        </div>
        <div className="col-12 text-center">
          <h4>{t("your cart is empty")}</h4>
        </div>
      </div>
    </>
  );
}

export default EmptyCart;
