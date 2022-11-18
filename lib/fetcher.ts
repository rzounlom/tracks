// extracts fetch calls

export default function fetcher(url: string, data = undefined) {
  // get default url on domain
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error()
    }
    return res.json()
  })
}
