import { app } from 'electron'
import { isDev } from '@/base/electron-main/env'

if (isDev) {
  app.setName(`${app.getName()}-dev`)
}
