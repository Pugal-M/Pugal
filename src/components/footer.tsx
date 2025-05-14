
import Link from 'next/link';

interface FooterProps {
  isProjectPage?: boolean; // Optional prop
}

export function Footer({ isProjectPage = false }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 md:px-8 md:py-8 w-full border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          &copy; {currentYear} Pugalarasu M. All rights reserved.
        </p>
        {!isProjectPage && ( // Conditionally render navigation links
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/#hero"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/#skills"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Skills
            </Link>
            <Link
              href="/#projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Project
            </Link>
            <Link
              href="/#certificates" // Added Certificates link
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Certificates
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </footer>
  );
}
