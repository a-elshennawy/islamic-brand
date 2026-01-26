import { RiShoppingBasket2Line } from "react-icons/ri";
import "./ProductAddToCartBtn.css";
import { useTranslation } from "react-i18next";

function ProductAddToCartBtn() {
  const [t] = useTranslation();
  return (
    <>
      <button className="productAddToCartBtn my-2">
        {t("add_to_cart")} <RiShoppingBasket2Line size={24} />
      </button>
    </>
  );
}

export default ProductAddToCartBtn;
