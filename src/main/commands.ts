import {
  app,
  ipcMain,
  shell,
  dialog,
} from 'electron'
import { OpenDialogOptions } from '@/types/common'

const regist = () => {
  ipcMain.on('open:external', (_, url: string) => shell.openExternal(url))

  ipcMain.handle('open:directory', (_, options: OpenDialogOptions = {}) => dialog.showOpenDialog({
    ...options,
    properties: [
      'openDirectory',
      ...(options.properties || []),
    ].filter((v) => v !== 'openFile') as OpenDialogOptions['properties'],
  }))
}

export const register = () => {
  app.whenReady()
    .then(() => {
      regist()
    })
}
