import { join } from 'node:path'
import { EventEmitter } from 'node:events'
import { app } from 'electron'
import _get from 'lodash.get'
import _set from 'lodash.set'
import { readJSON, writeJSON } from '@/base/node/fs'

const emitter = new EventEmitter()
const settingsFilePath = join(app.getPath('userData'), 'settings.json')

export type Settings = {
  locale: string
  appearance: 'light' | 'dark' | 'auto'
  defaultDataPath: string
  dataPath: string
}

const settings: Settings = {
  locale: '',
  appearance: 'auto',
  defaultDataPath: app.getPath('userData'),
  dataPath: app.getPath('userData'),
  ...readJSON(settingsFilePath),
}

export const get = (path?: string) => path ? _get(settings, path) : settings

export const set = (path: string, value: any) => {
  const oldValue = get(path)

  _set(settings, path, value)
  writeJSON(settingsFilePath, settings)

  if (oldValue !== value) {
    emitter.emit('change', path, value, oldValue)
  }
}

type changeListener = (path: string, newValue: any, oldValue: any) => void

export const on = (eventName: 'change', listener: changeListener): EventEmitter => emitter.on(eventName, listener)

app.whenReady()
  .then(() => {
    settings.locale = settings.locale || app.getLocale()
  })
