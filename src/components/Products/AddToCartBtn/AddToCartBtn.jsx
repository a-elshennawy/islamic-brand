import "./AddToCartBtn.css";
import { TbShoppingBagPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import { useIsAr } from "../../../hooks/useIsAr";
import { useAddToCart } from "../../../hooks/useCart";

function AddToCartBtn({ product }) {
  const addToCart = useAddToCart();
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const isAr = useIsAr();

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

  // console.log("product added:", product);

  return (
    <>
      <button
        className={`addToCartBtn`}
        onClick={() => handleClick(product)}
        style={isAr ? { left: "0.313rem" } : { right: "0.313rem" }}
      >
        <TbShoppingBagPlus size={isMobile ? 20 : 25} />
      </button>
    </>
  );
}

export default AddToCartBtn;
