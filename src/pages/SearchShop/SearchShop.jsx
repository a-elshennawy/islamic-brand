import "./SearchShop.css";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../../hooks/useProducts";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import CategoriesBar from "../../components/HomePageComponents/CategoriesBar/CategoriesBar";
import SectionLoader from "../../components/Loaders/SectionLoader";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import { Box, Drawer } from "@mui/material";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import noResultsIcon from "../../assets/images/no-results.svg";
import { FaFilter } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const MAX = 2000;
const MIN = 0;

function SearchShop() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const [open, setOpen] = useState(false);
  const { isMobile } = useMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, data, isLoading } = useSearchProducts();

  const name = searchParams.get("search");
  const priceRange = searchParams.get("price_range");

  const [val, setVal] = useState(() =>
    priceRange ? priceRange.split("-").map(Number) : [MIN, MAX],
  );

  const currentRange = priceRange
    ? priceRange.split("-").map(Number)
    : [MIN, MAX];
  if (val[0] !== currentRange[0] || val[1] !== currentRange[1]) {
    setVal(currentRange);
  }

  useEffect(() => {
    if (name) {
      mutate({ name, price_range: priceRange });
    }
  }, [name, priceRange, mutate]);

  const handleChange = (_, newValue) => {
    setVal(newValue);
  };

  const handlePriceChange = (_, newValue) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("price_range", `${newValue[0]}-${newValue[1]}`);
    setSearchParams(newParams);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  if (isLoading) return <SectionLoader />;

  return (
    <>
      <title>{`${t("brand_name")} | ${t("search results for")} : ${name}`}</title>
      <Hero />
      <CategoriesBar />
      <section
        className="resultProducts row justify-content-center align-items-start gap-1 m-0 py-2"
        dir={isAr ? "rtl" : "ltr"}
      >
        {isMobile ? (
          <>
            <div className="col-12 py-2">
              <button
                className="mobSideFilterTrigger"
                onClick={toggleDrawer(true)}
              >
                <FaFilter size={20} />
              </button>
            </div>
            <Drawer
              anchor={isAr ? "right" : "left"}
              open={open}
              onClose={toggleDrawer(false)}
              slotProps={{
                paper: {
                  className: "mobFilter p-2",
                  style: { direction: isAr ? "rtl" : "ltr" },
                },
              }}
            >
              <Box sx={{ width: isMobile ? 250 : 350 }} role="presentation">
                <button
                  className="closeBtn"
                  onClick={toggleDrawer(false)}
                  style={isAr ? { left: "0.625rem" } : { right: "0.625rem" }}
                >
                  <MdCancel size={24} />
                </button>
                <div className="content p-2 mt-3">
                  <h4 className="mb-5">{t("filter by price")}</h4>
                  <Box sx={{ width: 200 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" sx={{ cursor: "pointer" }}>
                        {val[1]} {t("highest price")}
                      </Typography>
                      <Typography variant="body2" sx={{ cursor: "pointer" }}>
                        {val[0]} {t("lowest price")}
                      </Typography>
                    </Box>
                    <Slider
                      step={10}
                      value={val}
                      valueLabelDisplay="auto"
                      min={MIN}
                      max={MAX}
                      onChange={handleChange}
                      onChangeCommitted={handlePriceChange}
                      sx={{
                        color: "var(--white)",
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--white)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--white)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--light-sec-color)",
                        },
                      }}
                    />
                  </Box>
                </div>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <div className="col-2">
              <h4 className="mb-3">{t("filter by price")}</h4>
              <Box sx={{ width: 300 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    {val[1]} {t("highest price")}
                  </Typography>
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    {val[0]} {t("lowest price")}
                  </Typography>
                </Box>
                <Slider
                  step={10}
                  value={val}
                  valueLabelDisplay="auto"
                  min={MIN}
                  max={MAX}
                  onChange={handleChange}
                  onChangeCommitted={handlePriceChange}
                  sx={{
                    color: "var(--secondary-color)",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "var(--secondary-color)",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "var(--secondary-color)",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "var(--light-sec-color)",
                    },
                  }}
                />
              </Box>
            </div>
          </>
        )}

        <div className="col-xl-9 col-lg-9 col-md-10 col-sm-12 col-12 row justify-content-center align-items-center gap-1 m-0">
          {data?.length > 0 ? (
            data?.map((product) => (
              <ProductCard
                product={product}
                className="col-xl-2 col-lg-2 col-md-3 col-sm-5 col-5"
                key={product.id}
              />
            ))
          ) : (
            <div className="row justify-content-center align-items-center m-0 text-center py-2">
              <div className="iconContainer p-0 mb-3">
                <img
                  src={noResultsIcon}
                  alt="no results available"
                  loading="lazy"
                  style={{ width: isMobile ? "80%" : "15%" }}
                />
              </div>
              <h4>{t("nothing to view")}</h4>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchShop;
