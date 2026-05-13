import { httpService } from "./http.service"

const BASE_URL = '/api/user/'

export const userService = {
    query,
    getById,
    getEmptyCredentials
}

function query() {
    return httpService.get(BASE_URL)
        .then(res => res.data)
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
        .then(res => res.data)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}