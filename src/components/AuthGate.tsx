import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface AuthGateProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const AuthGate = ({ children, title, description }: AuthGateProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
          Loading your account…
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Account required</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{title ?? "Sign in to continue"}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {description ?? "Create an account or sign in to manage your jobs, alerts, and applications."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
            <button
              type="button"
              className="rounded-full bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
              onClick={() => navigate("/auth", { state: { redirectTo: location.pathname } })}
            >
              Sign in
            </button>
            <button
              type="button"
              className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-emerald-800 transition hover:bg-emerald-50"
              onClick={() => navigate("/", { replace: false })}
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;
