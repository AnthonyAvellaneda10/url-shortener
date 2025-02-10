import { domainIcons, defaultIcons } from "./constants";

export const getFavicon = (url: string, theme: "light" | "dark"): string => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domainIcons[domain]?.[theme] || defaultIcons[theme];
  } catch {
    return defaultIcons[theme];
  }
};