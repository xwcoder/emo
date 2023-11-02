import {
  makeResetStyles,
  makeStyles,
  mergeClasses,
  tokens,
  Checkbox,
} from '@fluentui/react-components'
import type { CheckboxProps } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'
import { store } from '@/renderer/store'
import { Article } from '@/types/reader'
import { StarButton } from '@/renderer/apps/reader/components/toolbar'
import { format as formatTime } from '@/utils/common/date'

type Props = {
   article: Article
}

const useBaseStyles = makeResetStyles({
  backgroundColor: tokens.colorNeutralBackground1,
  // boxShadow: tokens.shadow2,
  boxShadow: `inset 0 -1px 0 0 ${tokens.colorNeutralShadowAmbientLighter}`,
})

const useStyles = makeStyles({
  read: {
    backgroundColor: tokens.colorNeutralBackground2,
  },

  selected: {
    backgroundColor: tokens.colorNeutralBackground6,
  },

  active: {
    position: 'relative',
    boxShadow: tokens.shadow8,

    '::after': {
      content: '" "',
      display: 'block',
      width: '3px',
      height: '100%',
      position: 'absolute',
      top: 0,
      backgroundColor: '#4d90f0',
    },
  },
})

const { readerStore } = store

function Item({ article }: Props) {
  const styles = useStyles()
  const { activeId, feeds } = readerStore
  const {
    id,
    title,
    read = false,
    selected = false,
    feedId,
    pubTime,
  } = article

  const active = id === activeId
  const feed = feeds.find((v) => v.id === feedId)

  const containerStyle = [
    [read, styles.read],
    [selected, styles.selected],
    [active, styles.active],
  ].reduce(
    (pre, [condition, style]) => condition ? mergeClasses(pre, style as string) : pre,
    useBaseStyles(),
  )

  const onCheckChange: CheckboxProps['onChange'] = () => {
    readerStore.toggleSelected(id!)
  }

  const open = () => {
    readerStore.open(id)
  }

  return (
    <div
      className={containerStyle}
      data-list-item-id={id}
    >
      <div className={`${!read ? 'font-bold' : ''} py-1 pl-2 pr-4 flex items-center`}>
        <div>
          <Checkbox
            checked={selected}
            onChange={onCheckChange}
          />
        </div>
        <div className="mx-2">
          <StarButton
            id={id!}
            className="h-auto w-auto"
          />
        </div>
        <div
          className="basis-[168px] max-w-[168px] pr-8 whitespace-nowrap overflow-hidden cursor-pointer"
          role="button"
          onClick={open}
        >
          {feed?.title}
        </div>
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            className="mr-auto overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
            onClick={open}
            role="button"
          >
            {title}
          </div>
          <div className="ml-auto pl-5 text-xs whitespace-pre">
            {formatTime(pubTime!)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Item)
