import { app } from 'electron'
import { isDev } from '@/utils/electron-main/env'

if (isDev) {
  app.setName(`${app.getName()}-dev`)
}
