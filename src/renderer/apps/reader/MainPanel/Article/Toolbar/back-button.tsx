import { ArrowLeftFilled } from '@fluentui/react-icons'
import { Button } from '@/renderer/apps/reader/components/toolbar'
import { store } from '@/renderer/store'

const { readerStore } = store

export default function BackToListButton() {
  const onClick = () => {
    readerStore.fold()
  }

  return (
    <Button
      icon={ArrowLeftFilled}
      onClick={onClick}
    />
  )
}
