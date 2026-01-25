import { ColorRing } from "react-loader-spinner";

function SectionLoader() {
  return (
    <>
      <div className="sectionLoader">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#000", "#c5a059", "#c6b79b", "#fff", "#c5a059"]}
        />
      </div>
    </>
  );
}

export default SectionLoader;
