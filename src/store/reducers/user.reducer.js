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

    function _backUpToy(state, action) {
        return {
            ...state,
            toys: toys.map(toy => {
                toy._id === action.toyId ? { ...toy, backupToy: toy } : toy
            })
        }
    }
}