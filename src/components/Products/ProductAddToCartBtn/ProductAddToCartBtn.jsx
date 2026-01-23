import { RiShoppingBasket2Line } from "react-icons/ri";
import "./ProductAddToCartBtn.css";
function ProductAddToCartBtn() {
  return (
    <>
      <button className="productAddToCartBtn my-2">
        add to cart <RiShoppingBasket2Line size={24} />
      </button>
    </>
  );
}

export default ProductAddToCartBtn;
