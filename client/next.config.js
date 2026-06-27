/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "encrypted-tbn0.gstatic.com"],
  },
  // ✅ ADD THIS SECTION for API proxying
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://32.236.17.105:8000/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;