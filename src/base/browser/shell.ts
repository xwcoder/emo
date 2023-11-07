export const openExternal = (url: string) => window.emo.openExternal(url)

// eslint-disable-next-line max-len
export const openDirectory = (options: Parameters<typeof window.emo.openDirectory>[0]) => window.emo.openDirectory(options)
