import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ToastType = "success" | "info" | "error";

type Toast = {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
};

type ShowToastOptions = {
  description?: string;
  type?: ToastType;
  duration?: number;
};

type ToastContextValue = {
  showToast: (title: string, options?: ShowToastOptions) => string;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, options?: ShowToastOptions) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const toast: Toast = {
        id,
        title,
        description: options?.description,
        type: options?.type ?? "info"
      };

      setToasts((prev) => [...prev, toast]);

      const duration = options?.duration ?? 3200;
      if (duration > 0 && typeof window !== "undefined") {
        window.setTimeout(() => dismissToast(id), duration);
      }

      return id;
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({
      showToast,
      dismissToast
    }),
    [showToast, dismissToast]
  );

  const toneClass = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-emerald-200 bg-white shadow-emerald-100/60";
      case "error":
        return "border-rose-200 bg-white shadow-rose-100/60";
      default:
        return "border-slate-200 bg-white shadow-slate-100/60";
    }
  };

  const pillClass = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-emerald-100 text-emerald-800";
      case "error":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex max-w-md flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm text-slate-900 shadow-lg ${toneClass(toast.type)}`}
          >
            <span className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${pillClass(toast.type)}`}>
              {toast.type}
            </span>
            <div className="flex-1 space-y-1">
              <p className="font-semibold">{toast.title}</p>
              {toast.description && <p className="text-xs text-slate-600">{toast.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="ml-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300"
              aria-label="Dismiss notification"
            >
              Close
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
