import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Turbopack root only for local dev when a parent folder has package.json (e.g. monorepo).
  // Omit on Vercel so production build/output routing is not affected.
  ...(!process.env.VERCEL ? { turbopack: { root: appDir } } : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
