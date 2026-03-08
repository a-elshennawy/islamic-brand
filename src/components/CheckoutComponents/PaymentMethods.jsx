import { useTranslation } from "react-i18next";

function PaymentMethods() {
  const [t] = useTranslation();
  return (
    <>
      <div className="paymentMethods">
        <h4>{t("select payment method")}</h4>
      </div>
    </>
  );
}

export default PaymentMethods;
