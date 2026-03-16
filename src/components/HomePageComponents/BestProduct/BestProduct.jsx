import "./BestProduct.css";
import { useHomeProducts } from "../../../hooks/useProducts";
import SectionLoader from "../../Loaders/SectionLoader";
import AddToCartBtn from "../../Products/AddToCartBtn/AddToCartBtn";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import useMobile from "../../../hooks/useMobile";
import { motion as Motion } from "motion/react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useChooseUs } from "../../../hooks/useGeneral";
import { useProduct } from "../../../hooks/useProducts";

function BestProduct() {
  const { data: homeProducts, isLoading } = useHomeProducts();
  const { data: chooseUsArray, isLoading: BadgesLoading } = useChooseUs();
  const BestProduct = homeProducts?.best_product || [];
  const { data: product } = useProduct(BestProduct?.slug || "");
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();
  const availableColors = product?.grouped_variations;

  if (isLoading) return <SectionLoader />;

  if (!BestProduct) return null;

  console.log(chooseUsArray);

  return (
    <>
      <Motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bestProduct mx-auto p-2"
        dir={isAr ? "rtl" : "ltr"}
        style={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "start",
          width: isMobile ? "85%" : "70%",
        }}
      >
        <div className="inner p-2 pb-0 row justify-content-between align-items-start gap-1 m-0">
          <div
            className={`infoSide py-3 px-0 col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12 text-center ${isMobile ? "order-2" : ""}`}
          >
            <h1>{t("always the best choice")}</h1>
            <h1>{product?.name}</h1>
            <div className="rating py-1">
              <Rating
                name="text-feedback"
                value={product?.average_rating}
                readOnly
                precision={1}
                size="large"
                emptyIcon={
                  <StarBorderIcon style={{ opacity: 0.4 }} fontSize="inherit" />
                }
                sx={{
                  fontSize: "2rem",
                  "& .MuiRating-iconFilled": {
                    fontSize: "inherit",
                  },
                  "& .MuiRating-iconEmpty": {
                    fontSize: "inherit",
                  },
                }}
              />
            </div>
            <h3>
              <del>
                {product?.original_price} {t("L.E")}
              </del>
            </h3>
            <h2>
              {product?.price} {t("L.E")}
            </h2>
            <AddToCartBtn
              product={product}
              className="bestProdBtn my-3 mx-auto"
            />
            <div className="colors py-2">
              {availableColors?.map((color) => {
                const colorVal = color?.color?.value;

                return (
                  <div
                    key={colorVal}
                    className="colorItem"
                    style={{ backgroundColor: colorVal }}
                  ></div>
                );
              })}
            </div>
          </div>

          <div
            className={`imgContainer p-0 col-xl-3 col-lg-3 col-md-10 col-sm-12 col-12 ${isMobile ? "order-1" : ""}`}
          >
            <img
              src={product?.main_image}
              alt={product?.name}
              loading="eager"
            />
          </div>

          <div className="col-12 row justify-content-center align-items-center gap-2 mt-3 mx-0 order-3">
            {chooseUsArray?.map((item) => (
              <div
                key={item?.id}
                className={`trustBadge py-3 col-xl-2 col-lg-2 col-md-5 col-sm-5 col-5 ${isMobile ? "inMobileBadge" : ""}`}
              >
                <img
                  src={item?.image}
                  alt={item?.title}
                  style={{
                    width: isMobile ? "3.75rem" : "5rem",
                    height: isMobile ? "3.75rem" : "5rem",
                  }}
                />
                <h5>{item?.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </Motion.section>
    </>
  );
}

export default BestProduct;
