/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Možeš dodati druge opcije ako su potrebne
};

module.exports = nextConfig;

// next.config.js
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
