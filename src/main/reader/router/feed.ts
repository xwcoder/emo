import { Feed } from '@/types/reader'
import * as feedService from '@/main/reader/services/feed'
import * as articleService from '@/main/reader/services/article'
import { parseURL } from '@/utils/node/feed'
import { logger } from '@/utils/electron-main/logger'
import { router } from './router'

router.get('/feed/preflight', async (_, url: string) => {
  try {
    const feed = await parseURL(url)
    delete feed?.items

    return feed
  } catch (e) {
    logger.error('[Reader] feed/preflight error:', e)
    return null
  }
})

router.post('/feed', async (_, { url, title }: Pick<Feed, 'url'|'title'>) => {
  let feed: Feed = { url, title }

  try {
    const feedRemote = await parseURL(url)
    feed = {
      ...feedRemote,
      ...feed,
    }
  } catch (e) {
    logger.error(`[Reader] post/feed parse error: ${url}`, e)
  }

  // insert feed
  await feedService.upsert(feed)

  if (!feed.items || !feed.items.length) {
    return
  }

  const ifeed = await feedService.getByUrl(url)

  if (!ifeed) {
    return
  }

  // insert articles
  const items = feed.items.map((v) => ({
    ...v,
    feedId: ifeed.id,
  }))
  await articleService.upsert(items)

  feedService.pushAll()
})

router.get('/feed/all', async () => feedService.getAll())

router.delete('/feed', async (_, id: number) => feedService.deleteById(id))
