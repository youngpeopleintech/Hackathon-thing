/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/register',
        destination: 'https://luma.com/1zien2bm',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
