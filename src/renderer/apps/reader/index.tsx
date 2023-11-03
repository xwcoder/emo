import { makeStyles, tokens, shorthands } from '@fluentui/react-components'

import SidePanel from './SidePanel'
import MainPanel from './MainPanel'
import KeyboardShortcutsPanel from './keyboard-shortcuts-panel'

import useKeyboard from './use-keyboard'

const useStyles = makeStyles({
  side: {
    backgroundColor: tokens.colorNeutralBackground3,
    height: '100vh',
    ...shorthands.overflow('auto', 'auto'),
  },
  main: {
    backgroundColor: tokens.colorNeutralBackground3,
    height: '100vh',
    ...shorthands.overflow('auto', 'auto'),
  },
})

export default function Reader() {
  const styles = useStyles()

  useKeyboard()

  return (
    <>
      <div className="relative grid grid-cols-[256px_1fr] h-[100%]">
        <div className={styles.side}>
          <div className="py-5 pr-4">
            <SidePanel />
          </div>
        </div>
        <div className={styles.main}>
          <MainPanel />
        </div>
      </div>
      <KeyboardShortcutsPanel />
    </>
  )
}
