import { authService } from '../../service/auth.service.js'

// Users
export const SET_USER = 'SET_USER'

const initiateState = {
    loggedInUser: authService.getLoggedInUser(),
}

export function userReducer(state = initiateState, action = {}) {
    switch (action.type) {

        case SET_USER:
            return { ...state, loggedInUser: action.user }

        default:
            return state
    }
}