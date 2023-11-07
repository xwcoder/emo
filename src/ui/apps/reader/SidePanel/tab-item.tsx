import { IconsRegular, IconsFilled } from '@fluentui/react-icons'
import { makeStyles, tokens } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'

import { Tab } from '@/types/reader'
import { store } from '@/ui/store'

type Props = {
  text: string
  tab: Tab
  iconFilled: typeof IconsFilled
  iconRegular: typeof IconsRegular
  count?: number
}

const { readerStore } = store

const useStyles = makeStyles({
  normal: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },

  active: {
    backgroundColor: tokens.colorNeutralBackground2Selected,
  },
})

function Item(props: Props) {
  const {
    tab,
    text,
    iconFilled,
    iconRegular,
    count,
  } = props

  const styles = useStyles()
  const active = readerStore.tab === tab
  const Icon = active ? iconFilled : iconRegular

  const onClick = () => {
    readerStore.changeTab(tab)
  }

  return (
    <div className="rounded-r-2xl overflow-hidden">
      <div
        onClick={onClick}
        role="button"
        className={active ? styles.active : styles.normal}
      >
        <div className="flex items-center h-8 cursor-pointer pl-6 pr-3">
          <div className="mr-4">
            <Icon fontSize="20" />
          </div>
          <div className={`${active ? 'font-bold' : ''} flex flex-1 items-center overflow-hidden`}>
            <div className="mr-auto overflow-hidden text-ellipsis whitespace-nowrap">
              {text}
            </div>
            <div className="ml-auto pl-4 text-xs">
              {count ?? ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Item)
