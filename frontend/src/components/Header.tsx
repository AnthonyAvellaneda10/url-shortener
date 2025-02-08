import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Button } from "./ui/Button";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex items-center justify-between p-4 w-full">
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent focus:outline-none"
      >
        Linkly
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="text-foreground relative w-10 h-10 overflow-hidden"
      >
        <Sun
          className={`h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 ${
            theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
        />
        <Moon
          className={`h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 ${
            theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
          }`}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
};
