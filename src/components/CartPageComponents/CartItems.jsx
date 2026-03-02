import { useTranslation } from "react-i18next";
import useMobile from "../../hooks/useMobile";
import { useIsAr } from "../../hooks/useIsAr";

function CartItems({ cart }) {
  const [t] = useTranslation();
  const { isMobile } = useMobile();
  const isAr = useIsAr();

  const cartItems = cart?.items;

  console.log(cartItems);

  return (
    <>
      <div className="cartItems col-xl-5 col-lg-5 col-md-10 col-sm-10 col-11 text-center">
        <h4>{t("cart items")}</h4>
        {cartItems?.length > 0 &&
          cartItems.map((product) => (
            <div
              key={product?.id}
              className="cartItem row justify-content-center align-items-start gap-1 m-0"
              style={{ direction: isAr ? "rtl" : "ltr" }}
            >
              <div className="imgContainer col-2 p-0">
                <img
                  src={product?.main_image}
                  alt={product?.product_name}
                  loading="lazy"
                />
              </div>
              <div className={`info col-6 ${isAr ? "text-end" : "text-start"}`}>
                <h4>{product?.product_name}</h4>
                <h4>
                  {product?.product_price} {t("L.E")}
                </h4>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default CartItems;
