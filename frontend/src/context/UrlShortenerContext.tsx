import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Link {
  id: string;
  url: string;
  short_code: string;
  created_at: string;
  updated_at: string;
  access_count: number;
  host: string;
}

interface UrlShortenerContextProps {
  urls: Link[];
  shortenUrl: (url: string) => Promise<string>;
  updateUrl: (short_code: string, url: string) => Promise<void>;
  deleteUrl: (short_code: string) => Promise<void>;
  isLoading: boolean;
}

const UrlShortenerContext = createContext<UrlShortenerContextProps | undefined>(undefined);

export const UrlShortenerProvider = ({ children }: { children: ReactNode }) => {
  const [urls, setUrls] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUrls = async () => {
    try {
      const response = await axios.get("/shorten/list");
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const shortenUrl = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/shorten", { url });
      await fetchUrls(); // Actualizamos la lista
      return response.data.message;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUrl = async (short_code: string, url: string) => {
    try {
      await axios.put(`/shorten/${short_code}`, { url });
      await fetchUrls();
      toast.success("URL updated successfully");
    } catch (error) {
      console.error("Error updating URL", error);
      toast.error("Error updating URL");
    }
  };

  const deleteUrl = async (short_code: string) => {
    try {
      await axios.delete(`/shorten/${short_code}`);
      await fetchUrls();
      toast.success("URL deleted successfully");
    } catch (error) {
      console.error("Error deleting URL", error);
      toast.error("Error deleting URL");
    }
  };


  return (
    <UrlShortenerContext.Provider value={{ urls, shortenUrl, updateUrl, deleteUrl, isLoading }}>
      {children}
    </UrlShortenerContext.Provider>
  );
};

export const useUrlShortenerContext = () => {
  const context = useContext(UrlShortenerContext);
  if (!context) {
    throw new Error("useUrlShortenerContext must be used within a UrlShortenerProvider");
  }
  return context;
};
