import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import { useNavigate } from "react-router-dom";
import { useRemoveCartItem } from "../../hooks/useCart";
import QuantityChange from "../Products/QuantityChange/QuantityChange";
import { IoTrash } from "react-icons/io5";

function CartItems({ cart }) {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const navigate = useNavigate();
  const removeCartItem = useRemoveCartItem();

  const cartItems = cart?.items;

  const handleRemoveCartItem = (id) => {
    removeCartItem.mutate(id);
  };

  return (
    <>
      <div className="cartItems col-xl-4 col-lg-4 col-md-10 col-sm-10 col-11 text-center p-2">
        <h4>{t("cart items")}</h4>
        {cartItems?.length > 0 &&
          cartItems.map((product) => (
            <div
              key={product?.id}
              className={`cartItem p-2 row align-items-start justify-content-start gap-1 m-0 my-1`}
            >
              <span
                className="deleteBtn"
                style={isAr ? { left: "0" } : { right: "0" }}
                onClick={() => handleRemoveCartItem(product?.id)}
              >
                <IoTrash size={25} />
              </span>
              <div
                className="imgContainer col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3 p-0"
                onClick={() =>
                  navigate(`/product-details/${product?.product_slug}`)
                }
              >
                <img
                  src={product?.main_image}
                  alt={product?.product_name}
                  loading="lazy"
                />
              </div>
              <div className={`info col-6 ${isAr ? "text-end" : "text-start"}`}>
                <h4
                  onClick={() =>
                    navigate(`/product-details/${product?.product_slug}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {product?.product_name}
                </h4>
                <QuantityChange id={product?.id} quantity={product?.quantity} />
                <h4 className="price">
                  {product?.final_price} {t("L.E")}
                </h4>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default CartItems;
