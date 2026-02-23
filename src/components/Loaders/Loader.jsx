import logo from "/icon.png";
import "./loaders.css";
import useMobile from "../../hooks/useMobile";

function Loader() {
  const { isMobile } = useMobile();
  return (
    <>
      <div className="Loader text-center">
        <div className="imgHolder p-0">
          <img
            src={logo}
            alt="logo"
            loading="eager"
            style={{ width: isMobile ? "30%" : "10%" }}
          />
        </div>
      </div>
    </>
  );
}

export default Loader;
