import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "../interfaces/link.interface";

export function useUrlShortener() {
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState<Link[]>([]);

  // Función para obtener la lista de URLs
  const fetchUrls = useCallback(async () => {
    // Usar useCallback para memoizar la función
    try {
      const response = await axios.get("/shorten/list");
      console.log("Fetched URLs:", response.data);  // Verifica los datos aquí
      setUrls(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de URLs:", error);
    }
  }, []); // Dependencias vacías ya que no usa variables externas

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]); // fetchUrls ahora es una dependencia estable

  // Función para acortar una URL y actualizar la lista automáticamente
  const shortenUrl = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/shorten", { url });
      await fetchUrls(); // Actualiza la lista de URLs después de acortar una nueva URL

      return response.data.message;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { shortenUrl, isLoading, urls, fetchUrls  };
}
