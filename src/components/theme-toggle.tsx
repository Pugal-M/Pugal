// src/components/theme-toggle.tsx
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        "relative inline-flex items-center h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 p-[2px] transition-colors duration-300 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        theme === 'dark' 
          ? 'bg-neutral-900 border-neutral-700 hover:bg-neutral-800 shadow-[0_0_0_1px_hsl(var(--primary)/0.2),_0_0_3px_hsl(var(--primary)/0.2)]' 
          : 'bg-slate-200 border-slate-300 hover:bg-slate-300'
      )}
    >
      {/* Sun icon on track (visible when theme is dark, represents light mode option) */}
      <Sun
        className={cn(
          "absolute left-[5px] top-1/2 -translate-y-1/2 h-[13px] w-[13px] transition-all duration-300 ease-in-out",
          theme === 'dark' 
            ? 'text-cyan-400 opacity-100 scale-100' 
            : 'text-orange-500 opacity-0 scale-50' 
        )}
        style={theme === 'dark' ? { filter: 'drop-shadow(0 0 2px hsl(var(--primary) / 0.7))' } : {}}
        strokeWidth={theme === 'dark' ? 2 : 2.5}
      />
      {/* Moon icon on track (visible when theme is light, represents dark mode option) */}
      <Moon
         className={cn(
          "absolute right-[5px] top-1/2 -translate-y-1/2 h-[13px] w-[13px] transition-all duration-300 ease-in-out",
          theme === 'light' 
            ? 'text-slate-500 opacity-100 scale-100' 
            : 'text-slate-300 opacity-0 scale-50'
        )}
        strokeWidth={theme === 'light' ? 2 : 2.5}
      />
      
      {/* Thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none flex h-5 w-5 transform items-center justify-center rounded-full shadow-lg ring-0 transition-transform duration-300 ease-in-out",
          theme === 'dark' 
            ? 'bg-neutral-700' 
            : 'bg-white'
        )}
        style={{ transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0px)'}}
      >
        {/* Icon inside the thumb (active icon) */}
        {theme === 'dark' ? (
          <Moon className="h-3 w-3 text-slate-300" fill="currentColor" strokeWidth={2.5} />
        ) : (
          <Sun className="h-3 w-3 text-orange-500" fill="currentColor" strokeWidth={2.5}/>
        )}
      </span>
    </button>
  );
}
