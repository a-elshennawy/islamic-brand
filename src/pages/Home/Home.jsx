import BestProduct from "../../components/HomePageComponents/BestProduct/BestProduct";
import Categories from "../../components/HomePageComponents/CategoriesBar/CategoriesBar";
import FeaturedProducts from "../../components/HomePageComponents/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import Line from "../../components/HomePageComponents/Line/Line";
import RecentProducts from "../../components/HomePageComponents/RecentProducts/RecentProducts";
import Reviews from "../../components/HomePageComponents/Reviews/Reviews";
import { useTranslation } from "react-i18next";

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
      <BestProduct />
      <Line />
      <FeaturedProducts />
      <Line />
      <Reviews />
    </>
  );
}

export default Home;
