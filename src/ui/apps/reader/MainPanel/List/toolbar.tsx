import { Checkbox, CheckboxProps } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'
import { store } from '@/ui/store'
import { RefreshButton, MarkReadButton } from '@/ui/apps/reader/components/toolbar'

const { readerStore } = store

function Toolbar() {
  const { isAllSelected, isAllDeselected } = readerStore

  // eslint-disable-next-line no-nested-ternary
  const selected = isAllDeselected ? false
    : isAllSelected ? true : 'mixed'

  const onCheckChange: CheckboxProps['onChange'] = () => {
    const checked = selected === false

    if (checked) {
      readerStore.selectAll()
    } else {
      readerStore.deselectAll()
    }
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
