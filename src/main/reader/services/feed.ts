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

export const getAll = (): Promise<Feed[]> => {
  const sql = `
    select f.*, count(a.id) as unreadCount
    from feeds as f left outer join articles as a
    on f.id = a.feedId and a.read = 0
    group by f.id
    order by createTime desc;
  `

  return all(sql)
}

export const getOne = (id: number): Promise<Feed | undefined> => {
  const sql = `
    select f.*, (select count(*) from articles as a where a.feedId = f.id and a.read = 0) as unreadCount
    from feeds as f
    where f.id = ?;
  `

  return get(sql, id)
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

export const pushOne = async (id: number) => {
  const feed = await getOne(id)

  push('/reader/feed', feed)
}
