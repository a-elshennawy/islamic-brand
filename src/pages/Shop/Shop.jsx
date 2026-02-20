import "./Shop.css";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useGeneral";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import { FaFilter } from "react-icons/fa";
import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

function Shop() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();
  const { category_id } = useParams();
  const navigate = useNavigate();
  const currentCategoryId = category_id?.toString();
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useProducts(
    {
      category_id: currentCategoryId,
    },
    [currentCategoryId],
  );

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const products = data?.data;

  const handleCategoryClick = (id) => {
    const idString = id?.toString();
    navigate(`/shop/category_id/${idString}`, { replace: true });
  };

  const isChecked = (id) => currentCategoryId === id?.toString();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <section className="shopPage">
        <Hero />
        <div
          className="row justify-content-center align-items-start m-0 py-5 "
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          {isMobile ? (
            <>
              <div className="col-12 py-2">
                <button className="filterBtn" onClick={toggleDrawer(true)}>
                  <FaFilter size={20} />
                </button>
              </div>
              <Drawer
                anchor={isAr ? "right" : "left"}
                open={open}
                onClose={toggleDrawer(false)}
                slotProps={{
                  paper: {
                    className: "sideFilter p-2",
                    style: { direction: isAr ? "rtl" : "ltr" },
                  },
                }}
              >
                <Box sx={{ width: isMobile ? 250 : 350 }} role="presentation">
                  <div className="sideFilterHeader">
                    <button
                      className="closeBtn"
                      onClick={toggleDrawer(false)}
                      style={isAr ? { left: "0" } : { right: "0" }}
                    >
                      <MdCancel size={24} />
                    </button>
                  </div>
                  <div className="sideFilterContent">
                    <h4 className="mb-4">{t("filter by category")}</h4>
                    {categories?.map((category) => (
                      <div
                        className="FilterItem"
                        key={category.id}
                        onClick={() => {
                          handleCategoryClick(category.id);
                          toggleDrawer(false)();
                        }}
                      >
                        <span
                          className={`checkBoxInp ${isChecked(category.id) ? "checked" : ""}`}
                        ></span>
                        <h6>{category?.name}</h6>
                      </div>
                    ))}
                  </div>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <div
                className="col-2 filter p-2"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                <h4 className="mb-4">{t("filter by category")}</h4>
                {categories?.map((category) => (
                  <div
                    className="FilterItem"
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span
                      className={`checkBoxInp ${isChecked(category.id) ? "checked" : ""}`}
                    ></span>
                    <h6>{category?.name}</h6>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="col-xl-9 col-lg-9 col-md-10 col-sm-12 col-12 row justify-content-center align-items-center m-0 gap-1">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="col-xl-2 col-lg-2 col-md-5 col-sm-5 col-5"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default Shop;
