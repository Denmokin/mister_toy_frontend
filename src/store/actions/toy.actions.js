import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY, UNDO_TOY, SET_FILTER_BY, SET_IS_LOADING } from '../reducers/toy.reducer'
import { store } from '../store.js'

// import { toyService } from '../../service/toy.service.local.js'
import { toyService } from '../../service/toy.service.js'

export async function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    }
    catch (err) {
        console.log('toy action - Cannot Load Toys', err)
        throw err
    }
    finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    }
    catch (err) {
        console.log(`toy action - Cannot REmove Toy:${toyId}`, err)
        throw err
    }
}

export async function saveToy(toy) {

    const type = toy._id ? UPDATE_TOY : ADD_TOY

    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
    }
    catch (err) {
        console.log(`toy action - Cannot ${type}`, err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}