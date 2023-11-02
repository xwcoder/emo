import { observer } from 'mobx-react-lite'
import { StarFilled, StarRegular } from '@fluentui/react-icons'
import { makeStyles, tokens } from '@fluentui/react-components'
import { store } from '@/renderer/store'
import { Article } from '@/types/reader'

import Button from './button'

const { readerStore } = store

const useStyles = makeStyles({
  star: {
    color: tokens.colorPaletteMarigoldBackground3,
  },
})

type Props = {
  id: Exclude<Article['id'], undefined>
  className?: string
  fontSize?: number
}

function StarButton(props: Props) {
  const { id, className, fontSize } = props
  const styles = useStyles()
  const { articles } = readerStore
  const article = articles.find((v) => v.id === id)

  if (!article) {
    return null
  }

  const { starred } = article

  const StarIcon = starred ? StarFilled : StarRegular

  const onClick = () => {
    readerStore.toggleStarred(id)
  }

  return (
    <div className={starred ? styles.star : ''}>
      <Button
        icon={StarIcon}
        onClick={onClick}
        className={className}
        fontSize={fontSize}
      />
    </div>
  )
}

export default observer(StarButton)
