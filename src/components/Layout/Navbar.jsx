import { FaUser } from "react-icons/fa";
import SideMenu from "./SideMenu";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import SideCart from "../SideCart/SideCart";
import Search from "../Search/Search";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import whiteLogo from "/white_logo.png";

function Navbar() {
  const isAr = useIsAr();
  const { isMobile } = useMobile();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <div className="navContainer">
        <nav
          dir={isAr ? "rtl" : "ltr"}
          style={{ width: isMobile ? "90%" : "70%" }}
        >
          <div className="actions" dir={isAr ? "rtl" : "ltr"}>
            <SideMenu />
            {!isMobile && <Search />}
          </div>
          {!isMobile && (
            <div className="logo" onClick={() => navigate("/")}>
              <img src={whiteLogo} alt="white logo" />
            </div>
          )}
          <div className="actions" dir={isAr ? "rtl" : "ltr"}>
            {!isMobile && (
              <>
                <button
                  className="actionBtn"
                  onClick={() =>
                    navigate(`${isAuthenticated ? "/profile" : "/auth"}`)
                  }
                >
                  <FaUser size={18} />
                </button>
              </>
            )}
            <SideCart />
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
