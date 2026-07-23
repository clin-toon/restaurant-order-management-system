import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API}:path*`,
      },
    ];
  },
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
