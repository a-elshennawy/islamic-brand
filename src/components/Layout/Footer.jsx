import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
function Footer() {
  const [t] = useTranslation();
  const isAr = useIsAr();

  return (
    <>
      <footer
        className="row justify-content-center align-items-center gap-1 m-0 py-2"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="footerCol col-3">
          <h4>{t("contact_info")}</h4>
          <p>{t("contact_info_text")}</p>
          <p>{t("phone_number")}</p>
          <div className="socialMedia">
            <p>{t("social_media")} :</p>
          </div>
        </div>
        <div className="footerCol col-3"></div>
        <div className="footerCol col-3"></div>
        <div className="footerCol col-12"></div>
      </footer>
    </>
  );
}

export default Footer;
