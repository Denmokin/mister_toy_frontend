import { ToyFilter } from "../comps/ToyFilter.jsx"
import { ToyList } from "../comps/ToyList.jsx"
import { AddToyStrip } from "../comps/AddToyStrip.jsx"

import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions.js"
import { login, logout, signup } from "../store/actions/user.actions.js"


// import { toyService } from "../service/toy.service.local.js"
import { toyService } from "../service/toy.service.js"
import { store } from "../store/store.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"

export function ToyIndex() {
    const navigate = useNavigate()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const toyLabels = useSelector(storeState => storeState.toyModule.toyLabels)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const dispatch = useDispatch()


    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys!', err)
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

    function onClearFilter() {
        dispatch({ type: SET_FILTER_BY, filterBy: toyService.getDefaultFilters() })
    }

    return (
        <main>
            {loggedInUser && <AddToyStrip />}
            <ToyFilter
                filterBy={filterBy}
                toyLabels={toyLabels}
                setFilterBy={setFilterBy}
                onClearFilter={onClearFilter}
            />
            {!isLoading ? <ToyList
                toys={toys}
                onEdit={onEdit}
                onRemove={onRemove}
                onDetails={onDetails}
                loggedInUser={loggedInUser}
            /> : <div>Loading...</div>}
        </main>
    )
}