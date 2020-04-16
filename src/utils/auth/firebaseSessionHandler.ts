import fetch from 'isomorphic-unfetch'

export const setSession = (user: firebase.User | null) => {
  // Log in.
  if (user) {
    return user.getIdToken().then((token: any) => {
      return fetch('/api/login', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ token }),
      })
    })
  }

  // Log out.
  return fetch('/api/logout', {
    method: 'POST',
    credentials: 'same-origin',
  })
}
