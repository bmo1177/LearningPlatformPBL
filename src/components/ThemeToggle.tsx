"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Flower } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder
  }

  const themes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "theme-pinkish", icon: Flower, label: "Pinkish" },
    { id: "dark", icon: Moon, label: "Dark" },
  ];

  const currentThemeIndex = themes.findIndex((t) => t.id === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
  const CurrentIcon = themes[currentThemeIndex > -1 ? currentThemeIndex : 0].icon;

  return (
    <button
      onClick={() => setTheme(nextTheme.id)}
      className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      title={`Switch to ${nextTheme.label} theme`}
    >
      <CurrentIcon className="w-5 h-5" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
