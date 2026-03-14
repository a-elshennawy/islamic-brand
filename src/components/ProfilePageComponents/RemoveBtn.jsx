import { useTranslation } from "react-i18next";
import BtnSpinner from "../Loaders/BtnSpinner";
import { useToggleWishlist } from "../../hooks/useWishlist";

function RemoveBtn({ productId, combinationId }) {
  const [t] = useTranslation();
  const { mutate, isPending } = useToggleWishlist();

  const handleToggleWishlist = () => {
    mutate({
      productId: productId,
      combinationId: combinationId,
    });
  };

  return (
    <>
      <button onClick={handleToggleWishlist} disabled={isPending}>
        {isPending ? (
          <BtnSpinner color="var(--dark-sec-color)" />
        ) : (
          t("remove from wishlist")
        )}
      </button>
    </>
  );
}

export default RemoveBtn;
