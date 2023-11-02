import { contextBridge, ipcRenderer } from 'electron'
import { OpenDialogOptions } from '@/types/common'

export type Listener = Parameters<typeof ipcRenderer.on>[1]

contextBridge.exposeInMainWorld('emo', {
  fetch: (ch: string, data?: any) => ipcRenderer.invoke(ch, data),

  on: (ch: string, listener: Listener) => ipcRenderer.on(ch, listener),

  removeListener: (ch: string, listener: Listener) => ipcRenderer.removeListener(ch, listener),

  openExternal: (url: string) => ipcRenderer.send('open:external', url),

  openDirectory: (options: OpenDialogOptions) => ipcRenderer.invoke('open:directory', options),
})
