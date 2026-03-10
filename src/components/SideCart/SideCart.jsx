import "./SideCart.css";
import { useState, useEffect, useRef } from "react";
import { Box, Drawer } from "@mui/material";
import { MdCancel } from "react-icons/md";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import { useTranslation } from "react-i18next";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import {
  useGetCart,
  useGetCartSummary,
  useRemoveCartItem,
} from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import QuantityChange from "../Products/QuantityChange/QuantityChange";
import { IoColorPaletteOutline, IoResizeSharp, IoTrash } from "react-icons/io5";
import { AnimatePresence, motion as Motion } from "motion/react";

function SideCart() {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();
  const [open, setOpen] = useState(false);

  const {
    data: cart,
    isLoading: cartLoading,
    isError: cartError,
  } = useGetCart();
  const {
    data: cartSummary,
    isLoading: cartSummaryLoading,
    isError: cartSummaryError,
  } = useGetCartSummary();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const removeCartItem = useRemoveCartItem();

  const handleRemoveCartItem = (id) => {
    removeCartItem.mutate(id);
  };

  const loading = cartLoading || cartSummaryLoading;
  const error = cartError || cartSummaryError;

  if (loading || error) {
    toggleDrawer(false);
  }

  const prevCountRef = useRef(cart?.items_count);
  const cartItems = cart?.items;
  const cartCount = cart?.items_count;
  const subtotal = cartSummary?.subtotal;

  useEffect(() => {
    if (cart?.items_count > prevCountRef.current) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 0);

      return () => clearTimeout(timer);
    }
    prevCountRef.current = cart?.items_count;
  }, [cart?.items_count]);

  return (
    <>
      <button className="actionBtn sideCartBtn" onClick={toggleDrawer(true)}>
        {cartCount > 0 && <span>{cartCount}</span>}
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
        <Box sx={{ width: isMobile ? 250 : 350 }} role="presentation">
          <div className="sideCartheader text-center mb-3">
            <h2>{t("your cart")}</h2>
            <button
              className="closeBtn p-0"
              onClick={toggleDrawer(false)}
              style={isAr ? { right: "0" } : { left: "0" }}
            >
              <MdCancel size={24} />
            </button>
          </div>
          <div className="sideCartContent">
            {cartItems?.length === 0 ? (
              <>
                <EmptyCart />
              </>
            ) : (
              <>
                {cartItems?.map((item) => (
                  <div
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key={item?.id}
                    className={`sideCartItem my-1 p-1 ${isAr ? "justify-content-start" : "justify-content-start"}`}
                    style={{ direction: isAr ? "rtl" : "ltr" }}
                  >
                    <div
                      className="imgContainer p-0"
                      onClick={() => {
                        navigate(`/product-details/${item?.product_slug}`);
                        setOpen(false);
                      }}
                    >
                      <img
                        src={item?.main_image}
                        alt={item?.product_name}
                        loading="lazy"
                      />
                    </div>
                    <div className="info">
                      <h6
                        className="m-0"
                        onClick={() => {
                          navigate(`/product-details/${item?.product_slug}`);
                          setOpen(false);
                        }}
                      >
                        {item?.product_name}
                      </h6>
                      <span className="variation">
                        <small>
                          {item?.color_name} <IoColorPaletteOutline /> -
                          {item?.size_value} <IoResizeSharp />
                        </small>
                      </span>
                      <br />
                      <span className="price">
                        <strong>
                          {item?.final_price} {t("L.E")}
                        </strong>
                      </span>
                      <QuantityChange id={item?.id} quantity={item?.quantity} />
                    </div>

                    <button
                      className="deleteBtn p-0"
                      onClick={() => handleRemoveCartItem(item?.id)}
                      style={isAr ? { left: "0" } : { right: "0" }}
                    >
                      <IoTrash size={20} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          <AnimatePresence mode="wait">
            {cartItems?.length > 0 && (
              <Motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="sideCartFooter p-1 pt-0 text-center"
              >
                <h4 className="mb-1">
                  {t("total")} : {subtotal} {t("L.E")}
                </h4>
                <div className="btns p-2">
                  <button
                    className="toCartBtn"
                    onClick={() => {
                      navigate("/cart");
                      setOpen(false);
                    }}
                  >
                    {t("view cart")}
                  </button>
                  <button
                    className="toCheckoutBtn"
                    onClick={() => {
                      navigate("/checkout");
                      setOpen(false);
                    }}
                  >
                    {t("checkout")}
                  </button>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Drawer>
    </>
  );
}

export default SideCart;
