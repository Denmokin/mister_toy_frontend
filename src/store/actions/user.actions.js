import { SET_USER } from '../reducers/user.reducer.js'
import { store } from '../store.js'

import { authService } from '../../service/auth.service.js'

export async function login(credentials) {
    try {
        const user = await authService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    }
    catch (err) {
        console.log('user action -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await authService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    }
    catch (err) {
        console.log('user action -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        const user = await authService.logout()
        store.dispatch({ type: SET_USER, user: null })
        return user
    }
    catch (err) {
        console.log('user action -> Cannot logout', err)
        throw err
    }
}