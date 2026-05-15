import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { closeModal } from '../store/actions/modal.actions.js'

export function Modal({ children }) {
    const dialogRef = useRef(null)
    const isOpen = useSelector(storeState => storeState.modalModule.isModalOpen)

    useEffect(() => {
        const dialogNode = dialogRef.current
        if (isOpen) {
            dialogNode.showModal()
        } else {
            dialogNode.close()
        }
    }, [isOpen])

    const handleBackdropClick = (ev) => {
        if (ev.target === dialogRef.current) onClose()
    }

    return (
        <dialog
            ref={dialogRef}
            className="app-modal"
            onCancel={closeModal}
            onClick={handleBackdropClick}
        >
            <button className="btn-close-modal btn danger" onClick={closeModal}>&times;</button>

            <div className="modal-content">
                {children}
            </div>
        </dialog>
    )
}