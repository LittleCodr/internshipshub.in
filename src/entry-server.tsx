import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "@lib/helmet";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import App from "./App";
import "./styles/tailwind.css";

interface RenderResult {
  html: string;
  head: string;
}

export async function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ToastProvider>
          <AuthProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </AuthProvider>
        </ToastProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet ?? ({} as HelmetServerState);
  const head = [
    helmet.title?.toString() ?? "",
    helmet.meta?.toString() ?? "",
    helmet.link?.toString() ?? "",
    helmet.script?.toString() ?? ""
  ]
    .filter(Boolean)
    .join("\n");

  return { html, head };
}
