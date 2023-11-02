import * as path from 'node:path'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import baseConfig from '../webpack.config.base'
import { src, dist } from '../paths'

const context = path.resolve(src, './renderer')

const config = merge(baseConfig, {
  context,
  target: ['web'],
  entry: ['./index.tsx'],
  output: {
    path: path.resolve(dist, './renderer'),
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
})

export default config
