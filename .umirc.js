var path = require('path')

// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: true,按需加载
      title: '智赛竞技平台',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
          /assets/,
          /odoo/,
        ],
      },
    }],
  ],
  // history:'hash',哈希路由将导致state不可用
  base: '/itable',
  publicPath: '/itable/',
  chainWebpack(config, { webpack }) {
    console.log(process.env.NODE_ENV);
    console.log(process.argv)
    // let proxy = {}
    // if (process.env.NODE_ENV === "development" || process.argv.splice(2).indexOf('local') > -1) {
    //   proxy = {
    //     '/api': {
    //       target: 'http://192.168.1.88:8069',
    //       changeOrigin: true,
    //       pathRewrite: { '^/api': '' },
    //     }
    //   }
    // } else {
    //   proxy = {
    //     '/api': {
    //       target: 'http://139.198.21.140:8069',
    //       changeOrigin: true,
    //       pathRewrite: { '^/api': '' },
    //     }
    //   }
    // }
    config.merge({
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: ['ts-loader'],
            exclude: [
              path.resolve(__dirname, 'node_modules')
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
      // devServer: {
      //   proxy: proxy,
      // },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            resolve: {
              extensions: ['', '.ts', '.tsx']
            }
          }
        }),
        // new webpack.DefinePlugin({
        //   local: JSON.stringify('local')
        // })
      ]
    })
  }
}
