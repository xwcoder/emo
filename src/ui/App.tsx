import { ReactNode } from 'react'
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'

import Nav from '@/ui/Nav'
import { store } from '@/ui/store'
import ReaderApp from '@/ui/apps/reader'
import Settings from '@/ui/apps/settings'
import { Apps } from '@/types/common'

const apps: { [key in Apps]?: () => ReactNode } = {
  reader: () => <ReaderApp />,
  settings: () => <Settings />,
}

function App() {
  const theme = store.appearance === 'dark' ? webDarkTheme : webLightTheme

  const renderApplication = apps[store.app] || apps.reader

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale } = store

  return (
    <FluentProvider theme={theme}>
      <div className="w-[100vw] h-[100vh] grid grid-cols-[60px_1fr]">
        <div className="draggle h-[100vh]">
          <Nav />
        </div>
        <div className="h-[100vh]">
          {renderApplication!()}
        </div>
      </div>
    </FluentProvider>
  )
}

export default observer(App)
