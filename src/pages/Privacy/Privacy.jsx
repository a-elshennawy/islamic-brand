import ToHomeBtn from "../../components/Btns/ToHomeBtn";
import { useSettings } from "../../hooks/useGeneral";

function Privacy() {
  const { data, isLoading } = useSettings();
  return (
    <>
      <ToHomeBtn />
      <section className="p-5 text-center">
        <div dangerouslySetInnerHTML={{ __html: data?.privacy_policy }}></div>
      </section>
    </>
  );
}

export default Privacy;
