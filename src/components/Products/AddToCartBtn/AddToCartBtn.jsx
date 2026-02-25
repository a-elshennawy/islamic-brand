import "./AddToCartBtn.css";
import { TbShoppingBagPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";

function AddToCartBtn({ product }) {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const hasVariations = product?.has_variations;

  const handleClick = (product) => {
    if (hasVariations) {
      navigate(`/product-details/${product.slug}`);
    } else {
      console.log("add to cart");
    }
  };

  return (
    <>
      <button className="addToCartBtn" onClick={() => handleClick(product)}>
        <span>
          <TbShoppingBagPlus size={isMobile ? 20 : 25} />
        </span>
      </button>
    </>
  );
}

export default AddToCartBtn;
