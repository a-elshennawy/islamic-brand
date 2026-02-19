import "./ProductCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { truncateName } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import useMobile from "../../../hooks/useMobile";
import { AnimatePresence, motion as Motion } from "motion/react";

function ProductCard({ product }) {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  return (
    <>
      <AnimatePresence mode="wait">
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="ProductCard row justify-content-center align-items-center m-0 p-2"
          dir={isAr ? "rtl" : "ltr"}
        >
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="imgContainer p-0 col-12"
          >
            <span
              className="wishlistBtn"
              style={{
                width: isMobile ? "1.25rem" : "2.5rem",
                height: isMobile ? "1.25rem" : "2.5rem",
              }}
            >
              <FaRegHeart size={20} />
            </span>
            {product.discount_price && (
              <>
                <span
                  className="discountBadge"
                  style={{ fontSize: isMobile ? ".625rem" : "" }}
                >
                  {product.original_price} {t("L.E")}
                </span>
              </>
            )}

            <Link
              to={`/product-details/${product.slug}`}
              state={{ item: product }}
            >
              <img
                src={product.main_image}
                alt={product.name}
                loading="eager"
                style={{ height: isMobile ? "12.5rem" : "18.75rem" }}
              />
            </Link>
          </Motion.div>
          <div
            className="info col-12 px-0"
            style={{ fontSize: isMobile ? "1rem" : "" }}
          >
            <h4 style={{ fontSize: isMobile ? "1rem" : "" }}>
              {truncateName(product.name, isMobile ? 15 : 20)}
            </h4>
            {product.discount_price ? (
              <>
                <div className="price">
                  <h4 style={{ fontSize: isMobile ? "1rem" : "" }}>
                    <strong>
                      {product.discount_price} {t("L.E")}
                    </strong>
                  </h4>
                </div>
              </>
            ) : (
              <>
                <h4 style={{ fontSize: isMobile ? "1rem" : "" }}>
                  <strong>
                    {product.price} {t("L.E")}
                  </strong>
                </h4>
              </>
            )}
            <AddToCartBtn product={product} />
          </div>
        </Motion.div>
      </AnimatePresence>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
