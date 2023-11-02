import db, { run, get, all } from '@/main/db'
import { push } from '@/main/push'
import { Feed } from '@/types/reader'

export const upsert = (feed: Feed) => {
  const {
    url, title, description = '', link = '',
  } = feed
  const sql = `
    insert into feeds (url, title, description, link)
    values ($url, $title, $description, $link)
    on conflict(url) do update set title = $title, description = $description, link = $link
  `
  // @ts-ignore
  return run(sql, {
    $url: url,
    $title: title,
    $description: description,
    $link: link,
  })
}

export const getByUrl = async (url: string) => {
  const sql = 'select * from feeds where url = ?'
  const row = await get(sql, url)

  if (row) {
    return row as Feed
  }

  return null
}

export const getAll = async (): Promise<Feed[]> => {
  const sql = `
    select f.*, count(*) as count
    from feeds as f left outer join articles as a
    on f.id = a.feedId
    where a.read = 0
    group by f.id
    order by createTime desc;
  `

  const rows = await all(sql)
  const feeds: Feed[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    url: row.url,
    link: row.link,
    createTime: row.createTime,
    description: row.description,
    unreadCount: row.count,
  }))

  return feeds
}

export const deleteById = (id: number) => new Promise<void>((resolve) => {
  db.serialize(async () => {
    try {
      await run('BEGIN TRANSACTION')
      await run('delete from feeds where id = ?', id)
      await run('delete from articles where feedId = ?', id)
      await run('COMMIT')
    } catch (e) {
      await run('ROLLBACK')
    } finally {
      resolve()
    }
  })
})

export const pushAll = async () => {
  const feeds = await getAll()

  push('/reader/feed', feeds)
}
