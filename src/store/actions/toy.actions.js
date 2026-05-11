import { toyService } from '../../service/toy.service.local'
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY, UNDO_TOY, SET_FILTER_BY, SET_IS_LOADING } from '../reducers/toy.reducer'
import { store } from '../store.js'


export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action - Cannot Load Toys', err)
            throw err
        })
        .finally(store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}


export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log(`toy action - Cannot REmove Toy:${toyId}`, err)
            throw err
        })
}

export function saveToy(toy) {

    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy)
        .then((savedToy) => {
            store.dispatch({ type, toy: savedToy })
            return saveToy
        })
        .catch(err => {
            console.log(`toy action - Cannot ${type}`, err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}