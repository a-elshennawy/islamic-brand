import "./SideCart.css";
import { useState } from "react";
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
    removeCartItem.mutate({ cart_item_id: id });
  };

  const loading = cartLoading || cartSummaryLoading;
  const error = cartError || cartSummaryError;

  if (loading || error) {
    toggleDrawer(false);
  }

  const cartItems = cart?.items;
  const cartCount = cart?.items_count;
  const subtotal = cartSummary?.subtotal;
  // const total = cartSummary?.total;

  console.log("cartItems", cartItems);

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
          <div className="sideCartheader text-center">
            <h2>{t("your cart")}</h2>
            <button
              className="closeBtn"
              onClick={toggleDrawer(false)}
              style={isAr ? { right: "0" } : { left: "0" }}
            >
              <MdCancel size={24} />
            </button>
          </div>
          <div className="sideCartContent">
            {cartItems?.length === 0 ? (
              <></>
            ) : (
              <>
                {cartItems?.map((item) => (
                  <div
                    key={item?.id}
                    className={`sideCartItem my-1 p-1 ${isAr ? "justify-content-start" : "justify-content-start"}`}
                    style={{ direction: isAr ? "rtl" : "ltr" }}
                  >
                    <div
                      className="imgContainer p-0"
                      onClick={() =>
                        navigate(`/product-details/${item?.product_slug}`)
                      }
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
                        onClick={() =>
                          navigate(`/product-details/${item?.product_slug}`)
                        }
                      >
                        {item?.product_name}
                      </h6>
                      <span className="text-muted">
                        <small>
                          {item?.color_name} - {item?.size_value}
                        </small>
                      </span>
                      <br />
                      <span>
                        <strong>
                          {item?.final_price} {t("L.E")}
                        </strong>
                      </span>
                    </div>

                    <button
                      className="closeBtn"
                      onClick={() => handleRemoveCartItem(item?.product_id)}
                      style={isAr ? { left: "0" } : { right: "0" }}
                    >
                      <MdCancel size={24} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="sideCartFooter p-1s text-center">
            <h4 className="mb-1">
              {t("total")} : {subtotal} {t("L.E")}
            </h4>
            <div className="btns p-2">
              <button className="toCartBtn">{t("view cart")}</button>
              <button className="toCheckoutBtn">{t("checkout")}</button>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
}

export default SideCart;
