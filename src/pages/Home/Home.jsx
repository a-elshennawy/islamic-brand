import Categories from "../../components/HomePageComponents/CategoriesBar/CategoriesBar";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import RecentProducts from "../../components/HomePageComponents/RecentProducts/RecentProducts";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <RecentProducts />
    </>
  );
}

export default Home;
