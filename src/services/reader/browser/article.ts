import fetch from '@/base/browser/fetch'
import { Tab, Article } from '@/types/reader'

export const find = (param: { tab: Tab | number, page: number, size: number }) => fetch('/reader/get/articles', param)

// eslint-disable-next-line max-len
export const starred = (id: number, status: Exclude<Article['starred'], undefined>) => fetch('/reader/put/article/starred', { id, status })

// eslint-disable-next-line max-len
export const markRead = (ids: number[], status: Exclude<Article['read'], undefined>) => fetch('/reader/put/article/read', { ids, status })
