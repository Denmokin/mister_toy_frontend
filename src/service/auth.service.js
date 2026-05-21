import { httpService } from "./http.service"

const SESSION_STORAGE_KEY = 'loggedInUser'
const AUTH_URL = 'auth/'

export const authService = {
  login,
  signup,
  logout,
  getLoggedInUser,
}

async function login({ username, password }) {
  try {
    const user = await httpService.post(AUTH_URL + 'login', { username, password })
    if (user) return _setLoggedInUser(user)
    return user
  } catch (err) {
    console.error('authService.login frontend failed:', err)
    throw err
  }
}

async function signup({ username, password, fullname }) {
  try {
    const user = await httpService.post(AUTH_URL + 'signup', { username, password, fullname })
    if (user) return _setLoggedInUser(user)
    return user
  } catch (err) {
    console.error('authService.signup frontend failed:', err)
    throw err
  }
}

async function logout() {
  try {
    await httpService.post(AUTH_URL + 'logout')
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  } catch (err) {
    console.error('authService.logout frontend failed:', err)
    throw err
  }
}

function getLoggedInUser() {
  try {
    const sessionItem = sessionStorage.getItem(SESSION_STORAGE_KEY)
    return JSON.parse(sessionItem)
  } catch (err) {
    console.error('authService.getLoggedInUser frontend failed:', err)
    throw err
  }
}

function _setLoggedInUser(user) {
  const { _id, fullname, isAdmin } = user
  const userToSave = { _id, fullname, isAdmin }

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userToSave))
    return userToSave
  } catch (err) {
    console.error('_setLoggedInUser frontend failed:', err)
    throw err
  }
}