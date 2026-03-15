import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackMetaPixelEvent } from "../../utils/MetaPixel/metaPixel";
import { getTrafficSource } from "../../utils/MetaPixel/getTrafficSource";

const useViewContentTracker = (product, quantity) => {
  const location = useLocation();

  useEffect(() => {
    const trackViewContent = async () => {
      if (!product) return;
      try {
        // get current data & time
        const now = new Date();
        const eventDay = now.toLocaleString("en-US", { weekday: "long" });
        const eventHour = `${now.getHours()}h-${now.getMinutes()}min`;
        const eventMonth = now.toLocaleString("en-US", { month: "long" });

        // prepare event data
        const ViewContentData = {
          event_name: "ViewContent",
          content_type: "product",
          content_name: product?.name,
          content_ids: [product?.id],

          contents: [
            {
              id: product?.id,
              quantity: quantity || 1,
              item_price: product?.price,
            },
          ],
          currency: "EGP",
          value: product?.price,
          event_day: eventDay,
          event_hour: eventHour,
          event_month: eventMonth,
          event_url: window.location.href,
          landing_page: sessionStorage.getItem("landing_page") || "Unknown",
          page_title: document.title,
          post_type: "page",
          traffic_source: getTrafficSource(),
          category_name: product?.category?.name || "Unknown",
        };

        await trackMetaPixelEvent("ViewContent", ViewContentData);
        console.log("View Content Tracked:", ViewContentData);
      } catch (error) {
        console.error("Error tracking content view:", error);
      }
    };

    // small delay to assure page is loaded before start tracking
    const timer = setTimeout(() => {
      trackViewContent();
    }, 1500);

    // clean up
    return () => clearTimeout(timer);
  }, [location.pathname, product, quantity]);
};

export default useViewContentTracker;
