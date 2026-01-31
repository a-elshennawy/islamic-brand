import { FaSearch, FaUser } from "react-icons/fa";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import SideMenu from "./SideMenu";
import { useIsAr } from "../../hooks/useIsAr";
import SideCart from "../SideCart/SideCart";

function Navbar() {
  const isAr = useIsAr();

  return (
    <>
      <nav style={{ direction: isAr ? "rtl" : "ltr" }}>
        <SideMenu />
        <div className="actions" style={{ direction: isAr ? "rtl" : "ltr" }}>
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
