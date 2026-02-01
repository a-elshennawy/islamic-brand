import "./ProductPage.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../hooks/useProducts";
import SectionLoader from "../../components/Loaders/SectionLoader";

function ProductPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { data: product, isLoading } = useProduct(slug || "");

  console.log(product);

  if (isLoading) {
    return <SectionLoader />;
  }

  if (!product) {
    navigate("/");
  }

  return (
    <>
      <title>{t("product_details_page_title")}</title>

      <section className="productPage">
        <h1>{product.name}</h1>
      </section>
    </>
  );
}

export default ProductPage;
