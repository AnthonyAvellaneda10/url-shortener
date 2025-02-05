import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UrlShortenerProvider } from "./context/UrlShortenerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UrlShortenerProvider>
        <App />
      </UrlShortenerProvider>
    </BrowserRouter>
  </StrictMode>
);
