import intl from 'react-intl-universal'
import { FontDecreaseRegular } from '@fluentui/react-icons'
import { Button } from '@/ui/apps/reader/components/toolbar'
import { store } from '@/ui/store'

const { readerStore } = store

export default function FontDecreaseButton() {
  return (
    <Button
      icon={FontDecreaseRegular}
      onClick={() => readerStore.decreaseFont()}
      fontSize={20}
      tip={intl.get('reader.action.fontDecrease')}
    />
  )
}
