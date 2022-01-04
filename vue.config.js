module.exports = {
  // runtimeCompiler: true, // 为了实现动态模板添加 https://blog.csdn.net/xiaomajia029/article/details/88320233
  devServer: {
    host: 'localhost', // target host
    port: 8899,
    proxy: {
      '/api': {
        target: 'http://localhost:9044', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // ws: true, // proxy websockets
        // secure: false https协议下为true
        pathRewrite: {
          '^/api': '/'
          // pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          // pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      },
      '/ws': {
        target: 'ws://localhost:9044', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true // proxy websockets
        // secure: false https协议下为true
        // pathRewrite: {
        //   '^/ws': '/'
        //   // pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
        //   // pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        // }
      }
    }
  }
}
