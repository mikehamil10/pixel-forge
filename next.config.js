/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net`,
        port: '',
        pathname: `/${process.env.AZURE_CONTAINER_NAME}/**`,
      },
    ],
  },
};

module.exports = nextConfig;
