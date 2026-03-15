import CheckoutForm from "../../components/CheckoutComponents/CheckoutForm";
import CheckoutSummary from "../../components/CheckoutComponents/CheckoutSummary";
import "./Checkout.css";
import { useIsAr } from "../../hooks/useIsAr";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Checkout() {
  const isAr = useIsAr();
  const [t] = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    city: "",
    address_one: "",
    address_two: "",
    district_name: "",
  });
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleFormChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <>
      <title>{t("checkout_page_title")}</title>
      <section
        className="checkputPage row justify-content-center align-items-start gap-1 m-0"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <CheckoutForm
          onFormChange={handleFormChange}
          selectedCarrier={selectedCarrier}
          onCarrierSelect={setSelectedCarrier}
        />
        <CheckoutSummary
          formData={formData}
          selectedCarrier={selectedCarrier}
          selectedPaymentMethod={selectedPaymentMethod}
          onPaymentMethodChange={setSelectedPaymentMethod}
        />
      </section>
    </>
  );
}

export default Checkout;
