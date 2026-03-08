import CheckoutForm from "../../components/CheckoutComponents/CheckoutForm";
import CheckoutSummary from "../../components/CheckoutComponents/CheckoutSummary";
import "./Checkout.css";
import { useIsAr } from "../../hooks/useIsAr";
import { useTranslation } from "react-i18next";

function Checkout() {
  const isAr = useIsAr();
  const [t] = useTranslation();

  return (
    <>
      <title>{t("checkout_page_title")}</title>
      <section
        className="checkputPage row justify-content-center align-items-start gap-1 m-0"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <CheckoutForm />
        <CheckoutSummary />
      </section>
    </>
  );
}

export default Checkout;
