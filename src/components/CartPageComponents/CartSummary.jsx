import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function CartSummary({ cartSummary }) {
  const [t] = useTranslation();
  const navigate = useNavigate();

  console.log(cartSummary);
  return (
    <>
      <div className="cartSummary col-xl-3 col-lg-3 col-md-10 col-sm-10 col-11 text-center p-2">
        <h4>{t("cart summary")}</h4>
        <span className="cartSummItem my-3">
          <h5>{t("subtotal")}</h5>
          <h5>
            {cartSummary?.subtotal} {t("L.E")}
          </h5>
        </span>
        <hr />
        <span className="cartSummItem my-3">
          <h5>{t("discounts")}</h5>
          <h5>
            {cartSummary?.discount_amount} {t("L.E")}
          </h5>
        </span>
        <hr />
        <span className="cartSummItem my-3">
          <h5>{t("shipping fees")}</h5>
          <h5>{t("calculated in checkout")}</h5>
        </span>
        <hr />
        <span className="cartSummItem my-3">
          <h5>{t("total")}</h5>
          <h5>
            {cartSummary?.total} {t("L.E")}
          </h5>
        </span>
        <hr />
        <button onClick={() => navigate("/checkout")}>{t("checkout")}</button>
      </div>
    </>
  );
}
export default CartSummary;
