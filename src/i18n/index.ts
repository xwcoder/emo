import enUS from './en-US.json'
import zhCN from './zh-CN.json'

const data = [
  {
    code: 'en-US',
    value: enUS,
    label: 'English',
  },
  {
    code: 'zh-CN',
    value: zhCN,
    label: '简体中文',
  },
]

export const locales = Object.fromEntries(data.map((item) => [item.code, item.value]))
export const labels = data.map((item) => ({ label: item.label, value: item.code }))
