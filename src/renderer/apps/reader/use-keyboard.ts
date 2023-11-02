import { makeKeyboard } from '@/renderer/hooks/keyboard'
import { store } from '@/renderer/store'
import { openExternal } from '@/utils/browser/shell'

const { readerStore } = store

const { useKeyboard, register } = makeKeyboard({ app: 'reader' })

export default useKeyboard

register(['j'], () => readerStore.moveNext())
register(['k'], () => readerStore.movePrev())

register(['o'], () => readerStore.open())
register(['u'], () => readerStore.fold())
register(['s'], () => readerStore.toggleStarred())
register(['v'], () => {
  if (readerStore.opened) {
    openExternal(readerStore.activeArticle?.url!)
  }
})

register(['x'], () => readerStore.toggleSelected())
register(['*', 'a'], () => readerStore.selectAll())
register(['*', 'n'], () => readerStore.deselectAll())

register(['g', 's'], () => readerStore.changeTab('starred'))
register(['g', 'a'], () => readerStore.changeTab('all'))
register(['g', 'i'], () => readerStore.changeTab('unread'))
