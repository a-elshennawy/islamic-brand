import "./ProductCard.css";
import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { truncateName } from "../../utils/helpers";

function ProductCard({ product }) {
  return (
    <>
      <div className="ProductCard row justify-content-center align-items-center text-center">
        <div className="imgContainer p-0 col-12">
          <span className="wishlistBtn">
            <FaRegHeart size={20} />
          </span>
          <img src={product.main_image} alt={product.name} />
        </div>
        <div className="info col-12">
          <h5>{truncateName(product.name, 15)}</h5>
          {product.discount_price ? (
            <>
              <h5>{product.discount_price} L.E</h5>
            </>
          ) : (
            <>
              <h5>{product.price} L.E</h5>
            </>
          )}
          <AddToCartBtn />
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
