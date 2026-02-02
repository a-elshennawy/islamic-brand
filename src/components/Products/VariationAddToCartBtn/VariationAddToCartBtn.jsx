import "./VariationAddToCartBtn.css";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";

function VariationAddToCartBtn() {
  const [t] = useTranslation();
  const isAr = useIsAr();

  return (
    <>
      <button className="variationAddToCartBtn mt-3" dir={isAr ? "rtl" : "ltr"}>
        {t("add_to_cart")} <RiShoppingBasket2Line size={24} />
      </button>
    </>
  );
}

export default VariationAddToCartBtn;
