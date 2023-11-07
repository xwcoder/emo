import { observer } from 'mobx-react-lite'
import { MarkReadButton, StarButton } from '@/ui/apps/reader/components/toolbar'
import { store } from '@/ui/store'
import BackToListButton from './back-button'
import OpenExternalButton from './open-external-btn'

const { readerStore } = store

function Toolbar() {
  const { activeId, activeArticle } = readerStore

  return (
    <div className="pl-2 flex items-center">
      <div className="mr-6">
        <BackToListButton />
      </div>
      <div className="flex items-center">
        <MarkReadButton />
        <StarButton id={activeId!} />
        <OpenExternalButton url={activeArticle!.url} />
      </div>
    </div>
  )
}

export default observer(Toolbar)
