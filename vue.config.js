module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://novel.juhe.im',
                    pathRewrite: {'/api': ''},
                    ws: true,
                    changeOrigin: true,
                },
            }
        }
    }
}