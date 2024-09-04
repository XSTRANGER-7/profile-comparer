const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/github',
    createProxyMiddleware({
      target: 'https://api.github.com',
      changeOrigin: true,
      pathRewrite: {
        '^/github': '',
      },
    })
  );
};
