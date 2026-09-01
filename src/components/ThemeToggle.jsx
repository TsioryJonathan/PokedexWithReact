import { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { keyframes } from "@emotion/react";

const rotateAnim = keyframes`
  0% { transform: rotate(0deg); }
  70% { transform: rotate(180deg) scale(1.12); }
  100% { transform: rotate(360deg); }
`;

export default function ThemeToggle() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const getInitialTheme = () => {
    return localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setAnim(true);
    setTheme(theme === "light" ? "dark" : "light");
    setTimeout(() => setAnim(false), 350);
  };

  return (
    <div className="fixed top-8 right-8 z-41 flex flex-col items-end gap-2">
      <Tooltip title={theme === "light" ? "Activate the dark mode" : "Activate the light mode"} placement="left" arrow>
        <Button
          onClick={handleToggle}
          sx={{
            borderRadius: "50%",
            minWidth: 56,
            minHeight: 56,
            boxShadow: 3,
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            border: "2px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            transition: "background 0.2s, color 0.2s",
            '&:hover': {
              backgroundColor: "var(--muted)",
            },
          }}
        >
          <span
            style={{
              display: "flex",
              animation: anim ? `${rotateAnim} 0.35s` : undefined,
            }}
          >
            {theme === "light" ? <Moon size={28} /> : <Sun size={28} />}
          </span>
        </Button>
      </Tooltip>
    </div>
  );
}
