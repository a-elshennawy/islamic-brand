import logo from "../../assets/images/logo.png";
import "./loaders.css";

function ComponentLoader() {
  return (
    <>
      <div className="compLoader text-center">
        <div className="imgHolder p-0">
          <img src={logo} alt="logo" loading="eager" />
        </div>
      </div>
    </>
  );
}

export default ComponentLoader;
