import "./AddToCartBtn.css";
import { RiShoppingBasket2Line } from "react-icons/ri";

function AddToCartBtn() {
  return (
    <>
      <button className="addToCartBtn my-2">
        add to cart
        <RiShoppingBasket2Line size={24} />
      </button>
    </>
  );
}

export default AddToCartBtn;
