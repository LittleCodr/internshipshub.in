import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import type { OpportunityType } from "../types/content";

type OperationResult<T = undefined> = { ok: true; data?: T; message?: string } | { ok: false; error: string };

type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface SavedJob {
  slug: string;
  type: OpportunityType;
  title: string;
  company: string;
  applyLink: string;
  savedAt: number;
}

export interface ApplicationEntry {
  id: string;
  companyName: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
  relatedSlug?: string;
  relatedType?: OpportunityType;
}

export interface JobAlert {
  id: string;
  keywords: string;
  location: string;
  type: OpportunityType;
  remoteOnly: boolean;
  frequency: "daily" | "weekly";
  createdAt: number;
}

export interface ProfileData {
  fullName: string;
  phone?: string;
  city: string;
  state: string;
  country: string;
  educationLevel: string;
  fieldOfStudy: string;
  graduationYear: string;
  skills: string[];
  resumeFileName?: string;
  resumeDataUrl?: string;
  resumeUpdatedAt?: number;
}

export interface UserSettings {
  emailNotifications: boolean;
  weeklyDigest: boolean;
  profileVisibility: boolean;
}

interface UserData {
  savedJobs: SavedJob[];
  applications: ApplicationEntry[];
  alerts: JobAlert[];
  profile: ProfileData;
  settings: UserSettings;
}

interface UserDataContextValue {
  loading: boolean;
  savedJobs: SavedJob[];
  isJobSaved: (slug: string, type: OpportunityType) => boolean;
  saveJob: (job: Omit<SavedJob, "savedAt">) => OperationResult;
  removeJob: (slug: string, type: OpportunityType) => OperationResult;
  applications: ApplicationEntry[];
  addApplication: (input: Omit<ApplicationEntry, "id" | "createdAt" | "updatedAt">) => OperationResult<{ id: string }>;
  updateApplication: (id: string, updates: Partial<Omit<ApplicationEntry, "id" | "createdAt">>) => OperationResult;
  deleteApplication: (id: string) => OperationResult;
  jobAlerts: JobAlert[];
  addJobAlert: (input: Omit<JobAlert, "id" | "createdAt">) => OperationResult<{ id: string }>;
  updateJobAlert: (id: string, updates: Partial<Omit<JobAlert, "id" | "createdAt">>) => OperationResult;
  deleteJobAlert: (id: string) => OperationResult;
  profile: ProfileData;
  updateProfile: (updates: Partial<ProfileData>) => OperationResult;
  updateResume: (fileName: string, dataUrl: string) => OperationResult;
  removeResume: () => OperationResult;
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => OperationResult;
  profileCompletion: number;
  recentSavedJobs: SavedJob[];
  recentApplications: ApplicationEntry[];
  clearUserData: () => void;
}

const defaultProfile: ProfileData = {
  fullName: "",
  phone: "",
  city: "",
  state: "",
  country: "India",
  educationLevel: "",
  fieldOfStudy: "",
  graduationYear: "",
  skills: [],
  resumeFileName: undefined,
  resumeDataUrl: undefined,
  resumeUpdatedAt: undefined
};

const defaultSettings: UserSettings = {
  emailNotifications: true,
  weeklyDigest: true,
  profileVisibility: true
};

const defaultData: UserData = {
  savedJobs: [],
  applications: [],
  alerts: [],
  profile: defaultProfile,
  settings: defaultSettings
};

const UserDataContext = createContext<UserDataContextValue | undefined>(undefined);

const storageKeyFor = (uid?: string | null) => `ihub:user:${uid ?? "guest"}:v1`;

