import { useEffect } from 'react'
import { store } from '@/renderer/store'
import { Apps } from '@/types/common'

type Handler = (event: KeyboardEvent, k: string[]) => any

const equal = (a: string[], b: string[]) => {
  if (!a.length || !b.length || a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

export const makeKeyboard = ({ app }: { app: Apps }) => {
  let timer = 0
  const noop = () => {}

  // Record modifier key
  const modifierKeys = {
    shift: 0,
    alt: 0,
    control: 0,
    meta: 0,
  }

  type MODIFIER_KEYS = keyof typeof modifierKeys

  const modifier = {
    isModifierKey: (k: string): k is MODIFIER_KEYS => k in modifierKeys,

    setOn: (k: MODIFIER_KEYS) => { modifierKeys[k] = 1 },

    setOff: (k: MODIFIER_KEYS) => { modifierKeys[k] = 0 },

    isOn: (k: MODIFIER_KEYS) => modifierKeys[k] === 1,

    isOff: (k: MODIFIER_KEYS) => modifierKeys[k] === 0,

    isMatch(keys: MODIFIER_KEYS[]) {
      const has = (k: MODIFIER_KEYS) => keys.indexOf(k) !== -1

      for (const k of Object.keys(modifierKeys) as MODIFIER_KEYS[]) {
        if ((has(k) && this.isOff(k)) || (!has(k) && this.isOn(k))) {
          return false
        }
      }

      return true
    },

    reset: () => (Object.keys(modifierKeys) as MODIFIER_KEYS[]).forEach((k) => { modifierKeys[k] = 0 }),
  }

  const split = (keys: string[]): [MODIFIER_KEYS[], string[]] => {
    let i = 0
    const mkeys: string[] = []

    for (;i < keys.length; i += 1) {
      if (modifier.isModifierKey(keys[i])) {
        mkeys.push(keys[i])
      } else {
        break
      }
    }

    return [mkeys as MODIFIER_KEYS[], keys.slice(i)]
  }

  // Record input keys
  const keys: string[] = []
  const clear = () => { keys.length = 0 }
  const push = (key: string) => keys.push(key)
  const empty = () => keys.length === 0

  // Store shortcut keys registered
  const keymap = new Map<string[], Handler>()

  const exec = (event: KeyboardEvent, k: string[]) => {
    const fn = keymap.get(k) || noop
    clear()
    fn(event, [...k])
  }

  const delayClear = () => {
    clearTimeout(timer)
    timer = window.setTimeout(clear, 500)
  }

  const keydownHander = (e: KeyboardEvent) => {
    if (store.app !== app || store.shortcut === 'locked') {
      clear()
      return
    }

    const key = e.key.toLowerCase()

    if (modifier.isModifierKey(key) && empty()) {
      modifier.setOn(key)
      return
    }

    push(key)
    delayClear()

    for (const k of keymap.keys()) {
      const [mkeys, nkeys] = split(k)

      if (modifier.isMatch(mkeys) && equal(nkeys, keys)) {
        exec(e, k)
        return
      }
    }
  }

  const keyupHandler = (e: KeyboardEvent) => {
    if (store.app !== app || store.shortcut === 'locked') {
      return
    }

    const key = e.key.toLowerCase()

    if (modifier.isModifierKey(key)) {
      modifier.setOff(key)
    }
  }

  const useKeyboard = (el: HTMLElement = document.body) => {
    useEffect(() => {
      el.addEventListener('keydown', keydownHander)
      el.addEventListener('keyup', keyupHandler)

      return () => {
        el.removeEventListener('keydown', keydownHander)
        el.removeEventListener('keyup', keyupHandler)
      }
    }, [])
  }

  const register = (k: string[], fn: Handler) => {
    keymap.set(k, fn)
  }

  return { useKeyboard, register }
}
