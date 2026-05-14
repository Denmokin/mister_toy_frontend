import { httpService } from "./http.service"

const SESSION_STORAGE_KEY = 'loggedInUser'
const AUTH_URL = 'auth/'

export const authService = {
  login,
  signup,
  logout,
  getLoggedInUser,
}

function login({ username, password }) {
  return httpService.post(AUTH_URL + 'login', { username, password })
    .then(user => {
      console.log('user FETCH:', user)
      if (user) return _setLoggedInUser(user)
      else return Promise.reject('Invalid login')
    })
}

function signup({ username, password, fullname }) {
  return httpService.post(AUTH_URL + 'signup', { username, password, fullname })
    .then(user => {
      console.log('user FETCH:', user)
      if (user) return _setLoggedInUser(user)
      else return Promise.reject('Invalid signup')
    })
}

function logout() {
  return httpService.post(AUTH_URL + 'logout')
    .then(() => sessionStorage.removeItem(SESSION_STORAGE_KEY))
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
}

function _setLoggedInUser(user) {
  console.log('ss')
  const { id, fullname, isAdmin } = user
  const userToSave = { id, fullname, isAdmin }

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userToSave))
  return userToSave
}