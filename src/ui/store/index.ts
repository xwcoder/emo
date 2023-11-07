import { makeAutoObservable } from 'mobx'
import intl from 'react-intl-universal'

import { locales } from '@/i18n'
import { Apps } from '@/types/common'
import { ReaderStore } from './reader'
import { SettingStore, Appearance } from './settings'

type IAppearance = Exclude<Appearance, 'auto'>

class Store {
  app: Apps = 'reader'

  locale = 'en-US'

  nativeTheme: IAppearance = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  shortcut: 'locked' | 'unlocked' = 'unlocked'

  readerStore: ReaderStore

  settingStore: SettingStore

  constructor() {
    makeAutoObservable(this, {})

    this.readerStore = new ReaderStore(this)
    this.settingStore = new SettingStore(this)

    this.init()
  }

  private init() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.nativeTheme = e.matches ? 'dark' : 'light'
      })

    intl.init({
      currentLocale: this.locale,
      locales,
      fallbackLocale: 'en-US',
    })
  }

  get appearance(): Omit<Appearance, 'auto'> {
    const { appearance } = this.settingStore
    return appearance === 'auto' ? this.nativeTheme : appearance
  }

  lockShortcut() {
    this.shortcut = 'locked'
  }

  unlockShortcut() {
    this.shortcut = 'unlocked'
  }

  changeLocale(locale: string) {
    this.locale = locale
    intl.init({
      currentLocale: this.locale,
      locales,
      fallbackLocale: 'zh-CN',
    })
  }

  changeApp(app: Apps) {
    this.app = app
  }
}

export const store = new Store()
export type RootStore = typeof store
