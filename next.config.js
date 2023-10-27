/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://port-0-refresh-bookstore-20zynm2mlk1daxmm.sel4.cloudtype.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
