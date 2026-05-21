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

async function query(filterBy = {}) {
    try {
        return await httpService.get(BASE_URL, filterBy)
    } catch (err) {
        console.error('toyService.query frontend failed:', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        return await httpService.get(BASE_URL + toyId)
    } catch (err) {
        console.error('toyService.getById frontend failed:', err)
        throw err
    }
}

async function save(toy) {
    try {
        if (toy._id) {
            return await httpService.put(BASE_URL + toy._id, toy)
        } else {
            return await httpService.post(BASE_URL, toy)
        }
    } catch (err) {
        console.error('toyService.save frontend failed:', err)
        throw err
    }
}

async function remove(toyId) {
    try {
        return await httpService.delete(BASE_URL + toyId)
    } catch (err) {
        console.error('toyService.remove frontend failed:', err)
        throw err
    }
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
    return { txt: '', labels: [], inStock: '', maxPrice: '' }
}