import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const TOY_STORAGE_KEY = 'toyDB'
_generateToys(15)

console.log(JSON.stringify(query, null, 2))


const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilters,
}


function query(filterBy = {}) {
    storageService.query(TOY_STORAGE_KEY)
        .then(toys => {

            if (filterBy.txt)
                toys = toys.filter(toy => {
                    const regExp = new RegExp(i, filterBy.txt)
                    return regExp.test(toy.name)
                })

            if (filterBy.labels.length)
                toys = toys.filter(toy => {
                    filterBy.labels.some(label => toy.labels.includes(label))
                })

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
    if (toy._id) return storageService.put(TOY_STORAGE_KEY, toy)

    return storageService.post(TOY_STORAGE_KEY, toy)
        .then(toy => toy.createdAt = utilService.getRandomDate())
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

const toyNames = [
    'Talking Doll', 'Remote Control Car', 'Building Blocks Set',
    'Stuffed Teddy Bear', 'Wooden Train Set', 'Bubble Machine',
    'Dinosaur Figurine', 'Magnetic Drawing Board', 'Foam Dart Blaster',
    'Puzzle Box', 'Mini Basketball Hoop', 'Glow in the Dark Stars',
    'Play Kitchen Set', 'Action Hero Figure', 'Musical Xylophone',
]

const allToyLabels = [
    'Doll', 'Battery Powered', 'Baby', 'Outdoor', 'Educational',
    'Wooden', 'Electronic', 'Puzzle', 'Action Figure', 'Creative',
    'Musical', 'STEM', 'Pretend Play', 'Ages 3+', 'Ages 6+', 'Ages 10+',
]

function _generateToy(idx) {

    const name = toyNames[idx % toyNames.length]
    const labelCount = Math.floor(Math.random() * 3) + 1 // 1–3 labels

    return {
        _id: utilService.makeId(idx),
        name,
        imgUrl: `https://robohash.org/${encodeURIComponent(name)}?set=set4&size=200x200`,
        price: utilService.getRandomIntInclusive(10, 150),
        labels: utilService.getRandom(allToyLabels, labelCount),
        createdAt: utilService.getRandomDate(),
        inStock: Math.random() > 0.2,
    }
}

function _generateToys(count = 10) {
    var toys = storageService.query(TOY_STORAGE_KEY)
    if (toys.length || toys) return

    toys = Array.from({ length: count }, (_, i) => _generateToy(i))

    return utilService.saveToStorage(TOY_STORAGE_KEY, toys)
}

