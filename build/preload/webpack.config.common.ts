import * as path from 'node:path'
import { merge } from 'webpack-merge'
import baseConfig from '../webpack.config.base'
import { src } from '../paths'

const context = path.resolve(src, './preload')

const config = merge(baseConfig, {
  context,
  target: ['electron-preload'],
  entry: ['./index.ts'],
  output: {
    filename: 'preload.js',
  },
})

export default config
