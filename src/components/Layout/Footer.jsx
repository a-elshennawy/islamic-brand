import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { motion as Motion } from "motion/react";

function Footer({ settings }) {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  return (
    <>
      <Motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`row justify-content-center align-items-start m-0 py-2 ${isMobile ? "gap-3" : "gap-1"}`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div
          className={`footerCol col-xl-3 col-lg-3 col-md-4 col-sm-10 col-12 ${isMobile ? "text-center" : ""}`}
        >
          <h4>{t("contact_info")}</h4>
          <p className="m-0">
            {t("contact_info_text")} <br /> {settings?.email}
          </p>
          <p>{settings?.phone}</p>
          <div className="socialMedia">
            <p className="mb-0">{t("social_media")} :</p>
            <div
              className={`links py-2 ${isMobile ? "justify-content-center" : ""}`}
            >
              <span>
                <Link to={settings?.facebook} target="_blank">
                  <FaFacebookF size={20} />
                </Link>
              </span>
              <span>
                <Link to={settings?.instagram} target="_blank">
                  <FaInstagram size={20} />
                </Link>
              </span>
              <span>
                <Link to={settings?.tiktok} target="_blank">
                  <FaTiktok size={20} />
                </Link>
              </span>
              <span>
                <Link
                  to={`https://wa.me/${settings?.whatsapp}`}
                  target="_blank"
                >
                  <FaWhatsapp size={20} />
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`footerCol col-xl-3 col-lg-3 col-md-3 col-sm-10 col-12 ${isMobile ? "text-center" : ""}`}
        >
          <h4>{t("address")}</h4>
          <p className="m-0">
            {settings?.address} - {settings?.street}
          </p>
          <p className="m-0">
            {settings?.day_from} - {settings?.day_to}
          </p>
          <p className="m-0">
            {settings?.available_from} - {settings?.available_to}
          </p>
        </div>
        <div
          className={`footerCol col-xl-3 col-lg-3 col-md-4 col-sm-10 col-12 ${isMobile ? "text-center" : ""}`}
        >
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
            <Link to="/privacy-policy">{t("privacy_policy")}</Link>|
            <Link to="/exchange-return">{t("return_policy")}</Link>
          </div>
          <p>{t("copyRights")}</p>
        </div>
      </Motion.footer>
    </>
  );
}

export default Footer;
