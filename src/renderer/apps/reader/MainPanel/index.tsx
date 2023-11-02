import { observer } from 'mobx-react-lite'
import { makeStyles, tokens } from '@fluentui/react-components'
import { store } from '@/renderer/store'

import List from './List'
import Article from './Article'

const { readerStore } = store

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    height: '100%',
  },
})

function MainPanel() {
  const styles = useStyles()
  const { opened } = readerStore

  return (
    <div className="h-[100%] py-5 pr-5 flex flex-col">
      <div className="undraggle flex-1 rounded-2xl overflow-hidden">
        <div className={styles.container}>
          {opened ? <Article /> : <List />}
        </div>
      </div>
    </div>
  )
}

export default observer(MainPanel)
