// eslint-disable-next-line no-undef
const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.gearfocus.div4.pgtest.co',
      changeOrigin: true,
      secure: false,
      onProxyReq: function (proxyReq, req, res) {
        proxyReq.removeHeader('Origin');
      },
      logLevel: 'debug',
    }),
  );
};
