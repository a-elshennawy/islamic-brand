import useMobile from "../../../hooks/useMobile";
import { truncateName } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddToCartBtn from "../../Products/AddToCartBtn/AddToCartBtn";

function FirstProduct({ product }) {
  const { isMobile } = useMobile();
  const [t] = useTranslation();
  const discoutAmount = product?.original_price - product?.discount_price;
  const discountPercentage = (discoutAmount / product?.original_price) * 100;

  return (
    <>
      <div
        className={`firstProduct col-xl-4 col-lg-4 col-md-12 col-sm-12 col-10 ${isMobile ? "order-1" : ""}`}
      >
        <div className="imgContainer p-0">
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
          <img src={product?.main_image} alt={product?.name} />
        </div>
        <div
          className="info col-12 px-2 pb-2"
          style={{
            bottom: isMobile ? "0.625rem" : "-0.625rem",
            left: isMobile ? "50%" : "1.25rem",
            transform: isMobile ? "translateX(-50%)" : "",
            width: isMobile ? "70%" : "60%",
          }}
        >
          <h5 style={{ fontSize: isMobile ? "1rem" : "" }}>
            {truncateName(product.name, 20)}
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
      </div>
    </>
  );
}
export default FirstProduct;
