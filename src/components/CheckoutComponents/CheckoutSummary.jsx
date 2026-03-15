import { useTranslation } from "react-i18next";
import { useGetCartSummary, useGetCart } from "../../hooks/useCart";
import CheckoutItems from "./CheckoutItems";
import PaymentMethods from "./PaymentMethods";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../services/api/order";
import { useState } from "react";
import BtnSpinner from "../Loaders/BtnSpinner";
import Toastify from "toastify-js";
import { getCarriers, getShippingRates } from "../../services/api/shipping";
import { getAddressId } from "../../services/api/shipping";
import { useQuery } from "@tanstack/react-query";
import useInitiateCheckout from "../../hooks/metaTracking/useInitiateCheckout";

function CheckoutSummary({
  formData,
  selectedCarrier,
  selectedPaymentMethod,
  onPaymentMethodChange,
}) {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const showError = (msg) => {
    Toastify({
      text: msg,
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
  };

  const { data: cart, isLoading: cartLoading } = useGetCart();
  const { data: cartSummary, isLoading: cartSummaryLoading } =
    useGetCartSummary();
  const { data: carriers } = useQuery({
    queryKey: ["carriers"],
    queryFn: getCarriers,
  });

  const { data: shippingRates, isLoading: shippingRatesLoading } = useQuery({
    queryKey: ["shippingRates", selectedCarrier, formData.state, formData.city],
    queryFn: () =>
      getShippingRates({
        carrierId: selectedCarrier,
        stateId: formData.state,
        cityId: formData.city,
      }),
    enabled: !!selectedCarrier && !!formData.state && !!formData.city,
  });

  const cartItems = cart?.items;
  useInitiateCheckout(cartItems);

  const handlePlaceOrder = async () => {
    if (!selectedCarrier) return showError(t("please select a carrier"));
    if (!selectedPaymentMethod)
      return showError(t("please select a payment method"));
    if (!formData.name) return showError(t("please enter your name"));
    if (!formData.phone) return showError(t("please enter your phone"));
    if (!formData.city) return showError(t("please select your city"));
    if (!formData.address_one)
      return showError(t("please complete your address"));
    if (!formData.district_name)
      return showError(t("please complete your address"));

    setIsPlacingOrder(true);
    try {
      const addressResponse = await getAddressId({
        state_id: formData.state,
        city_id: formData.city,
        district_name: formData.district_name,
        address_one: formData.address_one,
        address_two: formData.address_two,
      });

      const userAddressId = addressResponse?.id;

      const orderResponse = await placeOrder({
        carrier_id: selectedCarrier,
        payment_method: "kashier",
        kashier_method: selectedPaymentMethod,
        order_source: "web",
        user_address_id: userAddressId,
        guest_name: formData.name,
        guest_phone: formData.phone,
      });

      const paymentUrl = orderResponse?.payment_url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

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
            <h5>
              {shippingRates?.cost ?? t("select state & shipping method")}
              {shippingRates && t("L.E")}
            </h5>
          </span>
          <hr />
          <span className="summItem">
            <h5>{t("total")}</h5>
            <h5>
              {shippingRates?.total ?? cartSummary?.total} {t("L.E")}
            </h5>
          </span>
          <hr />
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={onPaymentMethodChange}
          />
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
            <button
              className="placeOrderBtn"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? (
                <BtnSpinner color="var(--white)" />
              ) : (
                t("place order")
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckoutSummary;
