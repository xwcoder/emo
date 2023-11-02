import { merge } from 'webpack-merge'
import commonConfig from './webpack.config.common'

const config = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
})

export default config
