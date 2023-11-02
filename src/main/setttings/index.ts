import * as path from 'node:path'
import * as fs from 'node:fs'
import { app, nativeTheme } from 'electron'
import { Router } from '@/main/router'
import { readJSON, writeJSON } from '@/utils/node/fs'

const router = new Router({ prefix: '/settings' })

const settingsFilePath = path.join(app.getPath('userData'), 'settings.json')

type Settings = {
  locale: string
  appearance: 'light' | 'dark' | 'auto'
  defaultDataPath: string
  dataPath: string
}

export const settings: Settings = {
  locale: '',
  appearance: 'auto',
  defaultDataPath: app.getPath('userData'),
  dataPath: app.getPath('userData'),
  ...readJSON(settingsFilePath),
}

const getTheme = () => settings.appearance === 'auto' ? 'system' : settings.appearance

router.use('get', () => settings)

router.use('put', (_, data: Partial<Settings> = {}) => {
  let restart = false

  if (data.dataPath && data.dataPath !== settings.dataPath) {
    if (!fs.existsSync(path.join(data.dataPath, 'emo.db'))) {
      fs.renameSync(path.join(settings.dataPath, 'emo.db'), path.join(data.dataPath, 'emo.db'))
    }

    restart = true
  }

  Object.assign(settings, data)

  nativeTheme.themeSource = getTheme()

  writeJSON(settingsFilePath, settings)

  if (restart) {
    app.relaunch()
    app.exit()
  }
})

export const createApp = () => {
  app.whenReady()
    .then(() => {
      settings.locale = settings.locale || app.getLocale()
      nativeTheme.themeSource = getTheme()
    })

  router.listen()
}
