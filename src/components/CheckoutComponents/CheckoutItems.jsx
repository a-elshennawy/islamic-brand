import { useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CheckoutItems({ cartItems }) {
  const [t] = useTranslation();
  const [showItems, setShowItems] = useState(false);
  const isAr = useIsAr();
  const navigate = useNavigate();

  return (
    <>
      <div className="checkoutItems">
        <div className="trigger p-2" onClick={() => setShowItems(!showItems)}>
          <h4>{t("order items")}</h4>

          <span
            className={`arrowIcon ${showItems ? (isAr ? "rotateArrowAr" : "rotateArrowEn") : ""}`}
          >
            {isAr ? (
              <MdKeyboardArrowLeft size={30} />
            ) : (
              <MdKeyboardArrowRight size={30} />
            )}
          </span>
        </div>
        <AnimatePresence mode="wait">
          {showItems &&
            cartItems?.map((item) => (
              <Motion.div
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                whileInView={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={item?.id}
                className="checkoutItem p-1 my-1"
                onClick={() =>
                  navigate(`/product-details/${item?.product_slug}`)
                }
              >
                <div className="imgContainer p-0">
                  <img src={item?.main_image} alt={item?.product_name} />
                </div>
                <div className="info">
                  <h5>{item?.product_name}</h5>
                  <h5>
                    {item?.product_price} {t("L.E")}
                  </h5>
                </div>
              </Motion.div>
            ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CheckoutItems;
