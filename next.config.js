/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vibility-dev-storage.s3.amazonaws.com',
      }
    ]
  }
}

module.exports = nextConfig
