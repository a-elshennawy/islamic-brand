import "./Layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollBar from "../ScrollBar/ScrollBar";
import UpBtn from "../UpBtn/UpBtn";

function Layout() {
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
