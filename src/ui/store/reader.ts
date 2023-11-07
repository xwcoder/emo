import { makeAutoObservable, runInAction } from 'mobx'
import { Tab, Feed, Article } from '@/types/reader'
import * as remote from '@/services/remote/browser/remote'
import * as feedService from '@/services/reader/browser/feed'
import * as articleService from '@/services/reader/browser/article'

import type { RootStore } from './index'

export class ReaderStore {
  rootStore: RootStore

  tab: Tab | number = 'unread'

  feeds: Feed[] = []

  articles: Article[] = []

  count = 0

  page = 1

  size = 50

  activeIndex = -1

  opened = false

  showKeyboardPanel = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    })

    this.rootStore = rootStore

    this.init()
  }

  private async init() {
    this.initListeners()

    const feeds = await feedService.getAll()
    runInAction(() => { this.feeds = feeds || [] })

    this.getArticles()
  }

  private initListeners() {
    remote.on('/reader/feed', (_, feeds: Feed | Feed[] = []) => {
      runInAction(() => {
        if (Array.isArray(feeds)) {
          this.feeds = feeds
          return
        }

        const index = this.feeds.findIndex((v) => v.id === feeds.id)
        if (index === -1) {
          this.feeds.unshift(feeds)
        } else {
          this.feeds.splice(index, 1, feeds)
        }
      })
    })
  }

  get activeArticle() {
    return this.articles[this.activeIndex]
  }

  get activeId() {
    return this.activeArticle?.id
  }

  get unreadCount() {
    return this.feeds.reduce((n, item) => n + (item.unreadCount ?? 0), 0)
  }

  get isAllSelected() {
    return this.articles.every((v) => v.selected)
  }

  get isAllDeselected() {
    return this.articles.every((v) => !v.selected)
  }

  get isLastPage() {
    return this.page * this.size >= this.count
  }

  get isFirstPage() {
    return this.page === 1
  }

  get isUnreadOrStarredTabMarked() {
    return (this.tab === 'unread' && this.articles.some((v) => v.read === 1))
      || (this.tab === 'starred' && this.articles.some((v) => v.starred === 0))
  }

  async getArticles() {
    const { count, data = [] } = await articleService.find({
      tab: this.tab,
      page: this.page,
      size: this.size,
    })

    runInAction(() => {
      this.count = count
      this.articles = data
      this.activeIndex = 0
    })
  }

  async getNextPage() {
    if (this.isLastPage) {
      return false
    }

    if (!this.isUnreadOrStarredTabMarked) {
      this.page += 1
    }

    return this.getArticles()
  }

  async getPrevPage() {
    if (this.isFirstPage && !this.isUnreadOrStarredTabMarked) {
      return false
    }

    this.page = Math.max(1, this.page - 1)

    return this.getArticles()
  }

  refresh() {
    this.fold()
    this.page = 1
    this.getArticles()
  }

  changeTab(tab: Tab | number) {
    this.tab = tab
    this.refresh()
  }

  async moveNext() {
    let index = this.activeIndex

    if (index === -1) {
      return
    }

    index += 1

    if (index === this.articles.length) {
      const r = await this.getNextPage()

      if (r !== false) {
        index = 0
      }
    }

    runInAction(() => {
      this.activeIndex = Math.min(index, this.articles.length - 1)
    })

    this.scrollIntoView()
  }

  async movePrev() {
    let index = this.activeIndex

    if (index === -1) {
      return
    }

    index -= 1

    if (index === -1) {
      const r = await this.getPrevPage()

      if (r !== false) {
        index = this.articles.length - 1
      }
    }

    runInAction(() => {
      this.activeIndex = Math.max(index, 0)
    })

    this.scrollIntoView()
  }

  scrollIntoView() {
    const container = document.querySelector('.list-container')
    const el = document.querySelector(`[data-list-item-id="${this.activeId}"]`)

    if (!container || !el) {
      return
    }

    const containerRect = container.getBoundingClientRect()
    const rect = el.getBoundingClientRect()

    if (rect.bottom > containerRect.bottom || rect.top < containerRect.top) {
      el.scrollIntoView({ block: 'center' })
    }
  }

  toggleStarred(id = this.activeId) {
    const item = this.articles.find((v) => v.id === id)

    if (!item) {
      return
    }

    const status = (1 - item.starred!) as Exclude<Article['starred'], undefined>
    item.starred = status

    articleService.starred(item.id!, status)
  }

  private markReadStatus(id: number | number [], status: Exclude<Article['read'], undefined>) {
    const ids = Array.isArray(id) ? id : [id]
    const articles = this.articles.filter((v) => v.read !== status && ids.some((n) => n === v.id))

    if (!articles || !articles.length) {
      return
    }

    articles.forEach((article) => {
      // eslint-disable-next-line no-param-reassign
      article.read = status
      const feed = this.feeds.find((v) => v.id === article.feedId)

      if (feed) {
        feed.unreadCount = status === 1 ? feed.unreadCount! - 1 : feed.unreadCount! + 1
      }
    })

    articleService.markRead(articles.map((v) => v.id!), status)
  }

  markRead(id: number | number []) {
    this.markReadStatus(id, 1)
  }

  markUnread(id: number | number []) {
    this.markReadStatus(id, 0)
  }

  toggleRead() {
    const articles = this.opened ? [this.activeArticle] : this.articles.filter((v) => v.selected)

    if (!articles.length) {
      return
    }

    const ids = articles.map((v) => v.id!)

    if (articles.some((v) => v.read === 0)) {
      this.markRead(ids)
    } else {
      this.markUnread(ids)
    }
  }

  toggleSelected(id = this.activeId) {
    const item = this.articles.find((v) => v.id === id)

    if (!item) {
      return
    }

    item.selected = !item.selected
  }

  toggleSelectAll() {
    if (this.articles.some((v) => !v.selected)) {
      this.selectAll()
    } else {
      this.deselectAll()
    }
  }

  selectAll() {
    // eslint-disable-next-line no-param-reassign
    this.articles.forEach((v) => { v.selected = true })
  }

  deselectAll() {
    // eslint-disable-next-line no-param-reassign
    this.articles.forEach((v) => { v.selected = false })
  }

  async deleteFeed(id: number) {
    this.fold()
    const { tab } = this

    this.feeds = this.feeds.filter((v) => v.id !== id)

    await feedService.deleteById(id)

    if (typeof tab === 'string') {
      this.refresh()
    } else if (tab === id) {
      this.changeTab('all')
    }
  }

  open(id = this.activeId) {
    this.activeIndex = this.articles.findIndex((v) => v.id === id)

    if (this.activeArticle) {
      this.opened = true
    }
  }

  fold() {
    this.opened = false
    setTimeout(() => this.scrollIntoView())
  }

  openKeyboardPanel() {
    this.showKeyboardPanel = true
  }

  closeKeyboardPanel() {
    this.showKeyboardPanel = false
  }

  toggleKeyboardPanel() {
    this.showKeyboardPanel = !this.showKeyboardPanel
  }
}
