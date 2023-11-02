import { observer } from 'mobx-react-lite'
import { MailUnreadRegular, MailReadRegular } from '@fluentui/react-icons'
import { store } from '@/renderer/store'
import intl from 'react-intl-universal'
import Button from './button'

const { readerStore } = store

function MarkReadButton() {
  const { opened, articles, activeArticle } = readerStore

  const read = opened ? activeArticle?.read : !articles.filter((v) => v.selected).some((v) => v.read === 0)
  const Icon = read ? MailUnreadRegular : MailReadRegular
  const tip = intl.get(read ? 'reader.action.markUnread' : 'reader.action.markRead')

  const onClick = () => readerStore.toggleRead()

  return (
    <Button
      icon={Icon}
      onClick={onClick}
      fontSize={20}
      tip={tip}
    />
  )
}

export default observer(MarkReadButton)
