import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilters,
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    }
    else {
        return httpService.post(BASE_URL, toy)
    }
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: '',
        labels: [],
        createdAt: '',
        inStock: '',
    }
}

function getDefaultFilters() {
    return { txt: '', labels: [], inStock: '', maxPrice: '', }
}




