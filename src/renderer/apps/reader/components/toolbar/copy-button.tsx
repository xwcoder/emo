import intl from 'react-intl-universal'
import { CopyRegular } from '@fluentui/react-icons'
import {
  useId,
  useToastController,
  Toast,
  ToastIntent,
  ToastTitle,
  Toaster,
} from '@fluentui/react-components'
import Button from './button'

type Props = {
  className: string
  fontSize: number
  content: string
}

export default function CopyButton(props: Props) {
  const { className, fontSize = 18, content } = props

  const toasterId = useId('toaster')
  const { dispatchToast } = useToastController(toasterId)

  const notify = (text: string, intent: ToastIntent) => dispatchToast(
    <Toast>
      <ToastTitle>
        {text}
      </ToastTitle>
    </Toast>,
    { intent },
  )

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(content)
      notify(intl.get('reader.action.copy.success'), 'success')
    } catch (e) {
      notify(`${(e as Error).name}: ${(e as Error).message}`, 'error')
    }
  }

  return (
    <>
      <Button
        icon={CopyRegular}
        className={className}
        fontSize={fontSize}
        onClick={onClick}
        tip={intl.get('reader.action.copy.title')}
      />
      <Toaster
        position="top-end"
        toasterId={toasterId}
      />
    </>
  )
}
