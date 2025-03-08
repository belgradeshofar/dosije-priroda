/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Možeš dodati druge opcije ako su potrebne
};

module.exports = nextConfig;

module.exports = {
  typescript: {
    // Upozorenje: Ovo omogućava da build uspešno prođe čak i ako postoje TypeScript greške.
    ignoreBuildErrors: true,
  },
};
