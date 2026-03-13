import { useIsAr } from "../../hooks/useIsAr";
import { useTranslation } from "react-i18next";
import {
  getCarriers,
  getCountries,
  getStates,
  getCities,
} from "../../services/api/shipping";
import { useQuery } from "@tanstack/react-query";
function CheckoutForm() {
  const [t] = useTranslation();
  const isAr = useIsAr();

  const { data: carriers, isLoading: carriersLoading } = useQuery({
    queryKey: ["carriers"],
    queryFn: getCarriers,
  });
  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return (
    <>
      <div className="checkoutForm col-xl-4 col-lg-4 col-md-10 col-sm-10 col-11">
        <h3>{t("fill your details to place order")}</h3>
        <form>
          <div className="inputContainer">
            <label>{t("name")}</label>
            <input type="text" required />
          </div>
          <div className="inputContainer">
            <label>{t("phone")}</label>
            <input type="email" required />
          </div>
          <div className="inputContainer">
            <label>{t("email")}</label>
            <input type="tel" required />
          </div>
          <div className="inputContainer">
            <label>{t("choose your country")}</label>
            <select defaultValue="">
              <option value="" disabled>
                {t("choose your country")}
              </option>
              {countries?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <label>{t("choose your state")}</label>
            <select defaultValue="">
              <option value="" disabled>
                {t("choose your state")}
              </option>
            </select>
          </div>
          <div className="inputContainer">
            <label>{t("choose your city")}</label>
            <select defaultValue="">
              <option value="" disabled>
                {t("choose your city")}
              </option>
            </select>
          </div>
          <div className="carrierSelection py-2">
            <h4>{t("select your carrier")}</h4>
            {carriers?.map((carrier) => (
              <button className="carrierItem" key={carrier?.id}>
                <span style={{ textAlign: isAr ? "start" : "end" }}>
                  {carrier?.name} <br />
                  {t("shipping fees")} : {carrier?.price} {t("L.E")}
                </span>
                <span className="logo p-1">
                  <img src={carrier?.logo} alt={carrier?.name} />
                </span>
              </button>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
export default CheckoutForm;
