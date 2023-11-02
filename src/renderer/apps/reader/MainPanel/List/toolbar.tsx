import { Checkbox, CheckboxProps } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'
import { store } from '@/renderer/store'
import { RefreshButton, MarkReadButton } from '@/renderer/apps/reader/components/toolbar'

const { readerStore } = store

function Toolbar() {
  const { articles, isAllSelected, isAllDeselected } = readerStore

  // eslint-disable-next-line no-nested-ternary
  const selected = isAllDeselected ? false
    : isAllSelected ? true : 'mixed'

  const onCheckChange: CheckboxProps['onChange'] = () => {
    const checked = selected === false

    // TODO use action
    // eslint-disable-next-line no-param-reassign
    articles.forEach((v) => { v.selected = checked })
  }

  return (
    <div className="pl-2 flex items-center">
      <div className="mr-8">
        <Checkbox
          checked={selected}
          onChange={onCheckChange}
        />
      </div>
      <div className="flex items-center">
        { selected === false
          ? (
            <RefreshButton />
          )
          : (
            <MarkReadButton />
          )}
      </div>
    </div>
  )
}

export default observer(Toolbar)
