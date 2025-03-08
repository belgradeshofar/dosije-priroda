/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Možeš dodati druge opcije ako su potrebne
};

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  experimental: {
    runtime: 'nodejs',
  },
};
