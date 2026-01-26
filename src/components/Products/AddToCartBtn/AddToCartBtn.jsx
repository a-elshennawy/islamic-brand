import "./AddToCartBtn.css";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";

function AddToCartBtn() {
  const [t] = useTranslation();
  return (
    <>
      <button className="addToCartBtn my-2">
        {t("add_to_cart")}
        <RiShoppingBasket2Line size={24} />
      </button>
    </>
  );
}

export default AddToCartBtn;
