import { MouseEventHandler } from 'react'
import intl from 'react-intl-universal'
import { DeleteRegular } from '@fluentui/react-icons'
import Button from './button'

type Props = {
  className: string
  fontSize: number
  onClick: MouseEventHandler
}

export default function DeleteButton(props: Props) {
  const { className, fontSize = 18, onClick } = props

  return (
    <Button
      icon={DeleteRegular}
      className={className}
      fontSize={fontSize}
      onClick={onClick}
      tip={intl.get('reader.action.delete')}
    />
  )
}
