const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://211.62.99.57:8082",
      changeOrigin: true,
    })
  );
};