export const format = (date: Date | number | string, pattern: string = 'MM/dd/yy') => {
  const d = date instanceof Date ? date : new Date(date)

  let f = pattern

  const o = {
    'y+': `${d.getFullYear()}`.slice(2),
    'M+': `${d.getMonth() + 1}`,
    'd+': `${d.getDate()}`,
    'h+': `${d.getHours()}`,
    'm+': `${d.getMinutes()}`,
    's+': `${d.getSeconds()}`,
  } as const

  Object.entries(o)
    .forEach(([k, v]) => {
      if (new RegExp(`(${k})`).test(f)) {
        f = f.replace(RegExp.$1, v.padStart(2, '0'))
      }
    })

  return f
}
