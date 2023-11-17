import { makeKeyboard, Handler } from '@/ui/hooks/keyboard'
import { store } from '@/ui/store'
import { openExternal } from '@/base/browser/shell'

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
iregister(['shift', 'i'], () => readerStore.markRead())
iregister(['shift', 'u'], () => readerStore.markUnread())

iregister(['g', 's'], () => readerStore.changeTab('starred'))
iregister(['g', 'a'], () => readerStore.changeTab('all'))
iregister(['g', 'i'], () => readerStore.changeTab('unread'))
