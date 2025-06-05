/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: [
      "media.istockphoto.com",
      "plus.unsplash.com",
      "images.unsplash.com",
    ],
  },
  // Disable webpack5 features that might conflict with browserslist
  webpack: (config, { isServer }) => {
    // Fix browserslist issue
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
