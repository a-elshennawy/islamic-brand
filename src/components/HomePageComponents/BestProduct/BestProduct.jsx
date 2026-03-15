import "./BestProduct.css";
import { useHomeProducts } from "../../../hooks/useProducts";
import ProductAddToCartBtn from "../../Products/ProductAddToCartBtn/ProductAddToCartBtn";
import SectionLoader from "../../Loaders/SectionLoader";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import useMobile from "../../../hooks/useMobile";
import { motion as Motion } from "motion/react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useChooseUs } from "../../../hooks/useGeneral";

function BestProduct() {
  const { data: homeProducts, isLoading } = useHomeProducts();
  const { data: chooseUsArray, isLoading: BadgesLoading } = useChooseUs();

  const BestProduct = homeProducts?.best_product || [];
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  if (isLoading) return <SectionLoader />;

  if (!BestProduct) return null;

  return (
    <>
      <Motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bestProduct m-0 p-2"
        dir={isAr ? "rtl" : "ltr"}
        style={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "start",
          width: isMobile ? "85%" : "fit-content",
        }}
      >
        <span
          className={`title ${isAr ? "" : "enTiltle"}`}
          style={isAr ? { left: 0 } : { right: 0 }}
        >
          {t("best_product")}
        </span>
        <div className="imgSide p-0">
          <img
            src={BestProduct.main_image}
            alt={BestProduct.name}
            loading="lazy"
            style={{
              width: isMobile ? "100%" : "21.875rem",
            }}
          />
        </div>
        <div className="detailsSide" dir={isAr ? "rtl" : "ltr"}>
          <h3>{BestProduct.name}</h3>
          <div className="rating py-1">
            <Rating
              name="text-feedback"
              value={BestProduct?.average_rating}
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
          {BestProduct.discount_price ? (
            <>
              <div className="price py-2">
                <h6>
                  {BestProduct.original_price} {t("L.E")}
                </h6>
                <h3>
                  <strong>
                    {BestProduct.discount_price} {t("L.E")}
                  </strong>
                </h3>
              </div>
            </>
          ) : (
            <>
              <div className="price py-2">
                <h3>
                  <strong>
                    {BestProduct.price} {t("L.E")}
                  </strong>
                </h3>
              </div>
            </>
          )}
          <ProductAddToCartBtn product={BestProduct} />
          <div className="badges m-0">
            {chooseUsArray?.map((item) => (
              <div key={item.id} className="p-1 badgeItem">
                <img
                  src={item.image}
                  alt={item.title}
                  style={
                    isMobile
                      ? { width: "5rem", height: "5rem" }
                      : { width: "6.25rem", height: "6.25rem" }
                  }
                />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </Motion.section>
    </>
  );
}

export default BestProduct;
