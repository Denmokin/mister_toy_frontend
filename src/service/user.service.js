import { httpService } from "./http.service"

const SESSION_STORAGE_KEY = 'loggedInUser'
const USER_URL = 'user/'

export const userService = {
    query,
    getById,
    getEmptyCredentials
}

function query() {
    return httpService.get(USER_URL)
        .then(res => res.data)
}

function getById(userId) {
    return httpService.get(USER_URL + userId)
        .then(res => res.data)
}

function getEmptyCredentials() {
    return {
        username: 'Admin',
        password: 'admin',
        verifiedPassword: '',
        fullname: ''
    }
}