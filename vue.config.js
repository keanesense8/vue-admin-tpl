module.exports = {
    //proxy the api to backend
    devServer: {
        proxy: {
          '^/socket': {
            target: 'http://localhost:8090',
            ws: true,
            changeOrigin: true,
            secure: false
          },
          '/ws/': {
            target: 'ws://localhost:8090',
            ws: true,
            changeOrigin: true,
            secure: false
          }
        }
    }
}