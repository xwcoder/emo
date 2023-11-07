import fetch from '@/base/browser/fetch'

export const get = (path?: string) => fetch('/settings/get', path)

export const set = (path: string, value: any) => fetch('/settings/set', { path, value })
