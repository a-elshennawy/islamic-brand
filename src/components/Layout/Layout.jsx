import "./Layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollBar from "../ScrollBar/ScrollBar";
import UpBtn from "../UpBtn/UpBtn";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <ScrollBar />
      <Outlet />
      <UpBtn />
      <Footer />
    </>
  );
}

export default Layout;
