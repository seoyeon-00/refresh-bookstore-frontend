/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://port-0-refresh-bookstore-20zynm2mlk1daxmm.sel4.cloudtype.app/api/:path*",
      },
    ];
  },
  images: {
    domains: ["image.aladin.co.kr"],
  },
};

module.exports = nextConfig;
