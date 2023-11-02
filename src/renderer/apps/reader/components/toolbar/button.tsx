import { MouseEventHandler } from 'react'
import { IconsFilled, IconsRegular } from '@fluentui/react-icons'
import { Tooltip } from '@fluentui/react-components'

type Props = {
  icon: typeof IconsRegular | typeof IconsFilled,
  fontSize?: number,
  onClick?: MouseEventHandler,
  tip?: string,
  className?: string
}

export default function Button(props: Props) {
  const {
    icon,
    fontSize = 18,
    onClick = () => {},
    tip,
    className,
  } = props
  const Icon = icon

  const button = (
    <button
      type="button"
      className={`h-10 w-10 flex justify-center items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon fontSize={fontSize} />
    </button>
  )

  return tip ? (
    <Tooltip
      content={tip}
      relationship="description"
      positioning="below"
      appearance="inverted"
    >
      {button}
    </Tooltip>
  ) : button
}
