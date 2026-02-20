import "./Layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollBar from "../ScrollBar/ScrollBar";
import UpBtn from "../UpBtn/UpBtn";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSettings } from "../../hooks/useGeneral";
import TopBar from "./TopBar";
import MobileBottomBar from "./MobileBottomBar";
import Loader from "../Loaders/Loader";
import useMobile from "../../hooks/useMobile";

function Layout() {
  const { data, isLoading } = useSettings();
  const location = useLocation();
  const { isMobile } = useMobile();

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <TopBar />
      <Navbar />
      <ScrollBar />
      <Outlet />
      <UpBtn />
      <Footer settings={data} />
      {isMobile && <MobileBottomBar />}
    </>
  );
}

export default Layout;
