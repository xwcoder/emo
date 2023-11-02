import { merge } from 'webpack-merge'
import commonConfig from './webpack.config.common'

const config = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
})

export default config
