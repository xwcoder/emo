import db, { get, all, run } from '@/services/db/electron-main/db'
import { Article, Tab } from '@/types/reader'

export const upsert = (articles: Article | Article[]) => new Promise<void>((resolve, reject) => {
  const items = Array.isArray(articles) ? articles : [articles]

  const cols = ['title', 'url', 'content', 'pubTime', 'feedId'] as const
  const keys = cols.map((k) => `$${k}`)
  const sets = cols.map((k, index) => `${k}=${keys[index]}`)

  const stmt = db.prepare(`
    insert into articles (${cols.join(',')})
    values (${keys.join(',')})
    on conflict(feedId, url) do update
    set ${sets.join(',')}
    `)

  items.forEach((article) => {
    const params = Object.fromEntries(keys.map((k, index) => [k, article[cols[index]]]))
    stmt.run(params)
  })

  stmt.finalize((err) => {
    if (err) {
      reject(err)
      return
    }

    resolve()
  })
})

export const find = async (params: { tab: Tab | number, page?: number, size?: number }) => {
  const { tab, page = 1, size = 50 } = params

  const select = 'select * from articles'
  const where = (() => {
    if (typeof tab === 'number') {
      return `where feedId = ${tab}`
    }

    if (tab === 'unread') {
      return 'where read = 0'
    }

    if (tab === 'starred') {
      return 'where starred = 1'
    }

    return ''
  })()

  const limit = `limit ${size} offset ${(page - 1) * size}`
  const order = 'order by createTime desc'

  const [count, rows] = await Promise.all([
    get(['select count(*) as count from articles', where].join(' ')),
    all([select, where, order, limit].join(' ')),
  ])

  return {
    count: count.count,
    rows,
  }
}

// eslint-disable-next-line max-len
export const starred = (id: number, status: Exclude<Article['starred'], undefined>) => run('update articles set starred = ? where id = ?', status, id)

// eslint-disable-next-line max-len
export const markRead = (ids: number[], status: Exclude<Article['read'], undefined>) => run(`update articles set read = ? where id in (${ids.join(',')})`, status)
