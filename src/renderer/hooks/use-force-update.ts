import { useState, useCallback } from 'react'

export default function useForceUpdate() {
  const [, setValue] = useState({})

  return useCallback(() => {
    setValue({})
  }, [])
}
