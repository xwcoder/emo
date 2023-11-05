/* eslint-disable max-len */

import { observer } from 'mobx-react-lite'
import { makeStyles, tokens } from '@fluentui/react-components'
import { store } from '@/renderer/store'
import { DeleteButton, CopyButton } from '@/renderer/apps/reader/components/toolbar'
import { Feed } from '@/types/reader'

const { readerStore } = store

type Props = {
  data: Feed
}

const useStyles = makeStyles({
  normal: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },

  active: {
    backgroundColor: tokens.colorNeutralBackground2Selected,
  },

  toolbar: {
    backgroundColor: tokens.colorNeutralBackground2Hover,
  },
})

function Item({ data }: Props) {
  const {
    id,
    title,
    unreadCount = 0,
    url,
  } = data
  const active = readerStore.tab === id
  const styles = useStyles()

  const changeTab = () => {
    readerStore.changeTab(id!)
  }

  const deleteFeed = () => {
    readerStore.deleteFeed(id!)
  }

  return (
    <div className="group relative overflow-hidden rounded-r-2xl">
      <div
        onClick={changeTab}
        role="button"
        className={active ? styles.active : styles.normal}
      >
        <div className={`${unreadCount > 0 ? 'font-bold' : ''} h-7 pl-6 pr-3 cursor-pointer flex items-center overflow-hidden`}>
          <div className="mr-auto overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </div>
          {unreadCount > 0
            ? (
              <div className="ml-auto pl-4 text-xs">
                {unreadCount}
              </div>
            )
            : null}
        </div>
      </div>
      <div className="absolute top-0 right-0 hidden group-hover:block">
        <div className={styles.toolbar}>
          <div className="flex">
            <CopyButton
              className="h-7 w-8"
              fontSize={16}
              content={url}
            />
            <DeleteButton
              className="h-7 w-8"
              fontSize={16}
              onClick={deleteFeed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Item)
