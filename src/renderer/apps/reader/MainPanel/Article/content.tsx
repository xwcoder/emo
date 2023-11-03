/* eslint-disable react/no-danger */
import { useEffect, useRef } from 'react'
import { makeStyles, tokens } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'
import { store } from '@/renderer/store'
import { format as formatTime } from '@/utils/common/date'
import { openExternal } from '@/utils/browser/shell'

const { readerStore } = store

const useStyles = makeStyles({
  secondInfo: {
    color: tokens.colorNeutralForeground3,
  },

  content: {
    '& p': {
      marginTop: '20px',
      marginBottom: '20px',
    },

    '& h1': {
      fontSize: tokens.fontSizeHero700,
      lineHeight: 1.2,
    },
    '& h2': {
      fontSize: tokens.fontSizeBase600,
      lineHeight: 1.2,
    },
    '& h3': {
      fontSize: tokens.fontSizeBase500,
      lineHeight: 1.2,
    },
    '& h4': {
      fontSize: tokens.fontSizeBase400,
      lineHeight: 1.2,
    },

    '& a': {
      color: tokens.colorBrandForegroundLink,
      textDecorationLine: 'underline',

      ':hover': {
        color: tokens.colorBrandForegroundLinkHover,
      },
      ':active': {
        color: tokens.colorBrandForegroundLinkSelected,
      },
      ':visited': {
        color: tokens.colorBrandForegroundLinkPressed,
      },
    },
  },
})

function Content() {
  const styles = useStyles()
  const { activeArticle, feeds } = readerStore

  if (!activeArticle) {
    return null
  }

  const {
    title,
    content,
    feedId,
    pubTime,
  } = activeArticle
  const feed = feeds.find((v) => v.id === feedId)!

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    const handler = (e: MouseEvent) => {
      const { target } = e
      if (!(target instanceof HTMLAnchorElement) || !target.href) {
        return
      }

      e.preventDefault()
      openExternal(target.href)
    }

    el?.addEventListener('click', handler)

    return () => {
      el?.removeEventListener('click', handler)
    }
  }, [containerRef.current])

  return (
    <div>
      <h1 className="text-2xl px-5 pt-4 pb-3">
        {title}
      </h1>
      <div className={styles.secondInfo}>
        <div className="px-5 flex text-xs pb-5">
          <div className="mr-7">
            {feed.title}
          </div>
          <div>
            {formatTime(pubTime!, 'MM/dd/yy hh:mm')}
          </div>
        </div>
      </div>
      <div className="px-5">
        <div
          ref={containerRef}
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}

export default observer(Content)
