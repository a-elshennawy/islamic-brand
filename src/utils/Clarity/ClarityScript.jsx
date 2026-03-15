import { useEffect } from "react";

const ClarityScript = ({ data }) => {
  const clarityId = data?.clarity;
  const clarityStatus = 1; //<-- hardcoded as active as the backend is not returning it at all

  // Clarity Tracking Script
  useEffect(() => {
    if (!clarityId || clarityStatus !== "1") return;

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);

    // Polling for clarity
    const maxAttempts = 20;
    let attempts = 0;
    const interval = setInterval(() => {
      if (window.clarity) {
        clarity("set", "debug", true);
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        console.warn("⚠️ Clarity still undefined after waiting");
        clearInterval(interval);
      }
      attempts++;
    }, 500);
  }, [clarityId, clarityStatus]); // Add clarityId and clarityStatus as dependencies

  return null;
};

export default ClarityScript;
