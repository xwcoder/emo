import { observer } from 'mobx-react-lite'
import { makeStyles, tokens } from '@fluentui/react-components'
import {
  ArrowNextRegular,
  ArrowPreviousRegular,
  ArrowNextFilled,
  ArrowPreviousFilled,
} from '@fluentui/react-icons'
import { store } from '@/ui/store'
import { Button } from '@/ui/apps/reader/components/toolbar'

const { readerStore } = store

const useStyles = makeStyles({
  paging: {
    color: tokens.colorNeutralForeground3,
  },
  activeButton: {
    color: tokens.colorNeutralForeground1,
  },

  disableButton: {
    cursor: 'auto',
  },
})

function Pagination() {
  const styles = useStyles()

  const {
    page,
    size,
    articles,
    count,
    isFirstPage,
    isLastPage,
  } = readerStore

  const start = count > 0 ? (page - 1) * size + 1 : 0
  const end = count > 0 ? (page - 1) * size + articles.length : 0

  return (
    <div className={styles.paging}>
      <div className="flex items-center text-xs">
        <div>
          {start}
          -
          {end}
          {' '}
          of
          {' '}
          {count}
        </div>
        <div className="pl-4 flex items-center">
          <Button
            icon={isFirstPage ? ArrowPreviousRegular : ArrowPreviousFilled}
            fontSize={16}
            onClick={() => readerStore.getPrevPage()}
            className={isFirstPage ? styles.disableButton : styles.activeButton}
          />
          <Button
            icon={isLastPage ? ArrowNextRegular : ArrowNextFilled}
            fontSize={16}
            onClick={() => readerStore.getNextPage()}
            className={isLastPage ? styles.disableButton : styles.activeButton}
          />
        </div>
      </div>
    </div>
  )
}

export default observer(Pagination)
