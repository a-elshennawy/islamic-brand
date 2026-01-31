import "./ScrollBar.css";
import { useEffect } from "react";
import { useIsAr } from "../../hooks/useIsAr";

function ScrollBar() {
  const isAr = useIsAr();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
      const scrollBar = document.querySelector(".scrollBar");
      scrollBar.style.height = `${scrollPercentage}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="scrollBar"
        style={isAr ? { right: "0" } : { left: "0" }}
      ></div>
    </>
  );
}

export default ScrollBar;