const safeParse = (raw: string | null): UserData => {
  if (!raw) return defaultData;
  try {
    const parsed = JSON.parse(raw) as Partial<UserData>;
    return {
      savedJobs: parsed.savedJobs ?? [],
      applications: parsed.applications ?? [],
      alerts: parsed.alerts ?? [],
      profile: { ...defaultProfile, ...(parsed.profile ?? {}) },
      settings: { ...defaultSettings, ...(parsed.settings ?? {}) }
    } satisfies UserData;
  } catch {
    return defaultData;
  }
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [data, setData] = useState<UserData>(defaultData);
  const [loading, setLoading] = useState(true);

  const storageKey = useMemo(() => storageKeyFor(user?.uid ?? null), [user?.uid]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setData(defaultData);
      setLoading(false);
      return;
    }

    setLoading(true);
    const next = safeParse(localStorage.getItem(storageKey));

    // Migrate legacy wishlist to saved jobs for the signed-in user only.
    try {
      const legacyRaw = user ? localStorage.getItem("ihub_wishlist_v1") : null;
      if (legacyRaw) {
        const legacyItems = JSON.parse(legacyRaw) as Array<{
          slug: string;
          type: OpportunityType;
          title: string;
          company: string;
          applyLink: string;
        }>;
        const migrated = legacyItems.map((item) => ({ ...item, savedAt: Date.now() })) as SavedJob[];
        const merged = [...migrated, ...(next.savedJobs ?? [])];
        next.savedJobs = merged.filter(
          (item, index, self) =>
            self.findIndex((x) => x.slug === item.slug && x.type === item.type) === index
        );
        localStorage.removeItem("ihub_wishlist_v1");
      }
    } catch {
      /* ignore migration errors */
    }

    setData(next);
    setLoading(false);
  }, [storageKey, user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (loading) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      /* ignore persistence errors */
    }
  }, [data, loading, storageKey]);

  const requireUser = () => {
    if (!user) return "Sign in to use this feature.";
    return null;
  };

  const isJobSaved = (slug: string, type: OpportunityType) =>
    data.savedJobs.some((item) => item.slug === slug && item.type === type);

  const saveJob = (job: Omit<SavedJob, "savedAt">): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    const duplicate = data.savedJobs.some((item) => item.slug === job.slug && item.type === job.type);
    if (duplicate) return { ok: false, error: "Already saved" };
    setData((prev) => ({ ...prev, savedJobs: [{ ...job, savedAt: Date.now() }, ...prev.savedJobs] }));
    return { ok: true };
  };

  const removeJob = (slug: string, type: OpportunityType): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    setData((prev) => ({ ...prev, savedJobs: prev.savedJobs.filter((item) => !(item.slug === slug && item.type === type)) }));
    return { ok: true };
  };

  const addApplication = (
    input: Omit<ApplicationEntry, "id" | "createdAt" | "updatedAt">
  ): OperationResult<{ id: string }> => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    const signature = `${input.companyName.trim().toLowerCase()}|${input.role.trim().toLowerCase()}|${input.appliedDate}`;
    const exists = data.applications.some(
      (app) => `${app.companyName.trim().toLowerCase()}|${app.role.trim().toLowerCase()}|${app.appliedDate}` === signature
    );
    if (exists) return { ok: false, error: "This application already exists." };
    const now = Date.now();
    const id = uid();
    const entry: ApplicationEntry = { ...input, id, createdAt: now, updatedAt: now };
    setData((prev) => ({ ...prev, applications: [entry, ...prev.applications] }));
    return { ok: true, data: { id } };
  };

  const updateApplication = (id: string, updates: Partial<Omit<ApplicationEntry, "id" | "createdAt">>): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    let found = false;
    setData((prev) => ({
      ...prev,
      applications: prev.applications.map((app) => {
        if (app.id !== id) return app;
        found = true;
        return { ...app, ...updates, updatedAt: Date.now() };
      })
    }));
    if (!found) return { ok: false, error: "Application not found" };
    return { ok: true };
  };

  const deleteApplication = (id: string): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    const exists = data.applications.some((app) => app.id === id);
    if (!exists) return { ok: false, error: "Application not found" };
    setData((prev) => ({ ...prev, applications: prev.applications.filter((app) => app.id !== id) }));
    return { ok: true };
  };

  const addJobAlert = (
    input: Omit<JobAlert, "id" | "createdAt">
  ): OperationResult<{ id: string }> => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    const signature = `${input.keywords.trim().toLowerCase()}|${input.location.trim().toLowerCase()}|${input.type}|${input.remoteOnly}|${input.frequency}`;
    const exists = data.alerts.some(
      (alert) =>
        `${alert.keywords.trim().toLowerCase()}|${alert.location.trim().toLowerCase()}|${alert.type}|${alert.remoteOnly}|${alert.frequency}` === signature
    );
    if (exists) return { ok: false, error: "Alert already exists" };
    const id = uid();
    const entry: JobAlert = { ...input, id, createdAt: Date.now() };
    setData((prev) => ({ ...prev, alerts: [entry, ...prev.alerts] }));
    return { ok: true, data: { id } };
  };

  const updateJobAlert = (
    id: string,
    updates: Partial<Omit<JobAlert, "id" | "createdAt">>
  ): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    let found = false;
    setData((prev) => ({
      ...prev,
      alerts: prev.alerts.map((alert) => {
        if (alert.id !== id) return alert;
        found = true;
        return { ...alert, ...updates };
      })
    }));
    if (!found) return { ok: false, error: "Alert not found" };
    return { ok: true };
  };

  const deleteJobAlert = (id: string): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    const exists = data.alerts.some((alert) => alert.id === id);
    if (!exists) return { ok: false, error: "Alert not found" };
    setData((prev) => ({ ...prev, alerts: prev.alerts.filter((alert) => alert.id !== id) }));
    return { ok: true };
  };

  const updateProfile = (updates: Partial<ProfileData>): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    setData((prev) => ({ ...prev, profile: { ...prev.profile, ...updates } }));
    return { ok: true };
  };

  const updateResume = (fileName: string, dataUrl: string): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, resumeFileName: fileName, resumeDataUrl: dataUrl, resumeUpdatedAt: Date.now() }
    }));
    return { ok: true };
  };

  const removeResume = (): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, resumeFileName: undefined, resumeDataUrl: undefined, resumeUpdatedAt: undefined }
    }));
    return { ok: true };
  };

  const updateSettings = (updates: Partial<UserSettings>): OperationResult => {
    const guard = requireUser();
    if (guard) return { ok: false, error: guard };
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...updates } }));
    return { ok: true };
  };

  const clearUserData = () => {
    setData(defaultData);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }
  };

  const profileCompletion = useMemo(() => {
    const { fullName, city, country, skills, resumeDataUrl, educationLevel, fieldOfStudy, graduationYear } = data.profile;
    const checkpoints = [
      fullName.trim() !== "" && city.trim() !== "" && country.trim() !== "",
      skills.length > 0,
      Boolean(resumeDataUrl),
      educationLevel.trim() !== "" && fieldOfStudy.trim() !== "" && graduationYear.trim() !== ""
    ];
    const score = checkpoints.reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
    return Math.round((score / checkpoints.length) * 100);
  }, [data.profile]);

  const recentSavedJobs = useMemo(
    () => [...data.savedJobs].sort((a, b) => b.savedAt - a.savedAt).slice(0, 5),
    [data.savedJobs]
  );

  const recentApplications = useMemo(
    () =>
      [...data.applications]
        .sort((a, b) => new Date(b.appliedDate).valueOf() - new Date(a.appliedDate).valueOf())
        .slice(0, 5),
    [data.applications]
  );

  const value = useMemo<UserDataContextValue>(
    () => ({
      loading,
      savedJobs: data.savedJobs,
      isJobSaved,
      saveJob,
      removeJob,
      applications: data.applications,
      addApplication,
      updateApplication,
      deleteApplication,
      jobAlerts: data.alerts,
      addJobAlert,
      updateJobAlert,
      deleteJobAlert,
      profile: data.profile,
      updateProfile,
      updateResume,
      removeResume,
      settings: data.settings,
      updateSettings,
      profileCompletion,
      recentSavedJobs,
      recentApplications,
      clearUserData
    }),
    [data, loading, profileCompletion, recentApplications, recentSavedJobs]
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};

export const useUserData = (): UserDataContextValue => {
  const ctx = useContext(UserDataContext);
  if (!ctx) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return ctx;
};
