import BestProduct from "../../components/HomePageComponents/BestProduct/BestProduct";
import Categories from "../../components/HomePageComponents/CategoriesBar/CategoriesBar";
import FeaturedProducts from "../../components/HomePageComponents/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import Line from "../../components/HomePageComponents/Line/Line";
import RecentProducts from "../../components/HomePageComponents/RecentProducts/RecentProducts";
// import Reviews from "../../components/HomePageComponents/Reviews/Reviews";
import { useTranslation } from "react-i18next";
import WhyUs from "../../components/HomePageComponents/WhyUs/WhyUs";
import ProductsOfCategory from "../../components/HomePageComponents/ProductsOfCategory/ProductsOfCategory";

// available category id => 22 / 26 / 23 / 21

function Home() {
  const [t] = useTranslation();
  return (
    <>
      <title>{t("home_title")}</title>
      <Hero />
      <Categories />
      <Line />
      <RecentProducts />
      <Line />
      <ProductsOfCategory categoryId={21} />
      <Line />
      <BestProduct />
      <Line />
      <ProductsOfCategory categoryId={26} />
      <Line />
      <FeaturedProducts />
      <Line />
      {/* <Reviews />*/}
      <Line />
      <ProductsOfCategory categoryId={23} />
      <Line />
      <WhyUs />
    </>
  );
}

export default Home;
