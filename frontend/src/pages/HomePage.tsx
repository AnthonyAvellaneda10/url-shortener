import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LinkShortener } from "../components/LinkShortener";
import { LinksList } from "../components/links-litst/LinksList";
import { useUrlShortenerContext } from "../context/UrlShortenerContext";

export const HomePage = () => {
  const { urls } = useUrlShortenerContext(); // Usa los URLs de useUrlShortener
  return (
    <>
      <div className="min-h-screen bg-background text-foreground select-none">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LinkShortener />
          <LinksList links={urls} />
        </main>
        <Footer />
      </div>
    </>
  );
};
