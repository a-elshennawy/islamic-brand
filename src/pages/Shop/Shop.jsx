import "./Shop.css";
import Hero from "../../components/HomePageComponents/Hero/Hero";
import { useProducts } from "../../hooks/useProducts";
import { useParams } from "react-router-dom";
// import { useState } from "react";
import ProductCard from "../../components/Products/ProductCard/ProductCard";

function Shop() {
  const { category_id } = useParams();
  // const [categoryId, setCategoryId] = useState(category_id);
  const { data, isLoading, error } = useProducts({
    category_id: category_id,
  });

  const products = data?.data;

  return (
    <>
      <section className="shopPage">
        <Hero />
        <div className="productsSection row justify-content-center align-items-center m-0 py-5 gap-2">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="col-xl-2 col-lg-3 col-md-5 col-sm-5 col-5"
            />
          ))}
        </div>
      </section>
    </>
  );
}
export default Shop;
