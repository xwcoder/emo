import { PropsWithChildren, useState } from 'react'
import { observer } from 'mobx-react-lite'
import intl from 'react-intl-universal'
import {
  Radio,
  RadioGroup,
  Input,
  Button,
} from '@fluentui/react-components'
import { store } from '@/renderer/store'
import { labels as locales } from '@/i18n'
import { openDirectory } from '@/utils/browser/shell'

const { settingStore } = store

type ItemProps = PropsWithChildren<{
  title?: string
}>

function Item({ title, children }: ItemProps) {
  return (
    <div>
      <div className="font-bold">
        {title}
      </div>
      {children}
    </div>
  )
}

function Settings() {
  const {
    appearance,
    appearances,
    locale,
    dataPath: activeDataPath,
    defaultDataPath,
  } = settingStore

  const [dataPath, setDataPath] = useState(activeDataPath)

  const directorBrowserHandler = async () => {
    const { canceled, filePaths } = await openDirectory({
      properties: ['createDirectory'],
      defaultPath: dataPath,
    })

    if (canceled) {
      return
    }

    const path = filePaths[0]
    setDataPath(path)
  }

  return (
    <div className="h-[100vh] py-10 px-10">
      <div className="max-w-[500px] mx-auto flex flex-col gap-y-5">
        <Item title={intl.get('settings.appearance.title')}>
          <RadioGroup
            value={appearance}
            onChange={(_, data) => settingStore.setAppearance(data.value as any)}
          >
            {appearances.map((v) => <Radio key={v} value={v} label={intl.get(`settings.appearance.${v}`)} />)}
          </RadioGroup>
        </Item>
        <Item title={intl.get('settings.locale.title')}>
          <RadioGroup
            value={locale}
            onChange={(_, data) => settingStore.setLocale(data.value)}
          >
            {locales.map((v) => <Radio key={v.value} value={v.value} label={v.label} />)}
          </RadioGroup>
        </Item>
        <Item title={intl.get('settings.dataPath.title')}>
          <div className="pt-1 flex gap-2">
            <Input
              value={dataPath}
              className="flex-1"
              appearance="filled-darker"
            />
            <Button
              size="small"
              appearance="primary"
              onClick={directorBrowserHandler}
            >
              {intl.get('settings.dataPath.browserBtn')}
            </Button>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button
              size="small"
              appearance="secondary"
              disabled={dataPath === defaultDataPath}
              onClick={() => setDataPath(defaultDataPath)}
            >
              {intl.get('settings.dataPath.setToDefaultBtn')}
            </Button>
            <Button
              size="small"
              appearance="secondary"
              disabled={dataPath === activeDataPath}
              onClick={() => settingStore.setDataPath(dataPath)}
            >
              {intl.get('settings.dataPath.applyBtn')}
            </Button>
          </div>
        </Item>
      </div>
    </div>
  )
}

export default observer(Settings)
