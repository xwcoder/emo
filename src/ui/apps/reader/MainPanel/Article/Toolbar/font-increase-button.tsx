import intl from 'react-intl-universal'
import { FontIncreaseRegular } from '@fluentui/react-icons'
import { Button } from '@/ui/apps/reader/components/toolbar'
import { store } from '@/ui/store'

const { readerStore } = store

export default function FontIncreaseButton() {
  return (
    <Button
      icon={FontIncreaseRegular}
      onClick={() => readerStore.increaseFont()}
      fontSize={20}
      tip={intl.get('reader.action.fontIncrease')}
    />
  )
}
