import { ReactNode } from "react";
import clsx from "clsx"; // Si no tienes clsx, instálalo con `npm install clsx`

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "ghost" | "default" | "link";
  size?: "icon" | "default";
}

export function Button({ children, className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded transition-all",
        {
          "bg-blue-600 hover:bg-blue-700": variant === "default",
          "bg-transparent hover:bg-[#f4f4f5] dark:hover:bg-gray-700 transition duration-300": variant === "ghost",
          "text-blue-500 p-0": variant === "link",
          "w-10 h-10 flex items-center justify-center": size === "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
