import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <div className="actions">
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </div>

        <ul className="navList m-0 p-0">
          <li className="navItem">reviews</li>
          <li className="navItem">contacts</li>
          <li className="navItem">discounts</li>
          <li className="navItem">all products</li>
          <li className="navItem">home</li>
        </ul>

        <Link className="logoLink" to="/">
          <img src={logo} alt="logo" loading="lazy" />
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
