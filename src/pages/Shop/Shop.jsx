import "./Shop.css";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useGeneral";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";

function Shop() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { category_id } = useParams();
  const navigate = useNavigate();
  const currentCategoryId = category_id?.toString();

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

  return (
    <>
      <section className="shopPage">
        <Hero />
        <div
          className="row justify-content-center align-items-start m-0 py-5 "
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          <div
            className="col-xl-2 col-lg-2"
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
          <div className="col-xl-9 col-lg-9 col-md-10 col-sm-10 col-10 row justify-content-center align-items-center m-0 gap-2">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="col-xl-3 col-lg-3 col-md-5 col-sm-5 col-5"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default Shop;
