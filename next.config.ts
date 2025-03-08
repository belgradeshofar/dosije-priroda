/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Možeš dodati druge opcije ako su potrebne
};

module.exports = nextConfig;

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    missingEnvVars: 'ignore',  // IGNORIŠE NEDOSTAJUĆE ENV VARIJABLE
  },
};
