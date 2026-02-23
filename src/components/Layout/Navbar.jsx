import { FaSearch, FaUser } from "react-icons/fa";
import SideMenu from "./SideMenu";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import SideCart from "../SideCart/SideCart";
import Search from "../Search/Search";

function Navbar() {
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  return (
    <>
      <div className="navContainer">
        <nav
          dir={isAr ? "rtl" : "ltr"}
          style={{ width: isMobile ? "90%" : "70%" }}
        >
          <SideMenu />

          <div className="actions" dir={isAr ? "rtl" : "ltr"}>
            <Search />
            <SideCart />
            <button className="actionBtn">
              <FaUser size={18} />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
