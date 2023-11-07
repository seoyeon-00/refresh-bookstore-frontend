import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "https://port-0-refresh-bookstore-20zynm2mlk1daxmm.sel4.cloudtype.app",
      changeOrigin: true,
    })
  );
};
