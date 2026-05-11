import { ToyFilter } from "../comps/ToyFilter.jsx"
import { ToyList } from "../comps/ToyList.jsx"
import { toyService } from "../service/toy.service.local.js"
import { AddToyStrip } from "../comps/AddToyStrip.jsx"

import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { loadToys, saveToy, removeToy, setFilterBy } from "../store/actions/toy.actions.js"


export function ToyIndex() {
    const navigate = useNavigate()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load cars!')
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