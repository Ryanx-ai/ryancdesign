import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }],
    formats: ["image/avif", "image/webp"],
  },
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
};

export default nextConfig;
