import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "5.imimg.com" },
      { protocol: "https", hostname: "akbarbrasscorporation.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "dynamic.exportersindia.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;
