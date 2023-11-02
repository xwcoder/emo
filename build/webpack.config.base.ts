import * as path from 'node:path'
import type { Configuration } from 'webpack'
import { src, dist } from './paths'

const config: Configuration = {
  output: {
    path: dist,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
    alias: {
      '@': path.resolve(src),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}

export default config
