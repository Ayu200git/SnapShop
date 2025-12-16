export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export const buttonClass = (variant: ButtonVariant = "primary") => {
  const base = "btn";
  const map: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    ghost: "btn-ghost",
  };
  return `${base} ${map[variant]}`;
};

export const badgeClass = (variant: "primary" | "danger" | "success" = "primary") => {
  const base = "badge";
  const map = {
    primary: "badge-primary",
    danger: "badge-danger",
    success: "badge-success",
  } as const;
  return `${base} ${map[typeof variant === "string" ? variant : "primary"]}`;
};

export type ThemeMode = "dark" | "light";
import { STORAGE_KEYS } from "./constants";

export const getTheme = (): ThemeMode => {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode | null;
  if (saved === "light" || saved === "dark") return saved;
  return "dark";
};

export const setTheme = (mode: ThemeMode) => {
  const root = document.documentElement;
  if (mode === "light") {
    root.classList.add("theme-light");
  } else {
    root.classList.remove("theme-light");
  }
  localStorage.setItem(STORAGE_KEYS.THEME, mode);
};

export const toggleTheme = (): ThemeMode => {
  const next: ThemeMode = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
};


