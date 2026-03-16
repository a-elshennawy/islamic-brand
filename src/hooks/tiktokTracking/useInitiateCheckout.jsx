import { useEffect, useRef } from "react";
import { trackTikTokPixelEvent } from "../../utils/TiktokPixel/tiktokPixel";
import { getTrafficSource } from "../../utils/TiktokPixel/getTrafficSource";
import { useGetCartSummary } from "../useCart";

const useInitiateCheckout = (items = []) => {
  const hasFiredRef = useRef(false);
  const lastItemsHashRef = useRef(null);
  const { data: cartSummary } = useGetCartSummary();

  useEffect(() => {
    if (!items?.length) {
      hasFiredRef.current = false;
      return;
    }

    const itemsHash = items
      .map((item) => `${item?.id}:${item?.quantity}`)
      .sort()
      .join("|");

    if (hasFiredRef.current && itemsHash === lastItemsHashRef.current) {
      return;
    }

    const trackInitiateCheckout = async () => {
      try {
        const now = new Date();
        const eventDay = now.toLocaleString("en-US", { weekday: "long" });
        const eventHour = `${now.getHours()}h-${now.getMinutes()}min`;
        const eventMonth = now.toLocaleString("en-US", { month: "long" });

        const contents = items?.map((item) => ({
          id: item?.product_id,
          quantity: item?.quantity,
          item_price: item?.price,
        }));

        const numItems = contents.reduce((sum, item) => sum + item.quantity, 0);

        const InitiateCheckoutData = {
          event_name: "InitiateCheckout",
          content_type: "product",
          content_ids: items?.map((item) => item?.product_id),
          content_name: items?.map((item) => item?.product_name).join(", "),
          contents: contents,
          currency: "EGP",
          value: cartSummary?.total,
          num_items: numItems,
          category_name: items.map((item) => item?.category?.name).join(", "),
          subtotal: cartSummary?.subtotal,
          event_day: eventDay,
          event_hour: eventHour,
          event_month: eventMonth,
          event_url: window.location.href,
          landing_page: sessionStorage.getItem("landing_page") || "Unknown",
          page_title: document.title,
          post_type: "page",
          traffic_source: getTrafficSource(),
        };

        await trackTikTokPixelEvent("InitiateCheckout", InitiateCheckoutData);
        console.log(
          "tiktok InitiateCheckout Event Data:",
          InitiateCheckoutData,
        );

        // Mark as fired and store the hash
        hasFiredRef.current = true;
        lastItemsHashRef.current = itemsHash;
      } catch (error) {
        console.error("Error tracking InitiateCheckout:", error);
      }
    };

    // small delay to assure page is loaded before start tracking
    const timer = setTimeout(() => {
      trackInitiateCheckout();
    }, 1500);

    // clean up
    return () => clearTimeout(timer);
  }, [items, cartSummary]);
};

export default useInitiateCheckout;
