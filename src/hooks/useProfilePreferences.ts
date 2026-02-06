import { useEffect, useState } from "react";

type ThemePref = "system" | "light" | "dark";

interface ProfilePreferences {
  alertsEnabled: boolean;
  digestEnabled: boolean;
  themePref: ThemePref;
  setAlertsEnabled: (next: boolean) => void;
  setDigestEnabled: (next: boolean) => void;
  setThemePref: (next: ThemePref) => void;
  cycleThemePref: () => void;
}

const defaultPrefs = {
  alertsEnabled: false,
  digestEnabled: true,
  themePref: "system" as ThemePref
};

export const useProfilePreferences = (): ProfilePreferences => {
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedAlerts = localStorage.getItem("pref:alerts");
    const storedDigest = localStorage.getItem("pref:digest");
    const storedTheme = localStorage.getItem("pref:theme") as ThemePref | null;

    setPrefs({
      alertsEnabled: storedAlerts ? storedAlerts === "on" : defaultPrefs.alertsEnabled,
      digestEnabled: storedDigest ? storedDigest === "on" : defaultPrefs.digestEnabled,
      themePref: storedTheme ?? defaultPrefs.themePref
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("pref:alerts", prefs.alertsEnabled ? "on" : "off");
    localStorage.setItem("pref:digest", prefs.digestEnabled ? "on" : "off");
    localStorage.setItem("pref:theme", prefs.themePref);
  }, [prefs.alertsEnabled, prefs.digestEnabled, prefs.themePref]);

  const setAlertsEnabled = (next: boolean) => setPrefs((prev) => ({ ...prev, alertsEnabled: next }));
  const setDigestEnabled = (next: boolean) => setPrefs((prev) => ({ ...prev, digestEnabled: next }));
  const setThemePref = (next: ThemePref) => setPrefs((prev) => ({ ...prev, themePref: next }));

  const cycleThemePref = () => {
    setPrefs((prev) => {
      if (prev.themePref === "system") return { ...prev, themePref: "dark" };
      if (prev.themePref === "dark") return { ...prev, themePref: "light" };
      return { ...prev, themePref: "system" };
    });
  };

  return { ...prefs, setAlertsEnabled, setDigestEnabled, setThemePref, cycleThemePref };
};
