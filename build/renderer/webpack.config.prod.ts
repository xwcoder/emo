import { merge } from 'webpack-merge'
import commonConfig from './webpack.config.common'

const config = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'renderer.js',
  },
})

export default config
