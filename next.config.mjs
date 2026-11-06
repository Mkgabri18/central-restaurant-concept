/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === "production" ? "/central-restaurant-concept" : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  basePath,
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
