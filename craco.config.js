const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}
