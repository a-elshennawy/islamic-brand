import { useMarquee } from "../../hooks/useGeneral";

function TopBar() {
  const { data, isError, isLoading } = useMarquee();
  const marqueeMessage = data?.[0]?.name;

  if (isLoading || isError) {
    return null;
  }

  const renderMarqueeItems = (prefix) =>
    Array.from({ length: 8 }, (_, index) => (
      <span key={`${prefix}-${index}`} className="marquee-item">
        {marqueeMessage}
      </span>
    ));

  return (
    <>
      <div className="topBar">
        <div className="marquee">
          <div className="marquee-track">
            <div className="marquee-content">
              {renderMarqueeItems("primary")}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {renderMarqueeItems("secondary")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
