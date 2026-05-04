"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Flower } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
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
      suppressHydrationWarning
    >
      <CurrentIcon className="w-5 h-5" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
