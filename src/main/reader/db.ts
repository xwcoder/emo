import { exec, get } from '@/services/db/electron-main/db'
import { logger } from '@/services/logger/electron-main/logger'

const sql = `
  CREATE TABLE IF NOT EXISTS feeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url VARCHAR(256) NOT NULL UNIQUE,
    title NVARCHAR(256) NOT NULL,
    description NVARCHAR(256),
    link VARCHAR(256),
    createTime DATETIME default CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url VARCHAR(256) NOT NULL,
    title NVARCHAR(256) NOT NULL,
    content TEXT NOT NULL,
    read BOOLEAN default 0,
    starred BOOLEAN default 0,
    pubTime DATETIME,
    createTime DATETIME default CURRENT_TIMESTAMP,
    feedId INTEGER,
    FOREIGN KEY(feedId) REFERENCES feeds(id) ON DELETE CASCADE,
    unique(url, feedId)
  );
`

const alterSql = `
  ALTER TABLE articles
  ADD COLUMN author NVARCHAR(50);
`

export const init = async () => {
  try {
    await exec(sql)

    const row = await get('select * from sqlite_schema where name = "articles" and sql like "%author%"')

    if (!row) {
      await exec(alterSql)
    }
  } catch (e) {
    logger.error('[Reader] Create Reader table error:', e)
  }
}
