import { useParams } from "react-router"

export function ToyEdit() {
    const params = useParams()
    return <p>Edit {params.toyId}</p>
}