/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/learn-cicd" : "",
  reactStrictMode: true,
  swcMinify: true,
  // 启用 SWC
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
