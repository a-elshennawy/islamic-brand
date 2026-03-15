import { UseSettings } from "../../hooks/useGeneral";

// loadMetaPixel Load Meta Pixel
export const loadMetaPixel = () => {
  const { data } = UseSettings();
  // Meta Pixel ID
  const META_PIXEL_ID = data?.pixel;
  const META_PIXEL_STATUS = 1; //<-- hardcoded as active as backend doesn't return it

  return new Promise((resolve) => {
    // check if META_PIXEL_ID is not empty
    if (!META_PIXEL_ID || META_PIXEL_STATUS !== "1") return;
    //
    if (!window.fbq) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );

      fbq(
        "init",
        META_PIXEL_ID,
        {},
        { autoConfig: false, disablePushState: true },
      );
      // Store landing page only once
      if (!sessionStorage.getItem("landing_page")) {
        sessionStorage.setItem("landing_page", window.location.href);
      }
    }

    // Resolve after a short delay to ensure script loads before tracking events
    setTimeout(() => resolve(), 100);
  });
};

// Track Meta Pixel Events
export const trackMetaPixelEvent = async (eventName, eventData = {}) => {
  if (typeof window.fbq !== "undefined") {
    const event_id = Math.floor(
      100000000000000 + Math.random() * 900000000000000,
    ); // Generates a 15-digit number
    fbq("track", eventName, { ...eventData, event_id });
  }
};
