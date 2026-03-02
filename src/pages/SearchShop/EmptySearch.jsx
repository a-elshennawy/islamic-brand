import Lottie from "lottie-react";
import emptySearch from "../../assets/lotties/EmptySearch.json";
import { useTranslation } from "react-i18next";

function EmptySearch() {
  const [t] = useTranslation();
  return (
    <>
      <div className="emptySearch row justify-content-center align-items-center m-0 pb-5">
        <div className="col-xl-5 col-lg-5 col-md-7 col-sm-10 col-10">
          <Lottie animationData={emptySearch} loop={true} />
        </div>
        <div className="col-12 text-center">
          <h4>{t("nothing to view")}</h4>
        </div>
      </div>
    </>
  );
}
export default EmptySearch;
