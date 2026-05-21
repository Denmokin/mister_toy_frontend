import { httpService } from "./http.service"

const USER_URL = 'user/'

export const userService = {
    query,
    getById,
    getEmptyCredentials
}

async function query() {
    try {
        return await httpService.get(USER_URL)
    } catch (err) {
        console.error('userService.query frontend failed:', err)
        throw err
    }
}

async function getById(userId) {
    try {
        return await httpService.get(USER_URL + userId)
    } catch (err) {
        console.error('userService.getById frontend failed:', err)
        throw err
    }
}

function getEmptyCredentials() {
    return {
        username: 'Admin',
        password: 'admin',
        verifiedPassword: '',
        fullname: ''
    }
}