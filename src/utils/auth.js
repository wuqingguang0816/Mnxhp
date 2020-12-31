import Cookies from 'js-cookie'

const TokenKey = 'JNPF-Token'
const LockKey = 'JNPF-Lock'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLock() {
  return Cookies.get(LockKey)
}

export function setLock(isLock) {
  return Cookies.set(LockKey, isLock)
}
export function removeLock() {
  return Cookies.remove(LockKey)
}