import "./BestProduct.css";
import { useHomeProducts } from "../../../hooks/useProducts";
import ProductAddToCartBtn from "../../Products/ProductAddToCartBtn/ProductAddToCartBtn";
import SectionLoader from "../../Loaders/SectionLoader";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";

function BestProduct() {
  const { data: homeProducts, isLoading } = useHomeProducts();
  const BestProduct = homeProducts?.best_product || [];
  const [t] = useTranslation();
  const isAr = useIsAr();

  if (isLoading) return <SectionLoader />;

  if (!BestProduct) return null;

  return (
    <>
      <section
        className="bestProduct row justify-content-center align-items-start gap-1 m-0"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <div className="imgSide p-0 col-5">
          <img
            src={BestProduct.main_image}
            alt={BestProduct.name}
            loading="lazy"
          />
        </div>
        <div
          className="detailsSide col-5"
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          <div className="title">
            <h5 className="mb-0">{t("best_product")}</h5>
          </div>
          <h3>{BestProduct.name}</h3>
          {BestProduct.discount_price ? (
            <>
              <div className="price py-2">
                <h6>
                  {BestProduct.original_price} {t("L.E")}
                </h6>
                <h3>
                  <strong>
                    {BestProduct.discount_price} {t("L.E")}
                  </strong>
                </h3>
              </div>
            </>
          ) : (
            <>
              <div className="price py-2">
                <h3>
                  <strong>
                    {BestProduct.price} {t("L.E")}
                  </strong>
                </h3>
              </div>
            </>
          )}
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: BestProduct.description }}
          />
          <ProductAddToCartBtn />
        </div>
      </section>
    </>
  );
}

export default BestProduct;
