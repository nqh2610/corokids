const nextConfig = {
  images: {
    domains: ['localhost', 'api.dicebear.com'],
  },
  // Giảm bundle size
  swcMinify: true,
  // Tối ưu cho production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Cải thiện navigation
  reactStrictMode: false,
}
module.exports = nextConfig
