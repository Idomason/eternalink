/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.istockphoto.com",
      "plus.unsplash.com",
      "images.unsplash.com",
      "unsplash.com",
      "thumbs.dreamstime.com",
    ],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
};

// Only enable export mode for production builds
if (process.env.NODE_ENV === "production") {
  nextConfig.output = "export";
  nextConfig.distDir = "dist";
}

module.exports = nextConfig;
