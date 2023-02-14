/** @type {import('next').NextConfig} */

const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'w3.org'],
  },
  devIndicators: {
    buildActivity: false
  },
  withImages
}

module.exports = nextConfig

