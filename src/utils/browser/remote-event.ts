import type { Listener } from '@/preload/index'

export const on = (ch: string, listener: Listener) => window.emo.on(ch, listener)

export const removeListener = (ch: string, listener: Listener) => window.emo.removeListener(ch, listener)

export const addEventListener = on
