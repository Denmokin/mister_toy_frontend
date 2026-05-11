import { useEffect, useState } from "react"

export function useConfirmTabClose() {

    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        if (!hasChanges) return

        function confirmExit(ev) {
            ev.returnValue = true
        }

        window.addEventListener('beforeunload', confirmExit)

        return () => {
            window.removeEventListener('beforeunload', confirmExit)
        }

    }, [hasChanges])

    return setHasChanges
}