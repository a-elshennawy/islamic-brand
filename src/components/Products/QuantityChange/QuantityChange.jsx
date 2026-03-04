import "./QuantityChange.css";
import { useUpdateItemQuantity } from "../../../hooks/useCart";

function QuantityChange({ className, id, quantity }) {
  const { mutate, isPending } = useUpdateItemQuantity();

  const handleUpdate = (newQuantity) => {
    if (newQuantity < 1) return;

    mutate({ id, quantity: newQuantity });
  };

  return (
    <>
      <div className={`qnttyCounter px-1 py-0 my-2 ${className}`}>
        <button onClick={() => handleUpdate(quantity + 1)} disabled={isPending}>
          +
        </button>

        <span>{quantity}</span>

        <button
          onClick={() => handleUpdate(quantity - 1)}
          disabled={isPending || quantity <= 1}
        >
          -
        </button>
      </div>
    </>
  );
}

export default QuantityChange;
