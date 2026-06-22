import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@driveos/shared"],
  typedRoutes: true,
};

export default nextConfig;
