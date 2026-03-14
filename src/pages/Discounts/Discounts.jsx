import "./Discounts.css";
import { useProducts } from "../../hooks/useProducts";
import SectionLoader from "../../components/Loaders/SectionLoader";
import ProductCard from "../../components/Products/ProductCard/ProductCard";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";

function Discounts() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { data, isLoading } = useProducts();
  const products = data?.data;
  const productsOnDiscount = products?.filter(
    (product) => product.discount_price > 0,
  );

  return (
    <>
      <section className="discountsPage row justify-content-center align-items-center gap-1 m-0">
        {isLoading ? (
          <>
            <SectionLoader />
          </>
        ) : (
          <>
            <Hero />
            <h3 className="HomeSectionTitle mb-3">{t("discounts")}</h3>
            {productsOnDiscount?.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                className={`col-xl-2 col-lg-2 col-md-4 col-sm-5 col-5 my-3 ${isAr ? "text-end" : "text-start"}`}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}

export default Discounts;
