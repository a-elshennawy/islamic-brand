import { useIsAr } from "../../hooks/useIsAr";
import { useTranslation } from "react-i18next";
import {
  getCarriers,
  getCountries,
  getStates,
  getCities,
} from "../../services/api/shipping";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function CheckoutForm({ onFormChange, selectedCarrier, onCarrierSelect }) {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const [country, setCountry] = useState();
  const [state, setState] = useState();

  const { data: carriers } = useQuery({
    queryKey: ["carriers"],
    queryFn: getCarriers,
  });
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  const { data: states } = useQuery({
    queryKey: ["states", country],
    queryFn: () => getStates(country),
    enabled: !!country,
  });
  const { data: cities } = useQuery({
    queryKey: ["cities", state],
    queryFn: () => getCities(state),
    enabled: !!state,
  });

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState("");
    onFormChange({ country: e.target.value, state: "", city: "" });
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    onFormChange({ state: e.target.value, city: "" });
  };

  return (
    <div className="checkoutForm col-xl-4 col-lg-4 col-md-10 col-sm-10 col-11">
      <h3>{t("fill your details to place order")}</h3>
      <form>
        <div className="inputContainer">
          <label>{t("name")}</label>
          <input
            type="text"
            onChange={(e) => onFormChange({ name: e.target.value })}
            required
          />
        </div>
        <div className="inputContainer">
          <label>{t("phone")}</label>
          <input
            type="tel"
            onChange={(e) => onFormChange({ phone: e.target.value })}
            required
          />
        </div>
        <div className="inputContainer">
          <label>{t("email")}</label>
          <input
            type="email"
            onChange={(e) => onFormChange({ email: e.target.value })}
            required
          />
        </div>
        <div className="inputContainer">
          <label>{t("choose your country")}</label>
          <select value={country} onChange={handleCountryChange} required>
            <option value="" disabled>
              {t("choose your country")}
            </option>
            {countries?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inputContainer">
          <label>{t("choose your state")}</label>
          <select
            value={state}
            onChange={handleStateChange}
            disabled={!country}
            required
          >
            <option value="" disabled>
              {t("choose your state")}
            </option>
            {states?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inputContainer">
          <label>{t("choose your city")}</label>
          <select
            onChange={(e) => onFormChange({ city: e.target.value })}
            disabled={!state}
            required
          >
            <option value="" disabled>
              {t("choose your city")}
            </option>
            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inputContainer">
          <label>{t("address one")}</label>
          <input
            type="text"
            onChange={(e) => onFormChange({ address_one: e.target.value })}
            required
          />
        </div>
        <div className="inputContainer">
          <label>{t("address two")}</label>
          <input
            type="text"
            onChange={(e) => onFormChange({ address_two: e.target.value })}
          />
        </div>
        <div className="inputContainer">
          <label>{t("district")}</label>
          <input
            type="text"
            onChange={(e) => onFormChange({ district_name: e.target.value })}
            required
          />
        </div>
        <div className="carrierSelection py-2">
          <h4>{t("select your carrier")}</h4>
          {carriers?.map((carrier) => (
            <button
              type="button"
              className={`carrierItem ${selectedCarrier === carrier.id ? "selected" : ""}`}
              key={carrier.id}
              onClick={() => onCarrierSelect(carrier.id)}
            >
              <span style={{ textAlign: isAr ? "start" : "end" }}>
                {carrier.name} <br />
                {t("shipping fees")} : {carrier.price} {t("L.E")}
              </span>
              <span className="logo p-1">
                <img src={carrier.logo} alt={carrier.name} />
              </span>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
export default CheckoutForm;
