"use client";
import { createContext, useEffect, useState, useContext } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: "system",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("system");

  const setTheme = (t: Theme) => {
    localStorage.theme = t;
    setThemeState(t);
    applyTheme(t);
  };

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;

    // Set Tailwind dark class
    if (t === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-color-mode", "dark");
    } else if (t === "light") {
      root.classList.remove("dark");
      root.setAttribute("data-color-mode", "light");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
      root.setAttribute("data-color-mode", prefersDark ? "dark" : "light");
    }
  };

  useEffect(() => {
    const saved = (localStorage.theme as Theme) || "system";
    setThemeState(saved);
    applyTheme(saved);

    // Optional: React to system changes live (if in "system" mode)
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") applyTheme("system");
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
