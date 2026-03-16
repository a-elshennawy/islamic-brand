import CartItems from "../../components/CartPageComponents/CartItems";
import CartSummary from "../../components/CartPageComponents/CartSummary";
import "./Cart.css";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import { useGetCart, useGetCartSummary } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import SectionLoader from "../../components/Loaders/SectionLoader";
import EmptyCart from "../../components/SideCart/EmptyCart";

function Cart() {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const isAr = useIsAr();
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
      <section
        className="cartPage row justify-content-center align-items-start gap-1 m-0"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <div className="col-12 text-center">
          <h2>{t("your cart")}</h2>
        </div>
        {cart?.items.length > 0 ? (
          <>
            <CartItems cart={cart} />
            <CartSummary cartSummary={cartSummary} />
          </>
        ) : (
          <>
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-10 col-10 text-center">
              <EmptyCart textColor="#000" />
              <button
                className="emptyCartBtn mt-2"
                onClick={() => navigate("/shop/category_id/21")}
              >
                {t("shop now")}
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Cart;
