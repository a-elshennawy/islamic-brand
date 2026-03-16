import { UseSettings } from "../../hooks/useGeneral";

// loadTikTokPixel Load TikTok Pixel
export const loadTikTokPixel = () => {
  const { data } = UseSettings();
  // TikTok Pixel ID
  const TIKTOK_PIXEL_ID = data?.tiktok_pixel;
  const TIKTOK_PIXEL_STATUS = 1; //<-- hardcoded as active as backend doesn't return it
  return new Promise((resolve) => {
    // check if TIKTOK_PIXEL_ID is not empty
    if (!TIKTOK_PIXEL_ID || TIKTOK_PIXEL_STATUS !== "1") return;

    if (!window.ttq) {
      !(function (w, d, t) {
        w.TiktokAnalyticsObject = t;
        var ttq = (w[t] = w[t] || []);
        ttq.methods = [
          "page",
          "track",
          "identify",
          "instances",
          "debug",
          "on",
          "off",
          "once",
          "ready",
          "alias",
          "group",
          "enableCookie",
          "disableCookie",
        ];
        ttq.setAndDefer = function (t, e) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        };
        for (var i = 0; i < ttq.methods.length; i++)
          ttq.setAndDefer(ttq, ttq.methods[i]);
        ttq.instance = function (t) {
          for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
            ttq.setAndDefer(e, ttq.methods[n]);
          return e;
        };
        ttq.load = function (e, n) {
          var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
          ((ttq._i = ttq._i || {}),
            (ttq._i[e] = []),
            (ttq._i[e]._u = i),
            (ttq._t = ttq._t || {}),
            (ttq._t[e] = +new Date()),
            (ttq._o = ttq._o || {}),
            (ttq._o[e] = n || {}));
          var o = document.createElement("script");
          ((o.type = "text/javascript"),
            (o.async = !0),
            (o.src = i + "?sdkid=" + e + "&lib=" + t));
          var a = document.getElementsByTagName("script")[0];
          a.parentNode.insertBefore(o, a);
        };

        ttq.load(TIKTOK_PIXEL_ID);
        // ttq.page(); //<- commented to turn off automatic fire

        // Store landing page only once
        if (!sessionStorage.getItem("landing_page")) {
          sessionStorage.setItem("landing_page", window.location.href);
        }
      })(window, document, "ttq");
    }

    // Resolve after a short delay to ensure script loads before tracking events
    setTimeout(() => resolve(), 100);
  });
};

// Track TikTok Pixel Events
export const trackTikTokPixelEvent = async (eventName, eventData = {}) => {
  if (typeof window.ttq !== "undefined") {
    const event_id = Math.floor(
      100000000000000 + Math.random() * 900000000000000,
    ); // Generates a 15-digit number
    window.ttq.track(eventName, { ...eventData, event_id });
  }
};
