import { useEffect, useState } from 'react'

export const useAsyncData = (fetcher, deps = []) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: '',
  })

  useEffect(() => {
    let active = true

    const load = async () => {
      setState({ data: null, loading: true, error: '' })
      try {
        const data = await fetcher()
        if (active) {
          setState({ data, loading: false, error: '' })
        }
      } catch (error) {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: error?.data?.message || error?.message || 'Unable to load data',
          })
        }
      }
    }

    load()
    return () => {
      active = false
    }
  }, deps)

  return state
}
