import { storageService } from './async-storage.service.js'
import { generateToys } from './toy-generator.service.js'
import { utilService } from './util.service.js'

const TOY_STORAGE_KEY = 'toyDB'
generateToys(TOY_STORAGE_KEY, 15)


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilters,
}


function query(filterBy = {}) {
    return storageService.query(TOY_STORAGE_KEY)
        .then(toys => {

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }


            if (filterBy.inStock) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }

            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity

            toys = toys.filter(toy => toy.price < filterBy.maxPrice)
            return toys
        })
        .catch(err => console.log('Filter Has Dead', err))
}

function getById(toyId) {
    return storageService.get(TOY_STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_STORAGE_KEY, toy)
    }
    else {
        toy.createdAt = utilService.getRandomDate()
        return storageService.post(TOY_STORAGE_KEY, toy)
    }
}

function remove(toyId) {
    return storageService.remove(TOY_STORAGE_KEY, toyId)
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




