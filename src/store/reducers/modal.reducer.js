
// Modal
export const SET_MODAL = 'SET_MODAL'

const initiateState = {
    isModalOpen: false
}

export function modalReducer(state = initiateState, action = {}) {
    switch (action.type) {

        case SET_MODAL:
            return { ...state, isModalOpen: action.setModal }

        default:
            return state
    }
}