import fetch from '@/utils/browser/fetch'

export const preflight = (url: string) => fetch('/reader/get/feed/preflight', url)

export const getAll = () => fetch('/reader/get/feed/all')

export const upsert = (data: { url: string, title: string}) => fetch('/reader/post/feed', data)

export const deleteById = (id: number) => fetch('/reader/delete/feed', id)
