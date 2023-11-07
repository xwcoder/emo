import * as fs from 'node:fs'

export const readJSON = (path: string) => {
  try {
    const content = fs.readFileSync(path, { encoding: 'utf8' })
    return JSON.parse(content)
  } catch (e) {
    // TODO
    return null
  }
}

export const writeJSON = (path: string, data: any) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
  } catch (e) {
    // TODO
  }
}
