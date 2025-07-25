// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { GlobalLoadingIndicator } from '@/components/GlobalLoadingIndicator';

export const metadata: Metadata = {
  title: 'Pugalarasu M - Portfolio',
  description: 'Professional portfolio website for Pugalarasu M.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="gradient-blur-container">
          <div className="gradient-blur gradient-blur-1"></div>
          <div className="gradient-blur gradient-blur-2"></div>
        </div>
        <div className="main-content-area">
          <LoadingProvider>
            <ThemeProvider
              defaultTheme="dark"
              storageKey="portfolio-theme"
            >
              {children}
              <Toaster />
              <GlobalLoadingIndicator />
            </ThemeProvider>
          </LoadingProvider>
        </div>
      </body>
    </html>
  );
}

    