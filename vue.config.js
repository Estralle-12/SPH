const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,
    lintOnSave: false,

    // 代理跨域
    devServer: {
        proxy: {
            // 会把请求路径中的/api换为后面的代理服务器
            '/api': {
                // 提供数据的服务器地址
                target: 'http://gmall-h5-api.atguigu.cn',
            }
        }
    }
})