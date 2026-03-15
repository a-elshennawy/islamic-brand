import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackMetaPixelEvent } from "../../utils/MetaPixel/metaPixel";
import { getTrafficSource } from "../../utils/MetaPixel/getTrafficSource";

const usePageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // get current data & time
        const now = new Date();
        const eventDay = now.toLocaleString("en-US", { weekday: "long" });
        const eventHour = `${now.getHours()}h-${now.getMinutes()}min`;
        const eventMonth = now.toLocaleString("en-US", { month: "long" });

        // prepare event data
        const pageViewData = {
          event_name: "PageView",
          event_source_url: window.location.href,
          action_source: "website",

          custome_data: {
            content_type: "page",
            content_name: document.title,
          },

          event_day: eventDay,
          event_hour: eventHour,
          event_month: eventMonth,
          event_url: window.location.href,
          landing_page: sessionStorage.getItem("landing_page") || "Unknown",
          page_title: document.title,
          post_type: "page",
          traffic_source: getTrafficSource(),
        };

        await trackMetaPixelEvent("PageView", pageViewData);
        console.log("Page view tracked:", pageViewData);
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    };

    // small delay to assure page is loaded before start tracking
    const timer = setTimeout(() => {
      trackPageView();
    }, 1500);

    // clean up
    return () => clearTimeout(timer);
  }, [location.pathname]);
};

export default usePageViewTracker;
