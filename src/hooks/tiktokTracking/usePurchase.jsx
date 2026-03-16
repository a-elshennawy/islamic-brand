import { useEffect, useRef } from "react";
import { trackTikTokPixelEvent } from "../../utils/TiktokPixel/tiktokPixel";
import { getTrafficSource } from "../../utils/TiktokPixel/getTrafficSource";

const usePurchase = (orderData) => {
  const hasFired = useRef(false);

  useEffect(() => {
    if (!orderData || hasFired.current) return;

    const trackPurchaseEvent = async () => {
      const now = new Date();
      const eventDay = now.toLocaleString("en-US", { weekday: "long" });
      const eventHour = `${now.getHours()}h-${now.getMinutes()}min`;
      const eventMonth = now.toLocaleString("en-US", { month: "long" });

      const contents =
        orderData?.order_details?.map((item) => ({
          id: item?.product_id,
          quantity: item?.quantity,
          item_price: item?.price,
        })) || [];

      const numItems = contents.reduce((sum, item) => sum + item?.quantity, 0);

      const purchaseData = {
        event_name: "Purchase",
        content_type: "product",
        content_ids: orderData?.order_details
          ?.map((item) => item?.product?.name)
          .join(", "),
        contents: contents,
        currency: "EGP",
        value: orderData?.total,
        subtotal: orderData?.sub_total,
        num_items: numItems,

        event_day: eventDay,
        event_hour: eventHour,
        event_month: eventMonth,
        event_url: window.location.href,
        landing_page: sessionStorage.getItem("landing_page") || "Unknown",
        page_title: document.title,
        traffic_source: getTrafficSource(),
      };

      try {
        await trackTikTokPixelEvent("Purchase", purchaseData);
        console.log("tiktok Purchase Event Tracked", purchaseData);

        hasFired.current = true;
      } catch (error) {
        console.error("tiktok Purchase Failed:", error);
      }
    };
    trackPurchaseEvent();
  }, [orderData]);
};

export default usePurchase;
