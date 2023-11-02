import * as feedService from '@/main/reader/services/feed'
import * as articleService from '@/main/reader/services/article'
import { parseURL } from '@/utils/node/feed'
import { logger } from '@/utils/electron-main/logger'
import { Feed } from '@/types/reader'

const crawlOne = async (f: Feed) => {
  const { url, id } = f
  try {
    const feed = await parseURL(url)

    if (!feed) {
      return
    }

    const items = (feed.items || []).map((v) => ({
      ...v,
      feedId: id,
    }))

    if (!items || !items.length) {
      return
    }

    await articleService.upsert(items)
  } catch (e) {
    logger.error(`[Reader] crawl error: ${url}`, e)
  }
}

const conQueue = <T>(args: T[], limit: number, fn: (p: T) => Promise<any>) => new Promise<void>((resolve) => {
  const len = Math.min(args.length, limit)
  let index = 0

  const run = () => {
    const arg = args[index]
    index += 1

    fn(arg)
      .finally(() => {
        if (index < args.length) {
          run()
        } else {
          resolve()
        }
      })
  }

  for (let i = 0; i < len; i += 1) {
    run()
  }
})

export const startCrawler = () => {
  let timer: any
  const crawl = async () => {
    clearTimeout(timer)

    try {
      const feeds = await feedService.getAll()
      await conQueue(feeds, 10, crawlOne)
      await feedService.pushAll()
    } catch (e) {
      logger.error('[Reader] Crawl error', e)
    } finally {
      timer = setTimeout(crawl, 15 * 60e3)
    }
  }

  setTimeout(crawl, 3e3)
}
