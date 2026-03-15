import "./Layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollBar from "../ScrollBar/ScrollBar";
import UpBtn from "../UpBtn/UpBtn";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSettings } from "../../hooks/useGeneral";
import TopBar from "./TopBar";
import MobileBottomBar from "./MobileBottomBar";
import Loader from "../Loaders/Loader";
import useMobile from "../../hooks/useMobile";
import ClarityScript from "../../utils/Clarity/ClarityScript";

function Layout() {
  const { data, isLoading } = useSettings();
  const location = useLocation();
  const prevPathname = useRef(location.pathname);
  const { isMobile } = useMobile();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    prevPathname.current = location.pathname;
  }, [location.pathname, location.key]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ClarityScript data={data} />
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
