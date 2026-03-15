export const getTrafficSource = () => {
  if (!document.referrer) return "direct";

  const referrerHost = new URL(document.referrer).hostname;
  const platformMap = {
    "facebook.com": "Facebook",
    "instagram.com": "Instagram",
    "twitter.com": "Twitter",
    "t.co": "Twitter",
    "linkedin.com": "LinkedIn",
    "google.com": "Google",
    "bing.com": "Bing",
    "yahoo.com": "Yahoo",
    "pinterest.com": "Pinterest",
    "youtube.com": "YouTube",
  };

  return platformMap[referrerHost] || referrerHost;
};
