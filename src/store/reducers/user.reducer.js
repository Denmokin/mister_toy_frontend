import { authService } from '../../service/auth.service.js'

// Users
export const SET_USER = 'SET_USER'

const initiateState = {
    loggedinUser: authService.getloggedinUser(),
}

export function userReducer(state = initiateState, action = {}) {
    switch (action.type) {

        case SET_USER:
            return { ...state, loggedinUser: action.user }

        default:
            return state
    }
}