import { ToyFilter } from "../comps/ToyFilter.jsx"
import { ToyList } from "../comps/ToyList.jsx"
import { AddToyStrip } from "../comps/AddToyStrip.jsx"

import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useSelector } from 'react-redux'

import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions.js"
import { login, logout, signup } from "../store/actions/user.actions.js"


// import { toyService } from "../service/toy.service.local.js"
import { toyService } from "../service/toy.service.js"

export function ToyIndex() {
    const navigate = useNavigate()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    console.log('toys: ', toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!', err)
            })
    }, [filterBy])

    function onRemove(toyId) {
        removeToy(toyId)
    }

    function onEdit(toyId) {
        toyService.getById(toyId)
            .then(() => navigate(`edit/${toyId}`))
    }

    function onDetails(toyId) {
        toyService.getById(toyId)
            .then(() => navigate(`/${toyId}`))
    }

    return (
        <main>
            <AddToyStrip />
            <ToyFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
            />
            {!isLoading ? <ToyList
                toys={toys}
                onEdit={onEdit}
                onRemove={onRemove}
                onDetails={onDetails}
            /> : <div>Loading...</div>}
        </main>
    )
}