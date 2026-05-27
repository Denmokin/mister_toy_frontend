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
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadToys({ creatorId: userId })
            .catch(err => console.log('Cannot load toys!', err))
    }, [userId])

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

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <main>
            <UserInfo
                toys={toys}
                loggedinUser={loggedinUser}
            />
            <ToyList
                toys={toys}
                onEdit={onEdit}
                onRemove={onRemove}
                onDetails={onDetails}
                loggedinUser={loggedinUser}
            />
        </main>
    )
}