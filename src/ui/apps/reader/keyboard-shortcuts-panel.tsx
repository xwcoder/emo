import { observer } from 'mobx-react-lite'
import intl from 'react-intl-universal'
import { store } from '@/ui/store'
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  makeStyles,
  tokens,
} from '@fluentui/react-components'

const { readerStore } = store

const useStyles = makeStyles({
  key: {
    color: tokens.colorPaletteMarigoldForeground3,
    fontWeight: tokens.fontWeightBold,
  },
})

function KeyboardShortcutsPanel() {
  const { showKeyboardPanel } = readerStore
  const styles = useStyles()

  const shortcuts = [
    {
      keys: ['?'],
      text: intl.get('reader.keyboard.keys.sw'),
    },
    {
      keys: ['g', 'i'],
      text: intl.get('reader.keyboard.keys.gi'),
    },
    {
      keys: ['g', 's'],
      text: intl.get('reader.keyboard.keys.gs'),
    },
    {
      keys: ['g', 'a'],
      text: intl.get('reader.keyboard.keys.ga'),
    },
    {
      keys: ['*', 'a'],
      text: intl.get('reader.keyboard.keys.selectAll'),
    },
    {
      keys: ['*', 'n'],
      text: intl.get('reader.keyboard.keys.deselect'),
    },
    {
      keys: ['x'],
      text: intl.get('reader.keyboard.keys.x'),
    },
    {
      keys: ['s'],
      text: intl.get('reader.keyboard.keys.s'),
    },
    {
      keys: ['j'],
      text: intl.get('reader.keyboard.keys.j'),
    },
    {
      keys: ['k'],
      text: intl.get('reader.keyboard.keys.k'),
    },
    {
      keys: ['o'],
      text: intl.get('reader.keyboard.keys.o'),
    },
    {
      keys: ['u'],
      text: intl.get('reader.keyboard.keys.u'),
    },
    {
      keys: ['v'],
      text: intl.get('reader.keyboard.keys.v'),
    },
    {
      keys: ['shift', 'i'],
      connector: '+',
      text: intl.get('reader.keyboard.keys.shifti'),
    },
    {
      keys: ['shift', 'u'],
      text: intl.get('reader.keyboard.keys.shiftu'),
      connector: '+',
    },
  ].map((item) => {
    const keys = item.keys.map((k, index, v) => (
      <span
        key={k}
      >
        <span
          className={styles.key}
        >
          {k}
        </span>
        {index !== v.length - 1 ? (
          <span>
            {' '}
            {item.connector ?? 'then'}
            {' '}
          </span>
        ) : null}
      </span>
    ))

    return (
      <div
        key={item.keys.join('')}
      >
        <span
          className="inline-block w-16 text-right"
        >
          {keys}
        </span>
        {' '}
        :
        {' '}
        {item.text}
      </div>
    )
  })

  return (
    <Dialog
      open={showKeyboardPanel}
      onOpenChange={() => readerStore.closeKeyboardPanel()}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {intl.get('reader.keyboard.title')}
          </DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-2 gap-y-2 gap-x-5">
              {shortcuts}
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default observer(KeyboardShortcutsPanel)
