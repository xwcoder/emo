import { ArrowClockwiseFilled } from '@fluentui/react-icons'
import intl from 'react-intl-universal'
import { store } from '@/renderer/store'
import Button from './button'

const { readerStore } = store

export default function RefreshButton() {
  const onClick = () => {
    readerStore.refresh()
  }

  return (
    <Button
      icon={ArrowClockwiseFilled}
      onClick={onClick}
      tip={intl.get('reader.action.refresh')}
    />
  )
}
