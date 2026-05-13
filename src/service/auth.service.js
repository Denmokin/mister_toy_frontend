import { httpService } from "./http.service"

const SESSION_STORAGE_KEY = 'loggedInUser'
const BASE_URL = '/api/auth/'

export const authService = {
  login,
  signup,
  logout,
  getLoggedInUser,
}

function login({ username, password }) {
  return httpService.post(BASE_URL + 'login', { username, password })
    .then(_setLoggedInUser)
}

function signup({ username, password, fullname }) {
  return httpService.post(BASE_URL + 'signup', { username, password, fullname })
    .then(_setLoggedInUser)
}

function logout() {
  return httpService.post(BASE_URL + 'logout')
    .then(() => sessionStorage.removeItem(SESSION_STORAGE_KEY))
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
}

function _setLoggedInUser(user) {
  const { id, fullname, isAdmin } = user
  const userToSave = { id, fullname, isAdmin }

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userToSave))
  return userToSave
}