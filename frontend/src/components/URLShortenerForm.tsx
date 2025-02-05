import { LinkIcon } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useState } from "react";
import { validateUrl } from "../lib/urlValidator";
import toast from "react-hot-toast";
import { useUrlShortenerContext } from "../context/UrlShortenerContext";

export const URLShortenerForm = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { shortenUrl, isLoading } = useUrlShortenerContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();

    if (!validateUrl(trimmedUrl)) {
      setError("Please enter a valid URL");
      return;
    }
    setError("");

    try {
      const response = await shortenUrl(trimmedUrl);
      toast.success(response);
      setUrl("");
    } catch (error: Error | any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <div className="flex gap-2 flex-wrap flex-col sm:flex-row">
          <div className="relative flex-1">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the link here"
              className="w-full bg-gray-50 border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none transition duration-300 dark:bg-gray-800/50 dark:border-gray-700"
            />
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 transition duration-300 disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading || !validateUrl(url.trim())}
          >
            {isLoading ? "Shortening URL..." : "Shorten URL!"}
          </Button>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-sm transition-opacity duration-300">
          {error}
        </p>
      )}
    </form>
  );
};
