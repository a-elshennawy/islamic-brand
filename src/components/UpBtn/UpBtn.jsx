import { useState, useEffect } from "react";
import "./UpBtn.css";
import { FaChevronUp } from "react-icons/fa";
import { AnimatePresence, motion as Motion } from "motion/react";
import useMobile from "../../hooks/useMobile";

function UpBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            <Motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`upBtn ${isMobile ? "inMobile" : ""}`}
              onClick={handleScrollToTop}
            >
              <FaChevronUp />
            </Motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default UpBtn;
