import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiMiniLanguage } from "react-icons/hi2";

function LangSwitcher() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <button className="langBtn" onClick={toggleLanguage}>
      {i18n.language === "en" ? "العربية" : "English"}
      <HiMiniLanguage size={24} />
    </button>
  );
}

export default LangSwitcher;
