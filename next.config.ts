/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Možeš dodati druge opcije ako su potrebne
};

// next.config.js
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    missingEnvVars: 'ignore',
  },
  output: 'standalone',
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60, // maksimalno dugo ignoriše rebuild greške
  },
  poweredByHeader: false,
  generateEtags: false,
};
