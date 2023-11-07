import { app } from 'electron'
import * as path from 'node:path'
import winston from 'winston'

const format = winston.format.combine(
  winston.format.splat(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(({ level, timestamp, message }) => `${level.toUpperCase()}: ${timestamp}: ${message}`),
)

export const logger = winston.createLogger({
  format,
  transports: [
    new winston.transports.Console({
      level: 'info',
    }),

    new winston.transports.File({
      level: 'info',
      filename: path.join(app.getPath('userData'), 'logs/emo.log'),
      maxsize: 30 * 1024 * 1024, // 30M
      maxFiles: 30,
    }),
  ],
})
