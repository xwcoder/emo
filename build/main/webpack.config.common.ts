import * as path from 'node:path'
import { merge } from 'webpack-merge'
import baseConfig from '../webpack.config.base'
import { src } from '../paths'

const context = path.resolve(src, './main')

const config = merge(baseConfig, {
  context,
  target: ['electron-main'],
  entry: ['./main.ts'],
  output: {
    filename: 'main.js',
  },
  externals: {
    sqlite3: 'commonjs sqlite3',
  },
})

export default config
