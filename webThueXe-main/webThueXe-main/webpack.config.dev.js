const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin'); // <--- 1. BẮT BUỘC PHẢI CÓ DÒNG NÀY

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },

  // 2. BẮT BUỘC PHẢI ĐẶT TRONG 'plugins: []'
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },

        // --- CÁC DÒNG BẠN THÊM ---
        { from: 'anh.jpg', to: 'anh.jpg' },
        { from: 'index2.html', to: 'index2.html' }
        // -------------------------
      ],
    }),
  ],
});
