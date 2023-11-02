import { init as initDB } from './db'
import { router } from './router'
import { startCrawler } from './crawler'

export function createApp() {
  initDB()
  router.listen()
  startCrawler()
}
