import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function ToHomeBtn() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <button className="toHomeBtn" onClick={() => navigate("/")}>
        {t("home")}
      </button>
    </>
  );
}

export default ToHomeBtn;
