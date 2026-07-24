/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "encrypted-tbn0.gstatic.com", "randomuser.me"],
  },
  // Disable font optimization to skip fetching
  optimizeFonts: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://learnify-lms.duckdns.org/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;