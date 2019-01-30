module.exports = {
    //proxy the api to backend
    devServer: {
        proxy: {
          '^/api': {
            target: 'http://localhost:8090',
            ws: true,
            changeOrigin: true
          }
        }
    }
}