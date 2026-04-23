import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - Turbopack config at top level avoids experimental warning in Next 15+
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
