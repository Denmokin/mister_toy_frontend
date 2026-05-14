import { useEffect, useRef } from 'react'

export function Modal({ isOpen, onClose, children }) {
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialogNode = dialogRef.current

        if (isOpen) {
            dialogNode.showModal()
        } else {
            dialogNode.close()
        }
    }, [isOpen])

    return (
        <dialog ref={dialogRef} onCancel={onClose}>
            {children}
            <button onClick={onClose}>Close</button>
        </dialog>
    )
}