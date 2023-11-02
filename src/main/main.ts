import '@/main/setup'
import { app } from 'electron'
import { isMac } from '@/utils/electron-main/env'
import { createWindow } from './window'
import { createApp as createReaderApp } from './reader'
import { createApp as createSettingsApp } from './setttings'
import { createPushChannel } from './push'
import { register as registerCommands } from './commands'

registerCommands()

createSettingsApp()
createReaderApp()

const window = createWindow()
createPushChannel(window)

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
