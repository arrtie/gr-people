import type { NextConfig } from "next";

const backendUrl =
  process.env.BACKEND_INTERNAL_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:3001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/people",
        destination: `${backendUrl}/people`,
      },
    ];
  },
};

export default nextConfig;
