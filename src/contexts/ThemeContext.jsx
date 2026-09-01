import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(false);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" && document.body.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeContext.Provider value={isDark}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
