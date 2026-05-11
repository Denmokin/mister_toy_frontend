import { toyService } from "../../service/toy.service.local";


// Toys

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const UNDO_TOY = 'UNDO_TOY'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'


const initiateState = {
    toys: [],
    filterBy: toyService.getDefaultFilters(),
    isLoading: false,
    backupToys: [],
}

export function toyReducer(state = initiateState, action = {}) {
    switch (action.type) {

        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                backupToys: [...state.toys]
            }

        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }

        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id === action.toyId ? action.toy : toy),
                backupToys: [...state.toys]
            }

        case UNDO_TOY:
            return { ...state.backupToys }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: {
                    ...state.filterBy,
                    ...action.filterBy
                }
            }

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