import "./ProductCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { truncateName } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import useMobile from "../../../hooks/useMobile";
import { AnimatePresence, motion as Motion } from "motion/react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function ProductCard({ product, className }) {
  const [t] = useTranslation();
  const { isMobile } = useMobile();

  console.log(product);

  return (
    <>
      <AnimatePresence mode="wait">
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`ProductCard row justify-content-center align-items-center m-0 p-0 ${className}`}
          dir="ltr"
        >
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="imgContainer p-2 col-12"
          >
            <span className="wishlistBtn">
              <span className="btn">
                <FaRegHeart size={isMobile ? 20 : 25} />
              </span>
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
            className="info col-12 px-2"
            style={{ fontSize: isMobile ? "1rem" : "" }}
          >
            <h5 style={{ fontSize: isMobile ? "1rem" : "" }}>
              {truncateName(product.name, isMobile ? 15 : 20)}
            </h5>
            {product?.reviews_count > 0 && (
              <div className="rating p-0">
                <Rating
                  name="text-feedback"
                  value={product?.average_rating}
                  readOnly
                  precision={1}
                  size="small"
                  emptyIcon={
                    <StarBorderIcon
                      style={{ opacity: 0.4 }}
                      fontSize="inherit"
                    />
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
            )}

            {product.discount_price ? (
              <>
                <div className="price">
                  <h5 style={{ fontSize: isMobile ? "1rem" : "" }}>
                    <strong>
                      {product.discount_price} {t("L.E")}
                    </strong>
                  </h5>
                </div>
              </>
            ) : (
              <>
                <h5 style={{ fontSize: isMobile ? "1rem" : "" }}>
                  <strong>
                    {product.price} {t("L.E")}
                  </strong>
                </h5>
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
