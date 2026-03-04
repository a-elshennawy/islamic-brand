import { useTranslation } from "react-i18next";

function CheckoutSummary() {
  const [t] = useTranslation();

  return (
    <>
      <div className="checkoutSummary col-xl-5 col-lg-5 col-md-10 col-sm-10 col-11">
        <h3>{t("order summary")}</h3>
        <div className="py-2 px-1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button>{t("place order")}</button>
        </div>
      </div>
    </>
  );
}
export default CheckoutSummary;
