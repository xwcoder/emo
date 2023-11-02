import { merge } from 'webpack-merge'
import 'webpack-dev-server'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import commonConfig from './webpack.config.common'

const config = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'renderer.dev.js',
    publicPath: '/',
  },
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 4000,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
})

export default config
