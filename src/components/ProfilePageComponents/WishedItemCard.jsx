import useMobile from "../../hooks/useMobile";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { truncateName } from "../../utils/helpers";
import AddToCart from "./AddToCart";
import RemoveBtn from "./RemoveBtn";

function WishedItemCard({ item }) {
  const { isMobile } = useMobile();
  const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="wishedItem p-0 col-xl-3 col-lg-3 col-md-5 col-sm-5 col-5">
        <div
          className="imgContainer p-0"
          onClick={() => navigate(`/product-details/${item?.product_slug}`)}
        >
          <img
            src={item?.main_image}
            alt={item?.product_name}
            loading="lazy"
            style={{ height: isMobile ? "12.5rem" : "18.75rem" }}
          />
        </div>
        <div className="info p-2">
          <h4>{truncateName(item?.product_name, 15)}</h4>
          <h3>
            {item?.product_price} {t("L.E")}
          </h3>
          <div className="spec p-2">
            <div
              className="color"
              style={{ backgroundColor: item?.color_value }}
            ></div>
            <span>{item?.size_value}</span>
          </div>
          <div className="actions mt-1">
            <AddToCart
              productId={item?.product_id}
              combinationId={item?.combination_id}
            />
            <RemoveBtn
              productId={item?.product_id}
              combinationId={item?.combination_id}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WishedItemCard;
