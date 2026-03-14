import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion as Motion } from "motion/react";
import logo from "/icon_cut.png";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Footer({ settings }) {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(true);

  return (
    <>
      <Motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`row justify-content-center align-items-start m-0 py-2 pb-5 ${isMobile ? "gap-3" : "gap-1"}`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div
          className={`footerCol col-xl-3 col-lg-3 col-md-3 col-sm-10 col-12 ${isMobile ? "text-center order-2" : ""}`}
        >
          <h4
            className={`impLinksTrigger ${isMobile ? "justify-content-center" : ""}`}
            onClick={() => setShowLinks(!showLinks)}
          >
            <span>{t("important links")}</span>
            <span
              className={`arrowIcon ${showLinks ? (isAr ? "rotateArrowAr" : "rotateArrowEn") : ""}`}
            >
              {isAr ? (
                <MdKeyboardArrowLeft size={30} />
              ) : (
                <MdKeyboardArrowRight size={30} />
              )}
            </span>
          </h4>
          <AnimatePresence mode="wait">
            {showLinks && (
              <Motion.ul
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                whileInView={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="importantLinks"
              >
                <li
                  className="linkItem"
                  onClick={() => navigate("/shop/category_id/21")}
                >
                  {t("shop")}
                </li>
                <li className="linkItem" onClick={() => navigate("/discounts")}>
                  {t("discounts")}
                </li>
                <li className="linkItem" onClick={() => navigate("/reviews")}>
                  {t("reviews")}
                </li>
              </Motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`footerCol col-xl-3 col-lg-3 col-md-4 col-sm-10 col-12 ${isMobile ? "text-center order-1" : ""}`}
        >
          <div className="logoContainer">
            <img
              src={logo}
              alt="islamic brand logo"
              loading="lazy"
              style={{ width: isMobile ? "6.25rem" : "9.375rem" }}
            />
          </div>
          <div className="socialMedia">
            <div className={`links py-2 justify-content-center`}>
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
          className={`footerCol col-xl-3 col-lg-3 col-md-4 col-sm-10 col-12 ${isMobile ? "text-center order-3" : ""}`}
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

        <div className="footerCol col-12 text-center py-2 order-4">
          <hr />

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
