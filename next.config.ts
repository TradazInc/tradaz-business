import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    authInterrupts: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tradaz-api.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
