import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordPageHit } from "../lib/pageViews";
import { logPageView } from "../lib/analytics";

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "/";
    const title = typeof document !== "undefined" ? document.title : undefined;

    recordPageHit(path, { title }).catch(() => undefined);
    logPageView(path, title).catch(() => undefined);
  }, [location.pathname, location.search]);

  return null;
};

export default PageViewTracker;
