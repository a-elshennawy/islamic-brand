import SectionLoader from "../../components/Loaders/SectionLoader";
import { useSettings } from "../../hooks/useGeneral";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function ExchangeReturn() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSettings();

  if (isLoading) {
    return <SectionLoader />;
  }

  if (isError) {
    navigate("shop/category_id/21");
  }
  return (
    <>
      <title>{t("exchange_return_page_title")}</title>
      <section className="mt-5 p-5 text-center">
        <div
          style={{
            textAlign: "center",
            overflowWrap: "anywhere",
          }}
          dangerouslySetInnerHTML={{ __html: data?.exchange_return_policy }}
        ></div>
      </section>
    </>
  );
}

export default ExchangeReturn;
