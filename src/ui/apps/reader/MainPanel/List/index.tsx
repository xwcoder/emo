import { observer } from 'mobx-react-lite'
import { store } from '@/ui/store'

import Item from './item'
import Toolbar from './toolbar'
import Pagination from './pagination'

const { readerStore } = store

function List() {
  const { articles } = readerStore

  const items = articles.map((item) => <Item key={item.id} article={item} />)

  return (
    <div className="h-[100%] flex flex-col">
      <div className="h-12 flex items-center">
        <div>
          <Toolbar />
        </div>
        <div className="ml-auto px-4">
          <Pagination />
        </div>
      </div>
      <div className="list-container flex-1 pb-10 overflow-auto">
        {items}
      </div>
    </div>
  )
}

export default observer(List)
