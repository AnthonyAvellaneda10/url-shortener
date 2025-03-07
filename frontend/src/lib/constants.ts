export const icons = {
    youtube: "/youtube.svg",
    facebook: "/facebook.svg",
    github_light: "/github-light.svg",
    github_dark: "/github-dark.svg",
    tiktok: "/tiktok.svg",
    instagram: "/instagram.svg",
    linkedin: "/linkedin.svg",
    whatsapp: "/whatsapp.svg",
    gmail: "/gmail.svg",
    claude: "/claude-ai-icon.svg",
    traductor: "/traductor-google.svg",
    svgl: "/svgl.svg",
    x_light: "/x-light.svg",
    x_dark: "/x-dark.svg",
    udemy_light: "/udemy-dark.svg",
    udemy_dark: "/udemy-light.svg",
    color_picker: '/color-picker.svg',
    vite: "/vite.svg",
    tailwind: "/tailwindcss.svg",
    default_light: "/url-light.svg",
    default_dark: "/url-dark.svg",
};

export const domainIcons: { [key: string]: { light: string; dark: string } } = {
    "youtube.com": { light: icons.youtube, dark: icons.youtube },
    "facebook.com": { light: icons.facebook, dark: icons.facebook },
    "github.com": { light: icons.github_light, dark: icons.github_dark },
    "tiktok.com": { light: icons.tiktok, dark: icons.tiktok },
    "instagram.com": { light: icons.instagram, dark: icons.instagram },
    "linkedin.com": { light: icons.linkedin, dark: icons.linkedin },
    "whatsapp.com": { light: icons.whatsapp, dark: icons.whatsapp },
    "mail.google.com": { light: icons.gmail, dark: icons.gmail },
    "claude.ai": { light: icons.claude, dark: icons.claude },
    "gmail.com": { light: icons.gmail, dark: icons.gmail },
    "translate.google.com": { light: icons.traductor, dark: icons.traductor },
    "svgl.app": { light: icons.svgl, dark: icons.svgl },
    "x.com": { light: icons.x_light, dark: icons.x_dark },
    "twitter.com": { light: icons.x_light, dark: icons.x_dark },
    "web.whatsapp.com": { light: icons.whatsapp, dark: icons.whatsapp },
    "imagecolorpicker.com": { light: icons.color_picker, dark: icons.color_picker },
    "udemy.com": { light: icons.udemy_light, dark: icons.udemy_dark },
    "vite.dev": { light: icons.vite, dark: icons.vite },
    "tailwindcss.com": { light: icons.tailwind, dark: icons.tailwind },
};

export const defaultIcons = { light: icons.default_light, dark: icons.default_dark };  