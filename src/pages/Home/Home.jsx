import BestProduct from "../../components/HomePageComponents/BestProduct/BestProduct";
import Categories from "../../components/HomePageComponents/CategoriesBar/CategoriesBar";
import FeaturedProducts from "../../components/HomePageComponents/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import RecentProducts from "../../components/HomePageComponents/RecentProducts/RecentProducts";
// import Reviews from "../../components/HomePageComponents/Reviews/Reviews";
import { useTranslation } from "react-i18next";
// import WhyUs from "../../components/HomePageComponents/WhyUs/WhyUs";
import ProductsOfCategory from "../../components/HomePageComponents/ProductsOfCategory/ProductsOfCategory";

// available category id => 22 / 26 / 23 / 21

function Home() {
  const [t] = useTranslation();
  return (
    <>
      <title>{t("home_title")}</title>
      <Hero />
      <Categories />
      <RecentProducts />
      <ProductsOfCategory categoryId={21} />
      <BestProduct />
      <ProductsOfCategory categoryId={26} />
      <FeaturedProducts />
      {/* <Reviews />*/}
      <ProductsOfCategory categoryId={23} />
      {/* <WhyUs />*/}
    </>
  );
}

export default Home;
