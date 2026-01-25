import logo from "../../assets/images/logo.png";
import "./loaders.css";

function Loader() {
  return (
    <>
      <div className="Loader text-center">
        <div className="imgHolder p-0">
          <img src={logo} alt="logo" loading="eager" />
        </div>
      </div>
    </>
  );
}

export default Loader;
