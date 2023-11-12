/* eslint-disable react/no-danger */
import { useEffect, useRef } from 'react'
import { makeStyles, tokens, shorthands } from '@fluentui/react-components'
import { observer } from 'mobx-react-lite'
import { store } from '@/ui/store'
import { format as formatTime } from '@/base/common/date'
import { openExternal } from '@/base/browser/shell'
import { getAnchor } from '@/base/browser/dom'

const { readerStore } = store

const useStyles = makeStyles({
  secondInfo: {
    color: tokens.colorNeutralForeground3,
  },

  content: {
    '& p, & section': {
      marginTop: '20px',
      marginBottom: '20px',
      lineHeight: 1.625,
    },

    '& pre': {
      backgroundColor: tokens.colorNeutralBackground6,
      ...shorthands.padding(tokens.spacingVerticalXL),
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fontSizes = [
  'text-[12px]',
  'text-[13px]',
  'text-[14px]',
  'text-[15px]',
  'text-[16px]',
  'text-[17px]',
  'text-[18px]',
  'text-[19px]',
  'text-[20px]',
  'text-[21px]',
  'text-[22px]',
  'text-[23px]',
  'text-[24px]',
]

function Content() {
  const styles = useStyles()
  const { activeArticle, feeds, fontSize } = readerStore

  if (!activeArticle) {
    return null
  }

  const {
    title,
    content,
    feedId,
    pubTime,
    author,
  } = activeArticle
  const feed = feeds.find((v) => v.id === feedId)!

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current

    const handler = (e: MouseEvent) => {
      const anchor = getAnchor(e.target as HTMLElement)

      if (!(anchor instanceof HTMLAnchorElement) || !anchor.href) {
        return
      }

      e.preventDefault()
      openExternal(anchor.href)
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
          {author !== feed.title && (
            <div className="mr-7">
              {author}
            </div>
          )}
          <div>
            {formatTime(pubTime!, 'MM/dd/yy hh:mm')}
          </div>
        </div>
      </div>
      <div className={`px-5 text-[${fontSize}px]`}>
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
