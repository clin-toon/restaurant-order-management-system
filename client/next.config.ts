import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", //
      },
    ],
  },
  allowedDevOrigins: ["192.168.101.8"],
};

export default nextConfig;
