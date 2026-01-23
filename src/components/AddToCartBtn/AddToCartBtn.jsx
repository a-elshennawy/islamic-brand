import "./AddToCartBtn.css";
import { FaShoppingBag } from "react-icons/fa";
function AddToCartBtn() {
  return (
    <>
      <button className="addToCartBtn my-2">
        add to cart <FaShoppingBag size={18} />
      </button>
    </>
  );
}

export default AddToCartBtn;
