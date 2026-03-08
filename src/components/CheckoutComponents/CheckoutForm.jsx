import { useTranslation } from "react-i18next";
function CheckoutForm() {
  const [t] = useTranslation();
  return (
    <>
      <div className="checkoutForm col-xl-4 col-lg-4 col-md-10 col-sm-10 col-11">
        <h3>{t("fill your details to place order")}</h3>
        <form></form>
      </div>
    </>
  );
}
export default CheckoutForm;
