import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function BackBtn() {
  const navigate = useNavigate();
  const [t] = useTranslation();
  return (
    <>
      <button className="backBtn" onClick={() => navigate(-1)}>
        {t("back")}
      </button>
    </>
  );
}

export default BackBtn;
