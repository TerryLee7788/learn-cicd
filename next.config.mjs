/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  basePath: "/learn-cicd",
  assetPrefix: "/learn-cicd/",
  reactStrictMode: true,
  swcMinify: true,
  // 启用 SWC
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
