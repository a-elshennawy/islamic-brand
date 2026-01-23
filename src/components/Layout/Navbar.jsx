import { FaSearch, FaUser } from "react-icons/fa";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <div className="actions">
          <button className="actionBtn">
            <FaUser size={18} />
          </button>
          <button className="actionBtn">
            <RiShoppingBasket2Fill size={24} />
          </button>
          <button className="actionBtn">
            <FaSearch size={18} />
          </button>
        </div>

        <ul className="navList m-0 p-0">
          <li className="navItem">
            <Link to="/">reviews</Link>
          </li>
          <li className="navItem">
            <Link to="/">contacts</Link>
          </li>
          <li className="navItem">
            <Link to="/">discounts</Link>
          </li>
          <li className="navItem">
            <Link to="/">all products</Link>
          </li>
          <li className="navItem">
            <Link to="/">home</Link>
          </li>
        </ul>

        <Link className="logoLink" to="/">
          <img src={logo} alt="logo" loading="lazy" />
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
