import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@driveos/shared"],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
