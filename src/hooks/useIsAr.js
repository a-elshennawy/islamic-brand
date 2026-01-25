import { useTranslation } from "react-i18next";

export const useIsAr = () => {
  const { i18n } = useTranslation();
  return i18n.language === "ar";
};
