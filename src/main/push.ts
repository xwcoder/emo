import { Window } from './window'

let window: Window

export const createPushChannel = (win: Window) => { window = win }

export const push = (ch: string, data: any) => {
  window.window?.webContents.send(ch, data)
}
