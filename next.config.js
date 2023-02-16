const withImages = require('next-images')
const { redirect } = require('next/dist/server/api-utils')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'w3.org'],
  },
  devIndicators: {
    buildActivity: false
  },
  withImages,
  async redirects(){
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig

