import fetch from 'isomorphic-unfetch'

export const setSession = (user: firebase.default.User | null) => {
  // Log in.
  if (user) {
    return user.getIdToken().then((token: any) => {
      return fetch('/api/v1/login', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ token }),
      })
    })
  }

  // Log out.
  return fetch('/api/v1/logout', {
    method: 'POST',
    credentials: 'same-origin',
  })
}
