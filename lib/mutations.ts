import fetcher from './fetcher'

export const auth = (
  mode: 'signin' | 'signup',
  body: { email: string; password: string }
) => {
  // mode will be string values signin or signup
  return fetcher(`${mode}`, body)
}
