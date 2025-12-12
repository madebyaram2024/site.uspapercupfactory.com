import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true, // Useful for simple local image handling if needed, or stick to standard.
  },
};

export default nextConfig;
