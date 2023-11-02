const fs = require('node:fs')
const path = require('node:path')
const package = require('../package.json')

const excludeDeps = [
  '@fluentui/react-components',
  '@fluentui/react-icons',
  'lodash.get',
  'mobx',
  'mobx-react-lite',
  'react',
  'react-dom',
  'react-intl-universal',
]

fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify({
  ...package,
  dependencies: Object.fromEntries(Object.entries(package.dependencies).filter(([k]) => excludeDeps.indexOf(k) === -1)),
}, null, 2))
