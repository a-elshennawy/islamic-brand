import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { ImMenu } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useCategories } from "../../hooks/useGeneral";
import { FaHome } from "react-icons/fa";
import {
  MdCategory,
  MdReviews,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbLogin, TbLogin2 } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import LangSwitcher from "./LangSwitcher";

function SideMenu() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const [open, setOpen] = useState(false);
  const [catDropOpen, setCatDropOpen] = useState(false);
  const { data: categories } = useCategories();
  const categoriesArray = Array.isArray(categories) ? categories : [];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <button className="sideMenuBtn" onClick={toggleDrawer(true)}>
        <ImMenu size={24} />
      </button>
      <Drawer
        anchor={isAr ? "right" : "left"}
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            className: "sideMenu p-2",
            style: { direction: isAr ? "rtl" : "ltr" },
          },
        }}
      >
        <Box sx={{ width: 350 }} role="presentation">
          <div className="SideMenuHeader p-0">
            <img src={logo} alt="islamic brand logo" loading="lazy" />
            <button
              className="closeBtn"
              onClick={toggleDrawer(false)}
              style={isAr ? { left: "0.625rem" } : { right: "0.625rem" }}
            >
              <MdCancel size={24} />
            </button>
          </div>
          <div className="sideMenuContent">
            <ul className="sideMenuList p-0">
              <li className="sideMenuListItem my-2">
                <Link className="sideMenuLink" to="/">
                  {t("home")} <FaHome size={20} />
                </Link>
              </li>
              <li
                className="sideMenuListItem d-flex justify-content-between align-items-center mt-2 mb-1"
                onClick={() => setCatDropOpen(!catDropOpen)}
              >
                <span>
                  {t("categories")} <MdCategory size={20} />
                </span>
                <span
                  className={`arrowIcon ${catDropOpen ? (isAr ? "rotateArrowAr" : "rotateArrowEn") : ""}`}
                >
                  {isAr ? (
                    <MdKeyboardArrowLeft size={30} />
                  ) : (
                    <MdKeyboardArrowRight size={30} />
                  )}
                </span>
              </li>
              <AnimatePresence>
                {catDropOpen && (
                  <>
                    <Motion.ul
                      initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="categoriesList p-1"
                    >
                      {categoriesArray.map((category) => (
                        <li className="sideMenuListItem my-1" key={category.id}>
                          <Link className="sideMenuLink" to="/">
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </Motion.ul>
                  </>
                )}
              </AnimatePresence>
              <li className="sideMenuListItem my-2">
                <Link className="sideMenuLink" to="/">
                  {t("contacts")} <BiSupport size={20} />
                </Link>
              </li>
              <li className="sideMenuListItem my-2">
                <Link className="sideMenuLink" to="/">
                  {t("discounts")} <RiDiscountPercentFill size={20} />
                </Link>
              </li>
              <li className="sideMenuListItem my-2">
                <Link className="sideMenuLink" to="/">
                  {t("reviews")} <MdReviews size={20} />
                </Link>
              </li>
              <li className="sideMenuListItem my-2">
                <Link className="sideMenuLink" to="/">
                  {t("register_login")}{" "}
                  {isAr ? <TbLogin size={20} /> : <TbLogin2 size={20} />}
                </Link>
              </li>
            </ul>
            <LangSwitcher />
          </div>
        </Box>
      </Drawer>
    </>
  );
}

export default SideMenu;
