import { app, ipcMain } from 'electron'
import { logger } from '@/utils/electron-main/logger'

type RouteHandler = (ch: string, data?: any) => any

type Routes = {
  [k: string]: RouteHandler
}

type Options = {
  prefix?: string
}

const pad = (path: string) => path[0] === '/' ? path : `/${path}`

export class Router {
  private routes: Routes = {}

  private options: Options = {
    prefix: '',
  }

  private listened = false

  constructor(options: Options = {}) {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  use(path: string, handler: RouteHandler) {
    const { options } = this
    const ch = `${options.prefix}${pad(path)}`
    if (this.routes[ch]) {
      logger.warn('[Router] The path already exists:', ch)
    }

    this.routes[ch] = handler
  }

  get(path: string, handler: RouteHandler) {
    const ch = `get${pad(path)}`
    this.use(ch, handler)
  }

  post(path: string, handler: RouteHandler) {
    const ch = `post${pad(path)}`
    this.use(ch, handler)
  }

  put(path: string, handler: RouteHandler) {
    const ch = `put${pad(path)}`
    this.use(ch, handler)
  }

  delete(path: string, handler: RouteHandler) {
    const ch = `delete${pad(path)}`
    this.use(ch, handler)
  }

  listen() {
    if (this.listened) {
      return
    }

    this.listened = true

    app.whenReady()
      .then(() => {
        Object.entries(this.routes)
          .forEach(([ch, handler]) => {
            ipcMain.handle(ch, async (_, data) => {
              try {
                return handler(ch, data)
              } catch (e) {
                return Promise.reject(e)
              }
            })
          })
      })
  }
}
