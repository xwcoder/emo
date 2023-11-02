import { IconsRegular, IconsFilled } from '@fluentui/react-icons'
import { makeStyles, tokens } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'

import { Apps } from '@/types/common'
import { store } from '@/renderer/store'

type Props = {
  id: Apps
  iconFilled: typeof IconsFilled,
  iconRegular: typeof IconsRegular,
}

const useStyles = makeStyles({
  icon: {
    ':hover': {
      color: tokens.colorNeutralForeground3BrandHover,
    },
  },

  iconActive: {
    color: tokens.colorNeutralForeground3BrandSelected,
  },
})

function Item(props: Props) {
  const {
    id,
    iconFilled,
    iconRegular,
  } = props

  const active = store.app === id
  const Icon = active ? iconFilled : iconRegular

  const styles = useStyles()

  const onClick = () => {
    store.changeApp(id)
  }

  return (
    <div className="undraggle mb-2 last-of-type:mb-0 flex justify-center">
      <div
        onClick={onClick}
        role="button"
        className={active ? styles.iconActive : styles.icon}
      >
        <Icon fontSize="32" />
      </div>
    </div>
  )
}

export default observer(Item)
