import { app } from "./firebase";

let analyticsModulePromise: Promise<typeof import("firebase/analytics")> | null = null;
let analyticsInstancePromise: Promise<import("firebase/analytics").Analytics | null> | null = null;

const loadAnalyticsModule = () => {
  if (!analyticsModulePromise) {
    analyticsModulePromise = import("firebase/analytics");
  }
  return analyticsModulePromise;
};

const getAnalyticsInstance = async () => {
  if (typeof window === "undefined") return null;
  if (!analyticsInstancePromise) {
    analyticsInstancePromise = loadAnalyticsModule()
      .then(async (mod) => {
        const supported = await mod.isSupported();
        return supported ? mod.getAnalytics(app) : null;
      })
      .catch(() => null);
  }
  return analyticsInstancePromise;
};

export const logPageView = async (path: string, title?: string) => {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  const mod = await loadAnalyticsModule();
  mod.logEvent(analytics, "page_view", {
    page_path: path,
    page_title: title
  });
};

export const logInteraction = async (event: string, params?: Record<string, unknown>) => {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  const mod = await loadAnalyticsModule();
  mod.logEvent(analytics, event, params);
};
