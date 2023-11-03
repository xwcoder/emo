import { parseStringPromise } from 'xml2js'
import get from 'lodash.get'
import { Feed } from '@/types/reader'

const trim = (s = '') => s.replaceAll('\n', '').trim()

const gettrim = (...args: Parameters<typeof get>) => trim(get(...args))

const parseRss = (xml: any): Omit<Feed, 'url'> => {
  const channel = get(xml, 'rss.channel[0]', {})

  return {
    title: gettrim(channel, 'title[0]', ''),
    description: gettrim(channel, 'description[0]', ''),
    link: gettrim(channel, 'link[0]', ''),
    items: (channel.item || []).map((v: any) => ({
      title: gettrim(v, 'title[0]'),
      url: gettrim(v, 'link[0]'),
      content: gettrim(v, 'content:encoded[0]') || gettrim(v, 'description[0]'),
      pubTime: gettrim(v, 'pubDate[0]'),
    })),
  }
}

const parseAtom = (xml: any): Omit<Feed, 'url'> => {
  const feed = get(xml, 'feed', {})

  return {
    title: gettrim(feed, 'title[0]', ''),
    description: '',
    link: '',
    items: (feed.entry || []).map((v: any) => ({
      title: gettrim(v, 'title[0]'),
      url: gettrim(v, 'link[0].$.href', ''),
      content: gettrim(v, 'content[0]_', ''),
      pubTime: gettrim(v, 'published[0]'),
    })),
  }
}

export const parseString = async (xml: string): Promise<Omit<Feed, 'url'> | null> => {
  const res = await parseStringPromise(xml)
  // RSS
  if (res.rss) {
    return parseRss(res)
  }

  if (res.feed) {
    return parseAtom(res)
  }

  return null
}

export const parseURL = async (url: string): Promise<Feed | null> => {
  const response = await fetch(url)
  const xml = await response.text()
  const feed = await parseString(xml)

  if (!feed) {
    return null
  }

  return {
    url,
    ...feed,
  }
}
