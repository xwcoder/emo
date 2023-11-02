import intl from 'react-intl-universal'
import { ArrowUpRightRegular } from '@fluentui/react-icons'
import { Button } from '@/renderer/apps/reader/components/toolbar'
import { openExternal } from '@/utils/browser/shell'

type Props = {
  url: string
}

export default function OpenExternalButton({ url }: Props) {
  const onClick = () => {
    openExternal(url)
  }

  return (
    <Button
      icon={ArrowUpRightRegular}
      onClick={onClick}
      fontSize={16}
      tip={intl.get('reader.action.openExternal')}
    />
  )
}
