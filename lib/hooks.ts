import useSWR from 'swr'
import fetcher from './fetcher'

// get user hook
export const useMe = () => {
  // swr stores data on your machine similar to redux to check when to refetch the data
  // passing in the route as the key so SWR knows when to refetch data
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export const usePlayist = () => {
  const { data, error } = useSWR('/playlist', fetcher)

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  }
}
