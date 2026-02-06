import ToHomeBtn from "../../components/Btns/ToHomeBtn";
import { useSettings } from "../../hooks/useGeneral";

function ExchangeReturn() {
  const { data, isLoading } = useSettings();
  return (
    <>
      <ToHomeBtn />
      <section className="p-5 text-center">
        <div
          dangerouslySetInnerHTML={{ __html: data?.exchange_return_policy }}
        ></div>
      </section>
    </>
  );
}

export default ExchangeReturn;
