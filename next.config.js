/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['wedconnect-test.s3.amazonaws.com'],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/dashboard",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
