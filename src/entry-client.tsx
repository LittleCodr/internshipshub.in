import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "@lib/helmet";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import App from "./App";
import "./styles/tailwind.css";

const container = document.getElementById("app");

if (container) {
  hydrateRoot(
    container,
    <HelmetProvider>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
