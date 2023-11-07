import { ArrowLeftFilled } from '@fluentui/react-icons'
import { Button } from '@/ui/apps/reader/components/toolbar'
import { store } from '@/ui/store'

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
