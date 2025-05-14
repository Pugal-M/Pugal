"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
const ThemeToggle = dynamic(() => import('./theme-toggle').then((mod) => mod.ThemeToggle), { ssr: false });

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Project', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="#hero" className="mr-auto flex items-center space-x-2">
          <span className="text-xl font-bold text-foreground">Pugalarasu M</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="animated-underline" // Updated class for animated underline
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="ml-auto flex items-center md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background">
              <nav className="grid gap-6 text-lg font-medium mt-10">
                 <Link href="#hero" className="flex items-center gap-2 text-lg font-semibold mb-4 border-b pb-4">
                    <span className="text-xl font-bold text-foreground">Pugalarasu M</span>
                 </Link>
                {navItems.map((item) => (
                 <SheetClose asChild key={item.label}>
                     <Link
                       href={item.href}
                       className="flex items-center px-2.5 text-muted-foreground hover:text-foreground hover:underline underline-offset-4" // Mobile retains original underline
                     >
                       {item.label}
                     </Link>
                 </SheetClose>
               ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
