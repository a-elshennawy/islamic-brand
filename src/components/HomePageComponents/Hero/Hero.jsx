import { useSliders } from "../../../hooks/useGeneral";
import "./Hero.css";
import SectionLoader from "../../Loaders/SectionLoader";
import useMobile from "../../../hooks/useMobile";
import { useState } from "react";
import { useEffect } from "react";

function Hero() {
  const { isMobile } = useMobile();
  const { data: sliders, isLoading } = useSliders();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!sliders || sliders.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliders]);

  if (isLoading) return <SectionLoader />;

  return (
    <section
      className="hero pb-2"
      style={{ height: isMobile ? "auto !important" : "100dvh !important" }}
    >
      <div className="imgContainer" style={{ width: isMobile ? "95%" : "85%" }}>
        {sliders?.map((slide, index) => (
          <img
            key={slide.id || index}
            src={slide.image}
            alt="Hero"
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
