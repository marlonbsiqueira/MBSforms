/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/MBSforms',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
