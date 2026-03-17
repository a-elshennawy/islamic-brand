import { useTranslation } from "react-i18next";
import { useAddToCart } from "../../../hooks/useCart";
import useMobile from "../../../hooks/useMobile";
import { TbShoppingBagPlus } from "react-icons/tb";
import BtnSpinner from "../../Loaders/BtnSpinner";

function VariationBtn({ mainProduct, product, productId }) {
  const [t] = useTranslation();
  const addToCart = useAddToCart();
  const { isMobile } = useMobile();

  const handleAddToCart = () => {
    if (!product || !product.id) return;

    addToCart.mutate({
      productId: productId,
      combinationId: product.id,
      quantity: 1,
      product: mainProduct,
    });
  };

  return (
    <>
      <button
        className="bestProdBtn my-1 mx-auto"
        onClick={handleAddToCart}
        disabled={addToCart.isPending}
      >
        {addToCart.isPending ? (
          <BtnSpinner color="var(--white)" size={isMobile ? 16 : 20} />
        ) : (
          <>
            {t("add_to_cart")}
            <TbShoppingBagPlus size={isMobile ? 16 : 20} />
          </>
        )}
      </button>
    </>
  );
}

export default VariationBtn;
