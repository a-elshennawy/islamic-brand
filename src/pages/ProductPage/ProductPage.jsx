import "./ProductPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../hooks/useIsAr";
import { useProduct } from "../../hooks/useProducts";
import SectionLoader from "../../components/Loaders/SectionLoader";
import ProductImg from "../../components/ProductPageComponents/ProductImg";
import ProductVariations from "../../components/ProductPageComponents/ProductVariations";
import ProductAddToCartBtn from "../../components/Products/ProductAddToCartBtn/ProductAddToCartBtn";
import RelatedProducts from "../../components/ProductPageComponents/RelatedProducts";

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { data: product, isLoading } = useProduct(slug || "");

  if (isLoading) {
    return <SectionLoader />;
  }

  if (!product) {
    navigate("/");
  }

  return (
    <>
      <title>{product?.name}</title>
      <section
        className="productPage row justify-content-center align-items-start gap-2 m-0"
        dir={isAr ? "rtl" : "ltr"}
      >
        <ProductImg product={product} />
        <div
          className="detailsSide col-xl-6 col-lg-6 col-md-10 col-sm-10 col-12"
          dir={isAr ? "rtl" : "ltr"}
        >
          <span className="productCategory">{product.category.name}</span>
          <h3 className="productName my-2">{product.name}</h3>
          <div className="productPriceSection p-0">
            {product.discount_price ? (
              <>
                <h5>
                  {product.original_price} {t("L.E")}
                </h5>
                <h3>
                  <strong>
                    {product.discount_price} {t("L.E")}
                  </strong>
                </h3>
              </>
            ) : (
              <>
                <h3>
                  <strong>
                    {product.price} {t("L.E")}
                  </strong>
                </h3>
              </>
            )}
          </div>

          <div
            className="productDescription"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          {product?.has_variations ? (
            <ProductVariations product={product} />
          ) : (
            <ProductAddToCartBtn product={product} />
          )}
        </div>

        <RelatedProducts slug={product.slug} />
      </section>
    </>
  );
}

export default ProductPage;
