import { FaSearch, FaUser } from "react-icons/fa";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import SideMenu from "./SideMenu";
import { useIsAr } from "../../hooks/useIsAr";

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
          <button className="actionBtn">
            <RiShoppingBasket2Fill size={24} />
          </button>
          <button className="actionBtn">
            <FaUser size={18} />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
