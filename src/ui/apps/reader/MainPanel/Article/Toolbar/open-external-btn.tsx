import intl from 'react-intl-universal'
import { ArrowUpRightRegular } from '@fluentui/react-icons'
import { Button } from '@/ui/apps/reader/components/toolbar'
import { openExternal } from '@/base/browser/shell'

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
