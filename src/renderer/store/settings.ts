import { makeAutoObservable, runInAction } from 'mobx'
import fetch from '@/utils/browser/fetch'
import { ElementType } from '@/types/common'

import type { RootStore } from './index'

const appearances = ['light', 'dark', 'auto'] as const

export type Appearance = ElementType<typeof appearances>

const save = (data: {}) => {
  try {
    fetch('/settings/put', data)
  } catch (e) {
    // TODO
  }
}

export class SettingStore {
  rootStore: RootStore

  // TODO
  appearances = appearances

  appearance: Appearance = 'auto'

  locale = 'en-US'

  dataPath = ''

  defaultDataPath = ''

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    })

    this.rootStore = rootStore

    this.init()
  }

  private async init() {
    const {
      locale,
      appearance,
      dataPath,
      defaultDataPath,
    } = await fetch('/settings/get')

    runInAction(() => {
      this.locale = locale
      this.appearance = appearance
      this.dataPath = dataPath
      this.defaultDataPath = defaultDataPath
    })

    this.rootStore.changeLocale(locale)
  }

  setAppearance(appearance: Appearance) {
    this.appearance = appearance
    save({ appearance })
  }

  setLocale(locale: string) {
    this.locale = locale
    this.rootStore.changeLocale(locale)
    save({ locale })
  }

  setDataPath(dataPath: string) {
    if (this.dataPath === dataPath) {
      return
    }

    this.dataPath = dataPath
    save({ dataPath })
  }
}
