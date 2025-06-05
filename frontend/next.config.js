/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.istockphoto.com",
      "plus.unsplash.com",
      "images.unsplash.com",
    ],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
  output: "export",
  distDir: "dist",
};

module.exports = nextConfig;
