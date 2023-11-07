import * as path from 'node:path'
import { app } from 'electron'
import type { BrowserWindow } from 'electron'
import { readJSON, writeJSON } from '@/base/node/fs'

type State = {
  width: number
  height: number
}

const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export class WindowStateManager {
  private window: BrowserWindow | null = null

  private configFilePath = path.join(app.getPath('userData'), 'window-state.json')

  private state: State = {
    width: 1200,
    height: 800,
  }

  constructor() {
    this.state = {
      ...this.state,
      ...this.read(),
    }

    this.stateHandler = debounce(this.stateHandler.bind(this), 100)
    this.closedHandler = this.closedHandler.bind(this)
  }

  get width() {
    return this.state.width
  }

  get height() {
    return this.state.height
  }

  observe(win: BrowserWindow) {
    if (this.window) {
      return
    }

    this.window = win
    this.resigterListeners()
  }

  dispose() {
    this.removeListeners()
    this.window = null
  }

  private resigterListeners() {
    this.window?.on('resize', this.stateHandler)
    this.window?.on('closed', this.closedHandler)
  }

  private removeListeners() {
    this.window?.removeListener('resize', this.stateHandler)
    this.window?.removeListener('closed', this.closedHandler)
  }

  private stateHandler() {
    this.update()
  }

  private closedHandler() {
    this.save()
    this.dispose()
  }

  private update() {
    if (!this.window) {
      return
    }

    const bounds = this.window.getBounds()

    this.state = {
      width: bounds.width,
      height: bounds.height,
    }
  }

  private read(): Partial<State> {
    return readJSON(this.configFilePath)
  }

  private save() {
    writeJSON(this.configFilePath, this.state)
  }
}
