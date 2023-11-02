import * as articleService from '@/main/reader/services/article'
import { router } from './router'

router.get('/articles', async (_, params) => {
  const { count, rows } = await articleService.find(params)
  return {
    data: rows,
    count,
  }
})

router.put('/article/starred', (_, { id, status }) => articleService.starred(id, status))

router.put('/article/read', (_, { ids, status }) => articleService.markRead(ids, status))
