"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
export default function ThemeTogglebutton({
  className,
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size="icon"
      className={cn("rounded-full bg-background/30", className)}
      variant="outline"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      <Sun className="w-6 h-6 scale-100 transm dark:scale-0" color="#F9802D" />
      <Moon className="absolute w-6 h-6 scale-0 transm dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
