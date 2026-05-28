import { ToyFilter } from "../comps/ToyFilter.jsx"
import { ToyList } from "../comps/ToyList.jsx"
import { AddToyStrip } from "../comps/AddToyStrip.jsx"

import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions.js"
import { toyService } from "../service/toy.service.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"
import { PaginationStrip } from "../comps/PaginationStrip.jsx"

export function ToyIndex() {
    const navigate = useNavigate()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const toyLabels = useSelector(storeState => storeState.toyModule.toyLabels)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const totalPages = useSelector(storeState => storeState.toyModule.totalPages)

    const dispatch = useDispatch()

    useEffect(() => {
        loadToys()
            .catch(err => console.log('Cannot load toys!', err))
    }, [filterBy])

    function onChangePage(diff) {
        let nextPageIdx = filterBy.pageIdx + diff
        if (nextPageIdx < 0 || nextPageIdx >= totalPages) return
        setFilterBy({ pageIdx: nextPageIdx })
    }


    async function onRemove(toyId) {
        try {
            await removeToy(toyId)
        } catch (err) {
            console.log('Cannot remove toy!', err)
        }
    }

    async function onEdit(toyId) {
        try {
            await toyService.getById(toyId)
            navigate(`edit/${toyId}`)
        } catch (err) {
            console.log('Cannot edit toy!', err)
        }
    }

    async function onDetails(toyId) {
        try {
            await toyService.getById(toyId)
            navigate(`/${toyId}`)
        } catch (err) {
            console.log('Cannot get toy details!', err)
        }
    }

    function onClearFilter() {
        dispatch({ type: SET_FILTER_BY, filterBy: toyService.getDefaultFilters() })
    }

    return (
        <main>
            {loggedinUser?.isAdmin && <AddToyStrip />}
            <ToyFilter
                filterBy={filterBy}
                toyLabels={toyLabels}
                setFilterBy={setFilterBy}
                onClearFilter={onClearFilter}
            />
            {!isLoading
                ? <ToyList
                    toys={toys}
                    onEdit={onEdit}
                    onRemove={onRemove}
                    onDetails={onDetails}
                    loggedinUser={loggedinUser}
                />
                : <div>Loading...</div>
            }
            <PaginationStrip
                filterBy={filterBy}
                onChangePage={onChangePage}
                totalPages={totalPages} />
        </main>

    )
}