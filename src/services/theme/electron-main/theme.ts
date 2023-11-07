import { app, nativeTheme } from 'electron'
import * as settingService from '@/services/settings/electron-main/settings'

const getTheme = () => {
  const appearance = settingService.get('appearance')
  return appearance === 'auto' ? 'system' : appearance
}

export const init = () => {
  app.whenReady()
    .then(() => {
      nativeTheme.themeSource = getTheme()
    })

  settingService.on('change', (path) => {
    if (path === 'appearance') {
      nativeTheme.themeSource = getTheme()
    }
  })
}
