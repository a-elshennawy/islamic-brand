import { useTranslation } from "react-i18next";
import walletIcon from "../../assets/icons/wallet.svg";
import creditCardIcon from "../../assets/icons/contactless.svg";

function PaymentMethods() {
  const [t] = useTranslation();
  return (
    <>
      <div className="paymentMethods">
        <h4>{t("select payment method")}</h4>
        <div className="selectors pt-2">
          <button>
            {t("credit card")}
            <span>
              <img src={creditCardIcon} alt="credit card" />
            </span>
          </button>
          <button>
            {t("wallet")}
            <span>
              <img src={walletIcon} alt="wallet" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentMethods;
