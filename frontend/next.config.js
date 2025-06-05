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
};

module.exports = nextConfig;
