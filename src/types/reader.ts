export type Tab = 'unread' | 'starred' | 'all'

export type Article = {
  id?: number
  title: string
  url: string
  content: string
  pubTime?: string
  author?: string
  starred?: 0 | 1
  read?: 0 | 1
  feedId?: number

  // TODO move to another type
  selected?: boolean
}

export type Feed = {
  id?: number
  url: string
  title: string
  description?: string
  link?: string
  unreadCount?: number
  items?: Article[]
  createTime?: string
}
