import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
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
            <FaShoppingBag size={18} />
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
