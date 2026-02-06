import { doc, increment, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

type PageViewMeta = {
  title?: string;
  category?: string;
};

const sanitizePath = (path: string) => {
  const clean = path.replace(/[?#].*$/, "").replace(/^\/+/, "");
  const normalized = clean.replace(/\/+$/, "");
  const id = normalized.replace(/\//g, "__");
  return id || "home";
};

export const recordPageHit = async (path: string, meta?: PageViewMeta) => {
  const docId = sanitizePath(path);
  try {
    await setDoc(
      doc(db, "pageViews", docId),
      {
        path,
        title: meta?.title ?? null,
        category: meta?.category ?? null,
        count: increment(1),
        lastHitAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    // Swallow analytics write errors to avoid breaking UX
    if (import.meta.env.DEV) {
      console.warn("recordPageHit failed", error);
    }
  }
};

export const subscribeToPageViews = (
  path: string,
  onValue: (count: number) => void,
  onError?: (error: Error) => void
) => {
  if (typeof window === "undefined") return () => undefined;
  const docId = sanitizePath(path);
  const ref = doc(db, "pageViews", docId);
  const unsubscribe = onSnapshot(
    ref,
    (snap) => {
      const data = snap.data();
      onValue(typeof data?.count === "number" ? data.count : 0);
    },
    (err) => {
      if (onError) onError(err as Error);
      else if (import.meta.env.DEV) console.warn("subscribeToPageViews failed", err);
    }
  );
  return unsubscribe;
};
