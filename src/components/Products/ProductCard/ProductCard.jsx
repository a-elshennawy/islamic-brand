import "./ProductCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { truncateName } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import useMobile from "../../../hooks/useMobile";
import { useIsAr } from "../../../hooks/useIsAr";
import { AnimatePresence, motion as Motion } from "motion/react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function ProductCard({ product, className, style }) {
  const [t] = useTranslation();
  const { isMobile } = useMobile();
  const isAr = useIsAr();
  const discoutAmount = product?.original_price - product?.discount_price;
  const discountPercentage = (discoutAmount / product?.original_price) * 100;

  return (
    <>
      <AnimatePresence mode="wait">
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`ProductCard row justify-content-center align-items-center m-0 p-2 ${className}`}
          dir={isAr ? "rtl" : "ltr"}
          style={{ ...style }}
        >
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="imgContainer p-0 col-12"
          >
            {product.discount_price && (
              <>
                <span
                  className="discountBadge"
                  style={{ fontSize: isMobile ? ".625rem" : "" }}
                >
                  {discountPercentage.toFixed(0)}% -
                </span>
              </>
            )}

            <Link
              to={`/product-details/${product?.slug}`}
              state={{ item: product }}
            >
              <img
                src={product?.main_image}
                alt={product?.name}
                loading="eager"
                style={{ height: isMobile ? "12.5rem" : "18.75rem" }}
              />
            </Link>
          </Motion.div>
          <div
            className="info col-12 p-0"
            style={{ fontSize: isMobile ? "1rem" : "" }}
          >
            <h5 style={{ fontSize: isMobile ? "1rem" : "" }}>
              {truncateName(product.name, 12)}
            </h5>

            <div className="rating p-0">
              <Rating
                name="text-feedback"
                value={product?.average_rating}
                readOnly
                precision={1}
                size="small"
                emptyIcon={
                  <StarBorderIcon style={{ opacity: 0.4 }} fontSize="inherit" />
                }
                sx={{
                  fontSize: "1rem",
                  "& .MuiRating-iconFilled": {
                    fontSize: "inherit",
                  },
                  "& .MuiRating-iconEmpty": {
                    fontSize: "inherit",
                  },
                }}
              />
            </div>
            <div
              className={`price ${product.discount_price ? "justify-content-between" : "justify-content-center"}`}
            >
              {product.discount_price ? (
                <>
                  <h4 style={{ fontSize: isMobile ? "1rem" : "" }}>
                    <strong>
                      {product.discount_price} {t("L.E")}
                    </strong>
                  </h4>

                  <h6>
                    <del>
                      {product.original_price} {t("L.E")}
                    </del>
                  </h6>
                </>
              ) : (
                <>
                  <h4
                    style={{
                      fontSize: isMobile ? "1rem" : "",
                    }}
                  >
                    <strong>
                      {product.price} {t("L.E")}
                    </strong>
                  </h4>
                </>
              )}
            </div>

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
