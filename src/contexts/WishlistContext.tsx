import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { OpportunityType } from "../types/content";

export interface SavedItem {
  slug: string;
  type: OpportunityType;
  title: string;
  company: string;
  applyLink: string;
}

interface WishlistContextValue {
  items: SavedItem[];
  isSaved: (slug: string, type: OpportunityType) => boolean;
  toggleSave: (item: SavedItem) => void;
  remove: (slug: string, type: OpportunityType) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "ihub_wishlist_v1";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedItem[];
        setItems(parsed);
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore write errors */
    }
  }, [items]);

  const isSaved = (slug: string, type: OpportunityType) => items.some((i) => i.slug === slug && i.type === type);

  const toggleSave = (item: SavedItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.slug === item.slug && i.type === item.type)) {
        return prev.filter((i) => !(i.slug === item.slug && i.type === item.type));
      }
      return [...prev, item];
    });
  };

  const remove = (slug: string, type: OpportunityType) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.type === type)));
  };

  const value = useMemo(() => ({ items, isSaved, toggleSave, remove }), [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextValue => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
