module.exports = {
    //proxy the api to backend
    devServer: {
        proxy: {
          '^/backend': {
            target: 'http://localhost:8090',
            ws: true,
            changeOrigin: true
          }
        }
    }
}