import { makeKeyboard, Handler } from '@/renderer/hooks/keyboard'
import { store } from '@/renderer/store'
import { openExternal } from '@/utils/browser/shell'

const { readerStore } = store

const { useKeyboard, register } = makeKeyboard({ app: 'reader' })

export default useKeyboard

const iregister = (k: string[], fn: Handler) => {
  const isLocked = () => readerStore.showKeyboardPanel

  const handler: Handler = (event, ks) => {
    if (isLocked()) {
      return
    }

    fn(event, ks)
  }

  register(k, handler)
}

register(['shift', '?'], () => readerStore.toggleKeyboardPanel())

iregister(['j'], () => readerStore.moveNext())
iregister(['k'], () => readerStore.movePrev())

iregister(['o'], () => readerStore.open())
iregister(['u'], () => readerStore.fold())
iregister(['s'], () => readerStore.toggleStarred())
iregister(['v'], () => {
  if (readerStore.opened) {
    openExternal(readerStore.activeArticle?.url!)
  }
})

iregister(['x'], () => readerStore.toggleSelected())
iregister(['*', 'a'], () => readerStore.selectAll())
iregister(['*', 'n'], () => readerStore.deselectAll())

iregister(['g', 's'], () => readerStore.changeTab('starred'))
iregister(['g', 'a'], () => readerStore.changeTab('all'))
iregister(['g', 'i'], () => readerStore.changeTab('unread'))
