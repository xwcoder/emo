import {
  BookFilled,
  BookRegular,
  SettingsFilled,
  SettingsRegular,
} from '@fluentui/react-icons'
import { makeStyles, tokens } from '@fluentui/react-components'

import Item from './item'

const useStyles = makeStyles({
  nav: {
    backgroundColor: tokens.colorNeutralBackground5,
  },
})

export default function Nav() {
  const styles = useStyles()

  return (
    <div className={styles.nav}>
      <div className="pt-12 pb-4 flex flex-col justify-between h-[100vh]">
        <div className="flex flex-col">
          <Item
            id="reader"
            iconFilled={BookFilled}
            iconRegular={BookRegular}
          />
        </div>
        <div className="flex flex-col">
          <Item
            id="settings"
            iconFilled={SettingsFilled}
            iconRegular={SettingsRegular}
          />
        </div>
      </div>
    </div>
  )
}
