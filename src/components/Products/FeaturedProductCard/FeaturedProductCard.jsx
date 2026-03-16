import "./FeaturedProductCard.css";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { truncateName } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import useMobile from "../../../hooks/useMobile";
import { useIsAr } from "../../../hooks/useIsAr";
import { AnimatePresence, motion as Motion } from "motion/react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function FeaturedProductCard({ product }) {
  const [t] = useTranslation();
  const { isMobile } = useMobile();
  const isAr = useIsAr();
  const navigate = useNavigate();

  const discoutAmount = product?.original_price - product?.discount_price;
  const discountPercentage = (discoutAmount / product?.original_price) * 100;
  return (
    <>
      <AnimatePresence mode="wait">
        <div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="featuredProdCard row justify-content-center align-items-center m-0 p-0"
          style={{
            direction: isAr ? "rtl" : "ltr",
          }}
        >
          <div className="imgContainer col-12 p-0">
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
            <img
              src={product?.main_image}
              alt={product?.name}
              loading="eager"
              style={{ height: isMobile ? "12.5rem" : "18.75rem" }}
            />
            <div className="addToCartDiv p-0">
              <AddToCartBtn product={product} className="featuredCardBtn" />
            </div>
          </div>
          <div
            className="info col-12 p-1"
            style={{ fontSize: isMobile ? "1rem" : "" }}
          >
            <h5
              style={{ fontSize: isMobile ? "1rem" : "" }}
              onClick={() => navigate(`/product-details/${product?.slug}`)}
              className="prodName"
            >
              {truncateName(product?.name, isMobile ? 10 : 15)}
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
              className={`price ${product?.discount_price ? "justify-content-between" : "justify-content-center"}`}
            >
              {product.discount_price ? (
                <>
                  <h4 style={{ fontSize: isMobile ? "1rem" : "" }}>
                    <strong>
                      {product?.discount_price} {t("L.E")}
                    </strong>
                  </h4>

                  <h6>
                    <del>
                      {product?.original_price} {t("L.E")}
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
                      {product?.price} {t("L.E")}
                    </strong>
                  </h4>
                </>
              )}
            </div>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}

export default FeaturedProductCard;
