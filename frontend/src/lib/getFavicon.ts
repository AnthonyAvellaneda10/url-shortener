const domainIcons: { [key: string]: { light: string; dark: string } } = {
  "youtube.com": { light: "/youtube.svg", dark: "/youtube.svg" },
  "facebook.com": { light: "/facebook.svg", dark: "/facebook.svg" },
  "github.com": { light: "/github-light.svg", dark: "/github-dark.svg" },
  "tiktok.com": { light: "/tiktok.svg", dark: "/tiktok.svg" },
  "instagram.com": { light: "/instagram.svg", dark: "/instagram.svg" },
  "linkedin.com": { light: "/linkedin.svg", dark: "/linkedin.svg" },
  "whatsapp.com": { light: "/whatsapp.svg", dark: "/whatsapp.svg" },
  "mail.google.com": { light: "/gmail.svg", dark: "/gmail.svg" },
  "claude.ai": { light: "/claude-ai-icon.svg", dark: "/claude-ai-icon.svg" },
  "gmail.com": { light: "/gmail.svg", dark: "/gmail.svg" },
  "translate.google.com": { light: "/traductor-google.svg", dark: "/traductor-google.svg" },
  "svgl.app": { light: "/svgl.svg", dark: "/svgl.svg" },
  "x.com": { light: "/x-light.svg", dark: "/x-dark.svg" },
  "twitter.com": { light: "/x-light.svg", dark: "/x-dark.svg" },
  "web.whatsapp.com": { light: "/whatsapp.svg", dark: "/whatsapp.svg" },
  "imagecolorpicker.com": { light: "/color-picker.svg", dark: "/color-picker.svg" },
};

const defaultImage = {
  light: "/url-light.svg", // Imagen por defecto en modo claro
  dark: "/url-dark.svg",   // Imagen por defecto en modo oscuro
};

export const getFavicon = (url: string, theme: "light" | "dark"): string => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domainIcons[domain]?.[theme] || defaultImage[theme];
  } catch (error) {
    return defaultImage[theme];
  }
};
