import { ToyFilter } from "../comps/ToyFilter.jsx"
import { ToyList } from "../comps/ToyList.jsx"
import { AddToyStrip } from "../comps/AddToyStrip.jsx"
import { UserInfo } from "../comps/UserInfo.jsx"

import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"
import { useSelector } from 'react-redux'

import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions.js"
import { login, logout, signup } from "../store/actions/user.actions.js"



// import { toyService } from "../service/toy.service.local.js"
import { toyService } from "../service/toy.service.js"

export function UserPage() {
    const { userId } = useParams()

    const navigate = useNavigate()

    let toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    if (!loggedInUser.isAdmin) {
        toys = toys.filter(toy => toy.creator._id === userId)
    }

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!', err)
            })
    }, [userId])

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

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <main>
            <UserInfo
                toys={toys}
                loggedInUser={loggedInUser}
            />
            <ToyList
                toys={toys}
                onEdit={onEdit}
                onRemove={onRemove}
                onDetails={onDetails}
                loggedInUser={loggedInUser}
            />
        </main>
    )
}