import type { Listener } from '@/preload/index'
import type { OpenDialogOptions, OpenDialogReturnValue } from 'electron'

type EMO = {
  fetch: (ch: string, data?: any) => any

  on: (ch: string, listener: Listener) => any

  removeListener: (ch: string, listener: Listener) => any

  openExternal: (url: string) => void

  openDirectory: (options: OpenDialogOptions) => Promise<OpenDialogReturnValue>
}

declare global {
  interface Window {
    emo: EMO,
  }
}
