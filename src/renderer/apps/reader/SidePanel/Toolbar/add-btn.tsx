import { useState, useRef } from 'react'
import { AddRegular } from '@fluentui/react-icons'
import {
  Dialog,
  DialogSurface,
  DialogTrigger,
  DialogBody,
  DialogTitle,
  DialogActions,
  DialogContent,
  Input,
  Field,
  Button,
} from '@fluentui/react-components'
import intl from 'react-intl-universal'
import { Button as ToolbarButton } from '@/renderer/apps/reader/components/toolbar'
import { Feed } from '@/types/reader'
import * as feedService from '@/renderer/services/reader/feed'

export default function AddButton() {
  const [openState, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const urlRef = useRef('')

  const handleSubmit = async () => {
    if (submitting) {
      return
    }

    setSubmitting(true)
    try {
      await feedService.upsert({ url, title })
    } finally {
      setOpen(false)
      setUrl('')
      setTitle('')
      setSubmitting(false)
    }
  }

  const onBlur = async () => {
    if (!url || url === urlRef.current) {
      return
    }

    urlRef.current = url

    const res = await feedService.preflight(url)

    if (!res) {
      return
    }

    const feed = res as Feed

    if (feed.url !== url) {
      return
    }

    setTitle(feed.title)
  }

  return (
    <Dialog
      open={openState}
      onOpenChange={(_, data) => setOpen(data.open)}
    >
      <DialogTrigger disableButtonEnhancement>
        <ToolbarButton
          icon={AddRegular}
          fontSize={16}
          className="h-6 w-6"
        />
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form>
          <DialogBody>
            <DialogTitle>{intl.get('reader.form.title')}</DialogTitle>
            <DialogContent className="flex flex-col gap-y-4">
              <Field
                required
                label={intl.get('reader.form.url.label')}
              >
                <Input
                  type="url"
                  name="url"
                  value={url}
                  onBlur={onBlur}
                  onChange={(_, data) => setUrl(data.value)}
                />
              </Field>
              <Field
                required
                label={intl.get('reader.form.name.label')}
              >
                <Input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(_, data) => setTitle(data.value)}
                />
              </Field>
            </DialogContent>
            <DialogActions
              className="mt-5"
              position="start"
            >
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="subtle">
                  {intl.get('reader.form.buttons.close')}
                </Button>
              </DialogTrigger>
              <Button
                appearance="primary"
                disabled={!url.trim() || !title.trim()}
                onClick={handleSubmit}
                className={submitting ? 'opacity-70 cursor-auto' : ''}
              >
                {intl.get('reader.form.buttons.subscribe')}
                {submitting ? '...' : ''}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  )
}
