import BestProduct from "../../components/HomePageComponents/BestProduct/BestProduct";
import Categories from "../../components/HomePageComponents/CategoriesBar/CategoriesBar";
import FeaturedProducts from "../../components/HomePageComponents/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import Line from "../../components/HomePageComponents/Line/Line";
import RecentProducts from "../../components/HomePageComponents/RecentProducts/RecentProducts";
import Reviews from "../../components/HomePageComponents/Reviews/Reviews";

function Home() {
  return (
    <>
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
      <Line />
    </>
  );
}

export default Home;
