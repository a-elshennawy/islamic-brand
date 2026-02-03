import "./VariationAddToCartBtn.css";
import { IoMdCart } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import { useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";

function VariationAddToCartBtn({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [t] = useTranslation();
  const isAr = useIsAr();

  return (
    <>
      <button
        className="variationAddToCartBtn mt-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Motion.div
          className="button-content"
          key={isHovered ? "icon" : "text"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {isHovered ? (
              <Motion.span
                key="icon"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <IoMdCart size={24} />
              </Motion.span>
            ) : (
              <Motion.span
                key="text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {t("add_to_cart")}
              </Motion.span>
            )}
          </AnimatePresence>
        </Motion.div>
      </button>
    </>
  );
}

export default VariationAddToCartBtn;
