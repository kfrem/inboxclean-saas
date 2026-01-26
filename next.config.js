/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    strictNullChecks: true,
  },
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
