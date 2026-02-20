import { FaHome, FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { useIsAr } from "../../hooks/useIsAr";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function MobileBottomBar() {
  const isAr = useIsAr();
  const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="mobileBottomNav"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <div className="mobileNavItem" onClick={() => navigate("/")}>
          <FaHome size={35} />
          <span>{t("home")}</span>
        </div>
        <div
          className="mobileNavItem"
          onClick={() => navigate("/shop/category_id/21")}
        >
          <FaBagShopping size={35} />
          <span>{t("shop")}</span>
        </div>
        <div className="mobileNavItem" onClick={() => navigate("/reviews")}>
          <MdReviews size={35} />
          <span>{t("reviews")}</span>
        </div>
        <div className="mobileNavItem" onClick={() => navigate("/")}>
          <FaUser size={35} />
          <span>{t("account")}</span>
        </div>
      </div>
    </>
  );
}

export default MobileBottomBar;
