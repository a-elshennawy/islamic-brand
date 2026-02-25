import { HiSearch } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useIsAr } from "../../hooks/useIsAr";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MobileBottomBar() {
  const isAr = useIsAr();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-shop?search=${searchTerm}`);
    }
  };

  return (
    <>
      <div className="mobContainer py-2">
        <div
          className="mobileBottomNav"
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          <div
            className="mobileNavItem"
            onClick={() => navigate("/shop/category_id/21")}
          >
            <MdOutlineShoppingBag size={28} />
          </div>

          <div className="searchBox">
            <form onSubmit={handleSearch} className="p-0 text-center">
              <div className="searchContainer">
                <input
                  type="search"
                  required
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("search products")}
                />
                <span
                  type="submit"
                  className="searchBtn m-0"
                  style={isAr ? { left: "10%" } : { right: "-5%" }}
                >
                  <HiSearch size={20} />
                </span>
              </div>
            </form>
          </div>

          <div className="mobileNavItem" onClick={() => navigate("/")}>
            <IoHomeOutline size={28} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileBottomBar;
