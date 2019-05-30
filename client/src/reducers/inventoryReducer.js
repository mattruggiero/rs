import { SET_SEARCH_RESULTS, SET_SELECTED } from '../actions/types';

const initialState = {
    searchInput: null,
    haveData:false,
    resultsToDisplay:null,
    pageNumber:1,
    selected:null,
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_SEARCH_RESULTS:
            return({
                ...state,
                searchInput: action.searchInput,
                resultsToDisplay: [...action.payload],
                haveData:true,
                pageNumber:action.pageNumber
            })
        case SET_SELECTED:
            return({
                ...state,
                selected:action.payload
            })
    default:
        return state;
    }
}