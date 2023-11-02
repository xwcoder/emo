import * as path from 'node:path'
import { app, BrowserWindow } from 'electron'
import { isDev, isMac, isWin } from '@/utils/electron-main/env'
import { WindowStateManager } from './windowState'

export class Window {
  window: BrowserWindow | null = null

  constructor() {
    this.init()
  }

  private init() {
    app.whenReady()
      .then(() => {
        this.createWindow()
        this.registerListeners()
      })
  }

  private registerListeners() {
    app.on('activate', () => {
      if (!this.hasWindow()) {
        this.createWindow()
      }
    })
  }

  private createWindow() {
    if (this.hasWindow()) {
      return
    }

    const windowState = new WindowStateManager()

    this.window = new BrowserWindow({
      width: windowState.width,
      height: windowState.height,
      minWidth: 600,
      minHeight: 600,
      titleBarStyle: 'hidden',
      trafficLightPosition: {
        x: 3,
        y: 6,
      },
      show: false,
      icon: !isDev && !isMac && !isWin ? path.join(__dirname, '../assets/icons/icon.png') : undefined,
      webPreferences: {
        preload: path.join(app.getAppPath(), 'dist/preload.js'),
        defaultFontFamily: {
          standard: isMac ? 'PingFang SC' : isWin ? 'Microsoft Yahei' : 'Times New Roman',
        },
        devTools: isDev,
      },
    })

    windowState.observe(this.window)

    this.window.on('ready-to-show', () => {
      this.window?.show()

      if (isDev) {
        this.window?.webContents.openDevTools()
      }
    })

    if (isDev) {
      this.window.loadURL('http://localhost:4000')
    } else {
      this.window.loadFile('dist/renderer/index.html')
    }
  }

  private hasWindow() {
    return this.window !== null && !this.window.isDestroyed()
  }
}

export const createWindow = () => new Window()
