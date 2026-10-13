export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "pycolors-starter-free:theme:v1";
const THEME_EVENT = "pycolors-theme-change";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

// Static application code only: the stored value is validated, never injected.
export const THEME_INIT_SCRIPT = `(() => {
  let theme;
  try { theme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch {}
  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
})();`;

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Appearance remains usable when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeToTheme(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    try {
      if (event.storageArea !== window.localStorage) return;
    } catch {
      return;
    }
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    if (event.key === null || event.newValue === null) {
      applyTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    } else if (isTheme(event.newValue)) {
      applyTheme(event.newValue);
    } else return;
    onChange();
  }
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
