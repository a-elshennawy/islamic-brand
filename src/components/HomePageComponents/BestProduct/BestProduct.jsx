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
import { useState } from "react";
import VariationBtn from "./VariationBtn";

function BestProduct() {
  const { data: homeProducts, isLoading: dataLoading } = useHomeProducts();
  const { data: chooseUsArray, isLoading: BadgesLoading } = useChooseUs();
  const BestProduct = homeProducts?.best_product || [];
  const { data: product, isLoading: peoductLoading } = useProduct(
    BestProduct?.slug,
  );
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCombination, setSelectedCombination] = useState(null);

  const availableColors = product?.grouped_variations;
  const loading = dataLoading || BadgesLoading || peoductLoading;

  if (loading) return <SectionLoader />;

  if (!BestProduct) return null;

  const getAvailableSizesForColor = (colorId) => {
    const colorGroup = product?.grouped_variations?.find(
      (group) => group.color.id === colorId,
    );
    return colorGroup ? colorGroup.sizes : [];
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setSelectedCombination(null);
  };

  const handleSizeSelect = (size, combination) => {
    setSelectedSize(size);
    setSelectedCombination(combination);
  };

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
        <div
          className={`inner p-2  row justify-content-between align-items-start gap-1 m-0 ${isMobile ? "" : "pb-0"}`}
          style={{ position: isMobile ? "" : "relative" }}
        >
          <div
            className={`infoSide py-3 px-0 col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12 text-center ${isMobile ? "order-2" : ""}`}
          >
            <h1>{t("always the best choice")}</h1>
            <h1>{product?.name}</h1>
            <div
              className={`price ${isMobile ? "" : "py-3"}`}
              style={{
                flexDirection: isMobile ? "column" : "",
                gap: isMobile ? "" : "1.25rem",
              }}
            >
              <h1 className={`${isMobile ? "order-2" : "m-0"}`}>
                {product?.price} {t("L.E")}
              </h1>
              <h3 className={`${isMobile ? "order-1" : "m-0"}`}>
                <del>
                  {product?.original_price} {t("L.E")}
                </del>
              </h3>
            </div>

            {/* select color */}
            <div className="colors py-3">
              {availableColors?.map((group) => {
                const color = group?.color;
                const isSelected = selectedColor?.id === color?.id;

                return (
                  <div
                    key={color?.id}
                    className={`colorItem ${isSelected ? "selected" : ""}`}
                    style={{ backgroundColor: color?.value, cursor: "pointer" }}
                    onClick={() => handleColorSelect(color)}
                  ></div>
                );
              })}
            </div>

            {/* select size */}
            {selectedColor && (
              <div className="sizes py-3">
                {getAvailableSizesForColor(selectedColor.id).map((sizeItem) => {
                  const isSelected = selectedSize?.id === sizeItem.id;
                  const isOutOfStock = sizeItem.combination.stock === "0";

                  return (
                    <button
                      className={`sizeBtn ${isSelected ? "selected" : ""} ${
                        isOutOfStock ? "out-of-stock-size" : ""
                      }`}
                      key={sizeItem.combination.id}
                      onClick={() =>
                        !isOutOfStock &&
                        handleSizeSelect(sizeItem, sizeItem.combination)
                      }
                      disabled={isOutOfStock}
                    >
                      {sizeItem.name}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="rating py-1">
              <Rating
                name="text-feedback"
                value={product?.average_rating}
                readOnly
                precision={1}
                size="large"
                emptyIcon={
                  <StarBorderIcon style={{ opacity: 1 }} fontSize="inherit" />
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

            {product?.has_variations ? (
              <VariationBtn
                mainProduct={product}
                product={selectedCombination}
                productId={product.id}
              />
            ) : (
              <AddToCartBtn
                product={product}
                className="bestProdBtn my-1 mx-auto"
              />
            )}
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

          <div
            className="col-12 row justify-content-center align-items-center gap-2 mt-3 mx-0 order-3"
            style={isMobile ? {} : { position: "sticky", bottom: "0" }}
          >
            {chooseUsArray?.map((item) => (
              <div
                key={item?.id}
                className={`trustBadge col-xl-2 col-lg-2 col-md-5 col-sm-5 col-5 ${isMobile ? "inMobileBadge" : ""}`}
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
