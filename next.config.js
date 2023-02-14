/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  devIndicators: {
    buildActivity: false
  },
}

module.exports = nextConfig

