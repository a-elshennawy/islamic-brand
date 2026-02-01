import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

function Footer() {
  const [t] = useTranslation();
  const isAr = useIsAr();

  return (
    <>
      <footer
        className="row justify-content-center align-items-start gap-1 m-0 py-2"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="footerCol col-xl-3 col-lg-3 col-md-4 col-sm-10 col-12">
          <h4>{t("contact_info")}</h4>
          <p>{t("contact_info_text")}</p>
          <p>{t("phone_number")}</p>
          <div className="socialMedia">
            <p className="mb-0">{t("social_media")} :</p>
            <div className="links py-2">
              <span>
                <Link to="/" target="_blank">
                  <FaFacebookF />
                </Link>
              </span>
              <span>
                <Link to="/" target="_blank">
                  <FaInstagram />
                </Link>
              </span>
              <span>
                <Link to="/" target="_blank">
                  <FaTiktok />
                </Link>
              </span>
              <span>
                <Link to="https://wa.me/201026555479" target="_blank">
                  <FaWhatsapp />
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="footerCol col-xl-3 col-lg-3 col-md-3 col-sm-10 col-12">
          <h4>{t("address")}</h4>
          <p>{t("location")}</p>
          <p>{t("working_hours")}</p>
        </div>
        <div className="footerCol col-xl-3 col-lg-3 col-md-4 col-sm-10 col-12">
          <h4>{t("subscribe_to_newsteller")}</h4>
          <p>{t("susbcribe_text")}</p>
          <form dir={isAr ? "rtl" : "ltr"}>
            <div className="inputContainer p-0">
              <button
                className="submitBtn"
                type="submit"
                style={isAr ? { right: "0.313rem" } : { left: "0.313rem" }}
              >
                {t("subscribe")}
              </button>
              <input type="email" placeholder={t("enter_email")} />
            </div>
          </form>
        </div>
        <hr />
        <div className="footerCol col-12 text-center py-2">
          <div className="pageLinks pb-4">
            <Link to="/">{t("privacy_policy")}</Link>|
            <Link to="/">{t("return_policy")}</Link>
          </div>
          <p>{t("copyRights")}</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
