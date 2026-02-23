import { CiUser } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TfiComments } from "react-icons/tfi";
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
          <IoHomeOutline size={28} />
          <span>{t("home")}</span>
        </div>
        <div
          className="mobileNavItem"
          onClick={() => navigate("/shop/category_id/21")}
        >
          <MdOutlineShoppingBag size={28} />
          <span>{t("shop")}</span>
        </div>
        <div className="mobileNavItem" onClick={() => navigate("/reviews")}>
          <TfiComments size={28} />
          <span>{t("reviews")}</span>
        </div>
        <div className="mobileNavItem" onClick={() => navigate("/")}>
          <CiUser size={28} />
          <span>{t("account")}</span>
        </div>
      </div>
    </>
  );
}

export default MobileBottomBar;
