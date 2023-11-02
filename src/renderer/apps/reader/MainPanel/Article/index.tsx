import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from '@/renderer/store'
import Toolbar from './Toolbar'
import Content from './content'

const { readerStore } = store

function Article() {
  const { activeId } = readerStore

  useEffect(() => {
    if (activeId) {
      readerStore.markRead(activeId!)
    }
  })

  return (
    <div className="h-[100%] flex flex-col">
      <div className="h-12 flex items-center">
        <Toolbar />
      </div>
      <div className="flex-1 overflow-auto">
        <Content />
      </div>
    </div>
  )
}

export default observer(Article)
