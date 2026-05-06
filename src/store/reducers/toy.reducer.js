import { toyService } from "../../service/toy.service.local";


// Toys

const SET_TOYS = 'SET_TOYS'
const REMOVE_TOY = 'REMOVE_TOY'
const ADD_TOY = 'ADD_TOY'
const UPDATE_TOY = 'UPDATE_TOY'
const UNDO_TOY = 'UNDO_TOY'

const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_FILTER_BY = 'SET_FILTER_BY'


const initiateState = {
    toys: [],
    filterBy: toyService.getDefaultFilters(),
    isLoading: false,
    backupToys: toys,
}

export function toyReducer(state = initiateState, action = {}) {
    switch (action.type) {
        //Toys 
        case SET_TOYS:
            return state = { ...state, toys: action.toys }

        case REMOVE_TOY:
            return {
                ...state,
                toys: toys.filter(toy => toy._id !== action.toyId),
                backupToys: [...state.toys]
            }

        case ADD_TOY:
            return state = {
                ...state,
                toys: [...toys, action.toy]
            }

        case UPDATE_TOY:
            return state = {
                ...state,
                toys: toys.filter(toy => toy.id === action.toyId ? action.toy : toy),
                backupToys: [...state.toys]
            }

        case UNDO_TOY:
            return state = { ...state.backupToys }

        default:
            return state
    }

    function _backUpToy(state, action) {
        return {
            ...state,
            toys: toys.map(toy => {
                toy._id === action.toyId ? { ...toy, backupToy: toy } : toy
            })
        }
    }
}