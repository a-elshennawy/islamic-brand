import "./AddToCartBtn.css";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { CgOptions } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import { Link } from "react-router-dom";

function AddToCartBtn({ product }) {
  const [t] = useTranslation();
  const isAr = useIsAr();

  const hasVariations = product?.has_variations;

  return (
    <>
      {hasVariations ? (
        <>
          <button className="addToCartBtn my-2" dir={isAr ? "rtl" : "ltr"}>
            <Link
              to={`/product-details/${product.slug}`}
              state={{ item: product }}
            >
              {t("select_options")}
              <CgOptions size={24} />
            </Link>
          </button>
        </>
      ) : (
        <>
          <button className="addToCartBtn my-2" dir={isAr ? "rtl" : "ltr"}>
            {t("add_to_cart")}
            <RiShoppingBasket2Line size={24} />
          </button>
        </>
      )}
    </>
  );
}

export default AddToCartBtn;
