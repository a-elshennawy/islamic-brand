import { useState } from "react";
import { useTranslation } from "react-i18next";
import VariationAddToCartBtn from "../Products/VariationAddToCartBtn/VariationAddToCartBtn";
import { AnimatePresence, motion as Motion } from "motion/react";
function ProductVariations({ product }) {
  const [t] = useTranslation();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCombination, setSelectedCombination] = useState(null);

  // get all colors
  const allColors = product.grouped_variations.map((group) => group.color);

  const getAvailableSizesForColor = (colorId) => {
    const colorGroup = product.grouped_variations.find(
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
      <div className="productVariationSection py-2">
        <div className="varSection py-2">
          <h5>{t("colors")} :</h5>
          {allColors.map((color) => {
            const isSelected = selectedColor?.id === color.id;
            return (
              <div
                className={`colorOption ${isSelected ? "selected" : ""}`}
                key={color.id}
                onClick={() => handleColorSelect(color)}
              >
                <div
                  className="colorCircle"
                  style={{ backgroundColor: color.value }}
                ></div>
                <span className="colorName">{color.name}</span>
              </div>
            );
          })}
        </div>

        {selectedColor && (
          <div className="varSection py-2">
            <h5>{t("sizes")} :</h5>
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
        <AnimatePresence>
          {selectedCombination && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="variationSelected mt-2 row justify-content-center align-items-start gap-2 m-0"
            >
              <div className="img p-0 col-xl-4 col-lg-4 col-md-10 col-sm-10 col-12">
                <img
                  src={selectedCombination.main_image}
                  alt={`${selectedColor.name} - ${selectedSize.name}`}
                  loading="eager"
                />
              </div>
              <div className="details p-0 col-xl-7 col-lg-7 col-md-10 col-sm-10 col-12">
                <h4>{t("selected_var")}</h4>
                <h5>
                  <strong>{t("color")} : </strong> {selectedColor.name}
                </h5>
                <h5>
                  <strong>{t("size")} : </strong> {selectedSize.name}
                </h5>
                <h5>
                  <strong>{t("price")} : </strong>
                  {selectedCombination.final_price}&nbsp;
                  {t("L.E")}
                </h5>
                <h5>
                  <strong>{t("stock")} :</strong>
                  {selectedCombination.stock === "0"
                    ? t("out_of_stock")
                    : t("in_stock")}
                </h5>
                <VariationAddToCartBtn product={selectedCombination} />
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default ProductVariations;
