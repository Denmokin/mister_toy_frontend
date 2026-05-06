import { useNavigate } from "react-router";
import { ToyFilter } from "../comps/ToyFilter.jsx";
import { ToyList } from "../comps/ToyList.jsx";
import { toyService } from "../service/toy.service.local.js";
import { useEffect, useState } from "react";


export function ToyIndex() {

    const [toys, setToys] = useState(null)
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilters())

    useEffect(() => {
        toyService.query(filterBy)
            .then(toys => setToys(toys))
    }, [toys])


    const navigate = useNavigate()


    function onRemove(toyId) {
        toyService.remove(toyId)
    }

    function onEdit(toyId) {
        toyService.getById(toyId)
            .then(navigate(`/edit/${toyId}`))
    }

    function onDetails(toyId) {
        toyService.getById(toyId)
            .then(navigate(`/${toyId}`))
    }

    if (!toys) return <p>Loading...</p>
    return (
        <main>
            <ToyFilter />
            <ToyList
                toys={toys}
                onEdit={onEdit}
                onRemove={onRemove}
                onDetails={onDetails}
            />
        </main>

    )
}