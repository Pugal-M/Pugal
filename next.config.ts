import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // ⬅️ Enables static export (replaces `next export`)
  trailingSlash: true, // ⬅️ Recommended for GitHub Pages compatibility
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // ⬅️ Required for static export if using <Image />
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'studio.firebase.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
