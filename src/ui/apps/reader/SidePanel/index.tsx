import intl from 'react-intl-universal'
import {
  MailInboxRegular,
  MailInboxFilled,
  StarRegular,
  StarFilled,
  NewsFilled,
  NewsRegular,
} from '@fluentui/react-icons'
import { Divider } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'
import { store } from '@/ui/store'

import TabItem from './tab-item'
import FeedList from './feed-list'
import Toolbar from './Toolbar'

const { readerStore } = store

const UnreadTabItem = observer(() => {
  const { unreadCount } = readerStore

  return (
    <TabItem
      tab="unread"
      text={intl.get('reader.list.unread')}
      iconFilled={MailInboxFilled}
      iconRegular={MailInboxRegular}
      count={unreadCount}
    />
  )
})

export default function SidePanel() {
  return (
    <div>
      <div>
        <UnreadTabItem />
        <TabItem
          tab="starred"
          text={intl.get('reader.list.starred')}
          iconFilled={StarFilled}
          iconRegular={StarRegular}
        />
        <TabItem
          tab="all"
          text={intl.get('reader.list.all')}
          iconFilled={NewsFilled}
          iconRegular={NewsRegular}
        />
      </div>
      <Divider className="py-4" />
      <Toolbar />
      <FeedList />
    </div>
  )
}
