import CartItems from "../../components/CartPageComponents/CartItems";
import CartSummary from "../../components/CartPageComponents/CartSummary";
import "./Cart.css";
import { useTranslation } from "react-i18next";
import { useGetCart, useGetCartSummary } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import SectionLoader from "../../components/Loaders/SectionLoader";

function Cart() {
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

  if (loading) {
    return <SectionLoader />;
  }
  if (error) {
    navigate("/");
  }

  return (
    <>
      <title>{t("cart_page_title")}</title>
      <section className="cartPage row justify-content-center align-items-center gap-1 m-0">
        <div className="col-12 text-center">
          <h2>{t("your cart")}</h2>
        </div>
        <CartItems cart={cart} />

        <CartSummary cartSummary={cartSummary} />
      </section>
    </>
  );
}

export default Cart;
