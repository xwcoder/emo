import { router } from '@/router/reader/electron-main'
import { startCrawler } from '@/services/reader/electron-main/crawler'
import { init as initDB } from './db'

export function createApp() {
  initDB()
  router.listen()
  startCrawler()
}
