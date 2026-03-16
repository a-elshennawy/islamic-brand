import { LuUserRound } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import { TbLogin, TbLogin2 } from "react-icons/tb";
import { GiShoppingBag } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { useLogout } from "../../hooks/useAuth";

function SideBar({ user, onChange, currentTab }) {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { mutate: handleLogout, isPending } = useLogout();

  return (
    <>
      <div
        className="profileBar col-xl-2 col-lg-3 col-md-10 col-sm-10 col-10 p-2 text-center"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <LuUserRound size={60} />
        <h2>{user?.name}</h2>
        <h6>{user?.email}</h6>
        <h6>{user?.whatsapp}</h6>
        <h6>
          {t("referrer code")} : {user?.referrer_code}
        </h6>
        <h6>
          {t("loyalty points")} : {user?.loyalty_points}
        </h6>
        <div className="tabActions py-2">
          <button
            className={`${currentTab === "wishlist" ? "activeTab" : ""}`}
            onClick={() => onChange("wishlist")}
          >
            {t("wishlist")} <FaHeart size={20} />
          </button>
          <button
            className={`${currentTab === "previousOrder" ? "activeTab" : ""}`}
            onClick={() => onChange("previousOrder")}
          >
            {t("previous orders")} <GiShoppingBag size={20} />
          </button>
          <button onClick={() => handleLogout()} disabled={isPending}>
            {t("logout")}
            {isAr ? <TbLogin size={20} /> : <TbLogin2 size={20} />}
          </button>
        </div>
      </div>
    </>
  );
}
export default SideBar;
