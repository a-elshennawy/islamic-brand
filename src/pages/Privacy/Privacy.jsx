import SectionLoader from "../../components/Loaders/SectionLoader";
import { useSettings } from "../../hooks/useGeneral";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Privacy() {
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
      <title>{t("privacy_page_title")}</title>
      <section className="mt-5 p-5 text-center overflow-hidden">
        <div
          style={{
            textAlign: "center",
            overflowWrap: "anywhere",
          }}
          dangerouslySetInnerHTML={{ __html: data?.privacy_policy }}
        />
      </section>
    </>
  );
}

export default Privacy;
