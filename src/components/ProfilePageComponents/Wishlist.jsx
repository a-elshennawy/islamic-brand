import { useTranslation } from "react-i18next";
import { getWishlist } from "../../services/api/products";
import { useQuery } from "@tanstack/react-query";
import WishedItemCard from "./WishedItemCard";
import SectionLoader from "../Loaders/SectionLoader";
import EmptyWishlist from "./EmptyWishlist";

function Wishlist() {
  const [t] = useTranslation();
  const { data: wishlist, isLoading: wishlistLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  if (wishlistLoading) {
    return (
      <>
        <div className="col-xl-9 col-lg-8 col-md-10 col-sm-10 col-10 text-center">
          <SectionLoader />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-xl-9 col-lg-8 col-md-10 col-sm-10 col-10 text-center">
        <h2 className="tabTitle">{t("wishlist")}</h2>
        <div className="row justify-content-center align-items-center gap-1 m-0">
          {wishlist?.length > 0 ? (
            wishlist?.map((item) => (
              <WishedItemCard key={item.id} item={item} />
            ))
          ) : (
            <EmptyWishlist textColor="#66452c" />
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
