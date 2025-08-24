import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    const cls = document.documentElement.classList;
    console.log("HTML classes:", document.documentElement.className);
    // Always remove first to avoid duplicates
    cls.remove("dark");
    if (isDark) {
      cls.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    console.log("Dark mode changed:", isDark);
  }, [isDark]);

  return { isDark, setIsDark };
}
