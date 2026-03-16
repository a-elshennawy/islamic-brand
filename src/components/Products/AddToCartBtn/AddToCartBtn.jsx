import "./AddToCartBtn.css";
import { TbShoppingBagPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import { useIsAr } from "../../../hooks/useIsAr";
import { useAddToCart } from "../../../hooks/useCart";
import { useTranslation } from "react-i18next";

function AddToCartBtn({ product, className }) {
  const addToCart = useAddToCart();
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const isAr = useIsAr();
  const [t] = useTranslation();

  const hasVariations = product?.has_variations;

  const handleClick = (product) => {
    if (hasVariations) {
      navigate(`/product-details/${product.slug}`);
    } else {
      addToCart.mutate({
        productId: product.id,
        quantity: 1,
        product: product,
      });
    }
  };

  return (
    <>
      <button
        className={`addToCartBtn ${className}`}
        onClick={() => handleClick(product)}
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        {t("add_to_cart")}
        <TbShoppingBagPlus size={isMobile ? 20 : 25} />
      </button>
    </>
  );
}

export default AddToCartBtn;
