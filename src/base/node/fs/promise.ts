import * as fs from 'node:fs/promises'

export const readJSON = async (path: string) => {
  try {
    const content = await fs.readFile(path, { encoding: 'utf8' })
    return JSON.parse(content)
  } catch (e) {
    // TODO
    return null
  }
}

export const writeJSON = async (path: string, data: any) => {
  try {
    return fs.writeFile(path, JSON.stringify(data, null, 2))
  } catch (e) {
    // TODO
    return null
  }
}
