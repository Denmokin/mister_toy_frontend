import { utilService } from './util.service.js'


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
        _id: utilService.makeId('toy'),
        name,
        imgUrl: `https://robohash.org/${encodeURIComponent(name)}?set=set4&size=200x200`,
        price: utilService.getRandomIntInclusive(10, 150),
        labels: utilService.getRandomFromArr(allToyLabels, labelCount),
        createdAt: utilService.getRandomDate(),
        inStock: Math.random() > 0.6,
    }
}

export function generateToys(key, count = 10) {
    var toys = utilService.loadFromStorage(key)
    if (toys && toys.length > 0) return

    toys = Array.from({ length: count }, (_, i) => _generateToy(i))
    utilService.saveToStorage(key, toys)
}