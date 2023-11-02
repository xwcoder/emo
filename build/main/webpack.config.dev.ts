import { merge } from 'webpack-merge'
import commonConfig from './webpack.config.common'

const config = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
})

export default config
