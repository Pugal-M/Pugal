"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle({ inline = true }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) {
    return <div className={inline ? "w-8 h-8" : "fixed top-6 right-6 z-50 w-10 h-10"} />;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`${
        inline ? "p-2" : "fixed top-6 right-6 z-50 p-2.5 shadow-lg"
      } rounded-full glass flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-google-yellow" />
      ) : (
        <Moon size={18} className="text-google-blue" />
      )}
    </motion.button>
  );
}
