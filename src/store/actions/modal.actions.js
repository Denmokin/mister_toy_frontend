import { SET_MODAL } from '../reducers/modal.reducer.js'

import { store } from '../store.js'

export function closeModal() {
    return store.dispatch({ type: SET_MODAL, setModal: false })
}
export function openModal() {
    return store.dispatch({ type: SET_MODAL, setModal: true })
}