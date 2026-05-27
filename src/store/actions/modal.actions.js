import { SET_MODAL } from '../reducers/modal.reducer.js'

import { store } from '../store.js'

function setModal(isModalOpen) {
    return store.dispatch({ type: SET_MODAL, isModalOpen })
}

export function openModal() {
    return setModal(true)
}

export function closeModal() {
    return setModal(false)
}