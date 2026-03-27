import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Use the app directory as Turbopack root so deps resolve from my-app/node_modules
  // (avoids picking a parent folder that has package.json but no tailwindcss)
  turbopack: {
    root: appDir,
  },
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
