import { useParams } from "react-router"



export function ToyDetails() {
    const params = useParams()
    return <p>{params.toyId}</p>
}