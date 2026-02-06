import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "@lib/helmet";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import "./styles/tailwind.css";

const container = document.getElementById("app");

if (container) {
  hydrateRoot(
    container,
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
