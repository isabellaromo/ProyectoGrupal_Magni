import { useState, useEffect, useMemo } from 'react'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetchData<T>(url: string, options: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })
  const optionsKey = JSON.stringify(options)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOptions = useMemo(() => options, [optionsKey])

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const data = await res.json()
        setState({ data, loading: false, error: null })
      } catch (err: unknown) {
        setState({ data: null, loading: false, error: `${err}` })
      }
    }
    fetchData()
    return () => controller.abort()
  }, [url, optionsKey]) // ✅ ahora esta dependencia también está clara
  // stringify para comparar opciones por contenido

  return state
}
