import CheckoutForm from "../../components/CheckoutComponents/CheckoutForm";
import CheckoutSummary from "../../components/CheckoutComponents/CheckoutSummary";
import "./Checkout.css";

function Checkout() {
  return (
    <>
      <section className="checkputPage row justify-content-center align-items-start gap-1 m-0">
        <CheckoutSummary />
        <CheckoutForm />
      </section>
    </>
  );
}

export default Checkout;
