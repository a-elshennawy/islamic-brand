import { useTranslation } from "react-i18next";
import { useGetCartSummary, useGetCart } from "../../hooks/useCart";
import CheckoutItems from "./CheckoutItems";
import PaymentMethods from "./PaymentMethods";
import { useNavigate } from "react-router-dom";

function CheckoutSummary() {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const {
    data: cart,
    isLoading: cartLoading,
    isError: cartError,
  } = useGetCart();
  const {
    data: cartSummary,
    isLoading: cartSummaryLoading,
    isError: cartSummaryError,
  } = useGetCartSummary();

  const loading = cartLoading || cartSummaryLoading;
  const error = cartError || cartSummaryError;

  const cartItems = cart?.items;

  return (
    <>
      <div className="checkoutSummary col-xl-3 col-lg-3 col-md-10 col-sm-10 col-11">
        <h3>{t("order summary")}</h3>
        <CheckoutItems cartItems={cartItems} />
        <div className="py-2 px-1">
          <span className="summItem">
            <h5>{t("subtotal")}</h5>
            <h5>
              {cartSummary?.subtotal} {t("L.E")}
            </h5>
          </span>
          <hr />
          <span className="summItem">
            <h5>{t("discounts")}</h5>
            <h5>
              {cartSummary?.discount_amount} {t("L.E")}
            </h5>
          </span>
          <hr />
          <span className="summItem">
            <h5>{t("shipping fees")}</h5>
            <h5></h5>
          </span>
          <hr />
          <span className="summItem">
            <h5>{t("total")}</h5>
            <h5>
              {cartSummary?.total} {t("L.E")}
            </h5>
          </span>
          <hr />
          <PaymentMethods />
          <hr />
          <div className="actions py-2">
            <button className="toCartBtn" onClick={() => navigate("/cart")}>
              {t("adjust cart")}
            </button>
            <button
              className="toShopBtn"
              onClick={() => navigate("/shop/category_id/21")}
            >
              {t("shop")}
            </button>
            <button className="placeOrderBtn">{t("place order")}</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckoutSummary;
