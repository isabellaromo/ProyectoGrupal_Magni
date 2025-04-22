export default function fetchHelper() {
  async function customFetch(endpoint: string, options: RequestInit) {
    const defaultHeader = {
      accept: 'application/json',
    }

    const controller = new AbortController()
    options.signal = controller.signal
    options.method = options.method || 'GET'
    options.headers = { ...defaultHeader, ...options.headers }
    if (!options.body) delete options.body

    setTimeout(() => controller.abort(), 3000)

    const response = await fetch(endpoint, options)
    if (!response.ok) {
      throw new Error(`${response.status}`)
    }
    return await response.json()
  }
  const get = (endpoint: string, options = {}) => customFetch(endpoint, options)

  const post = (endpoint: string, options: RequestInit) => {
    options.method = 'POST'
    return customFetch(endpoint, options)
  }
  const put = (endpoint: string, options: RequestInit) => {
    options.method = 'PUT'
    return customFetch(endpoint, options)
  }
  const del = (endpoint: string, options: RequestInit) => {
    options.method = 'DELETE'
    return customFetch(endpoint, options)
  }

  return {
    get,
    post,
    put,
    del,
  }
}
