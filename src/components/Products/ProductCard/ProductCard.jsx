import "./ProductCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { truncateName } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";

function ProductCard({ product }) {
  const [t] = useTranslation();
  const isAr = useIsAr();

  return (
    <>
      <div
        className="ProductCard row justify-content-center align-items-center text-center"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="imgContainer p-0 col-12">
          <span className="wishlistBtn">
            <FaRegHeart size={20} />
          </span>
          <Link
            to={`/product-details/${product.slug}`}
            state={{ item: product }}
          >
            <img src={product.main_image} alt={product.name} loading="eager" />
          </Link>
        </div>
        <div className="info col-12">
          <h4>{truncateName(product.name, 20)}</h4>
          {product.discount_price ? (
            <>
              <div className="price">
                <h5>
                  {product.original_price} {t("L.E")}
                </h5>
                <h3>
                  <strong>
                    {product.discount_price} {t("L.E")}
                  </strong>
                </h3>
              </div>
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
          <AddToCartBtn product={product} />
        </div>
      </div>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
