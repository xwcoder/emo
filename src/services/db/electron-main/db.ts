import * as path from 'node:path'
import { verbose } from 'sqlite3'
import { logger } from '@/services/logger/electron-main/logger'
import * as settingService from '@/services/settings/electron-main/settings'

const { Database } = verbose()

const file = path.join(settingService.get('dataPath'), 'emo.db')

const db = new Database(file)

db.on('error', (e) => logger.error('New Database error', e))

export default db

type RunReturn = {
  lastID: number
  changes: number
}

export const run = (sql: string, ...args: any[]) => new Promise<RunReturn>((resolve, reject) => {
  db.run(sql, ...args, function handler(this: RunReturn, err: Error | null) {
    if (err) {
      reject(err)
      return
    }

    resolve({
      lastID: this.lastID,
      changes: this.changes,
    })
  })
})

export const get = <T = any>(sql: string, ...args: any[]) => new Promise<T>((resolve, reject) => {
  db.get(sql, ...args, (err: Error | null, row: T) => {
    if (err) {
      reject(err)
      return
    }

    resolve(row)
  })
})

export const all = <T = any>(sql: string, ...args: any[]) => new Promise<T[]>((resolve, reject) => {
  db.all(sql, ...args, (err: Error | null, rows: T[]) => {
    if (err) {
      reject(err)
      return
    }

    resolve(rows)
  })
})

export const exec = (sql: string, ...args: any[]) => new Promise<void>((resolve, reject) => {
  db.exec(sql, ...args, (err: Error | null) => {
    if (err) {
      reject(err)
      return
    }

    resolve()
  })
})
