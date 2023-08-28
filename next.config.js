/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bing.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.coinranking.com',
        pathname: '/**'
      },
    ],
    dangerouslyAllowSVG: true,
  }
}

module.exports = nextConfig
