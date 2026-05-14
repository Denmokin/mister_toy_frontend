import { SET_USER } from '../reducers/user.reducer.js'
import { store } from '../store.js'

import { userService } from '../../service/user.service.js'
import { authService } from '../../service/auth.service.js'

export function login(credentials) {
    return authService.login(credentials)
        .then(user => store.dispatch({ type: SET_USER, user }))
        .catch(err => {
            console.log('user action -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return authService.signup(credentials)
        .then(user => store.dispatch({ type: SET_USER, user }))
        .catch(err => {
            console.log('user action -> Cannot signup', err)
            throw err
        })

}

export function logout() {
    return authService.logout()
        .then(() => store.dispatch({ type: SET_USER, user: null }))
        .catch(err => {
            console.log('user action -> Cannot logout', err)
            throw err
        })

}