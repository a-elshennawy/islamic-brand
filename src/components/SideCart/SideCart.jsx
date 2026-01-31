import "./SideCart.css";
import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { MdCancel } from "react-icons/md";
import { useIsAr } from "../../hooks/useIsAr";
import { useTranslation } from "react-i18next";
import { RiShoppingBasket2Fill } from "react-icons/ri";

function SideCart() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <button className="actionBtn" onClick={toggleDrawer(true)}>
        <RiShoppingBasket2Fill size={24} />
      </button>

      <Drawer
        anchor={isAr ? "left" : "right"}
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            className: "sideCart p-2",
          },
        }}
      >
        <Box sx={{ width: 350 }} role="presentation">
          <div className="sideCartheader">
            <button
              className="closeBtn"
              onClick={toggleDrawer(false)}
              style={isAr ? { right: "0.625rem" } : { left: "0.625rem" }}
            >
              <MdCancel size={24} />
            </button>
          </div>
        </Box>
      </Drawer>
    </>
  );
}

export default SideCart;
