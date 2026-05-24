// Modal
export const SET_MODAL = 'SET_MODAL'

const initialState = {
    isModalOpen: false
}

export function modalReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_MODAL:
            return { ...state, isModalOpen: action.isModalOpen }

        default:
            return state
    }
}