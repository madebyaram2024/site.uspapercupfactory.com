import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/shop',
        destination: '/#order',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
