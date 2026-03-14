import { useTranslation } from "react-i18next";
import { useAddToCart } from "../../hooks/useCart";
import BtnSpinner from "../Loaders/BtnSpinner";

function AddToCart({ productId, combinationId }) {
  const [t] = useTranslation();
  const addToCart = useAddToCart();

  const handleAddToCart = () => {
    if (!productId || !combinationId) return;
    addToCart.mutate({
      productId: productId,
      combinationId: combinationId,
    });
  };
  return (
    <>
      <button onClick={handleAddToCart} disabled={addToCart.isPending}>
        {addToCart.isPending ? (
          <BtnSpinner color="var(--dark-sec-color)" />
        ) : (
          t("add_to_cart")
        )}
      </button>
    </>
  );
}
export default AddToCart;
