import "./BestProduct.css";
import { useHomeProducts } from "../../../hooks/useProducts";
import ComponentLoader from "../../Loaders/ComponentLoader";
import ProductAddToCartBtn from "../../Products/ProductAddToCartBtn/ProductAddToCartBtn";

function BestProduct() {
  const { data: homeProducts, isLoading } = useHomeProducts();
  const BestProduct = homeProducts?.best_product || [];

  if (isLoading)
    return (
      <section className="bestProduct">
        <ComponentLoader />
      </section>
    );
  if (!BestProduct) return null;

  return (
    <>
      <section className="bestProduct row justify-content-center align-items-start gap-1 m-0">
        <div className="detailsSide col-5">
          <h5>best product for you</h5>
          <h3>{BestProduct.name}</h3>
          {BestProduct.discount_price ? (
            <>
              <h3>
                <small>
                  <del className="text-muted">
                    {BestProduct.original_price} L.E
                  </del>
                </small>
                <strong> {BestProduct.discount_price} L.E</strong>
              </h3>
            </>
          ) : (
            <>
              <h3>{BestProduct.price} L.E</h3>
            </>
          )}
          <div dangerouslySetInnerHTML={{ __html: BestProduct.description }} />
          <ProductAddToCartBtn />
        </div>
        <div className="imgSide p-0 col-5">
          <img
            src={BestProduct.main_image}
            alt={BestProduct.name}
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

export default BestProduct;
