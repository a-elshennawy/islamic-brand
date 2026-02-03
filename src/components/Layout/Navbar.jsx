import { FaSearch, FaUser } from "react-icons/fa";
import SideMenu from "./SideMenu";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import SideCart from "../SideCart/SideCart";
import logo from "/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  return (
    <>
      <nav dir={isAr ? "rtl" : "ltr"}>
        <SideMenu />
        {!isMobile && (
          <Link to="/" className="navLogo">
            <img src={logo} alt="logo" loading="lazy" />
          </Link>
        )}

        <div className="actions" dir={isAr ? "rtl" : "ltr"}>
          <button className="actionBtn">
            <FaSearch size={18} />
          </button>
          <SideCart />
          <button className="actionBtn">
            <FaUser size={18} />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
