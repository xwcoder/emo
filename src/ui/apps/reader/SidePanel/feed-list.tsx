import { observer } from 'mobx-react-lite'
import { store } from '@/ui/store'

import Item from './feed-item'

const { readerStore } = store

function List() {
  const { feeds } = readerStore

  return (
    <div>
      {feeds.map((item) => <Item key={item.id} data={item} />)}
    </div>
  )
}

export default observer(List)
