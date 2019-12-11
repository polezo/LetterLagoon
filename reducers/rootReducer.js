// import { combineReducers } from 'redux'


function initState () {
    return {
        level:0,
        misses:0,
        allWords:[],
        selectedWord:"START"
    }
}

function rootReducer(state=initState(),action){
    return state
}

export default rootReducer
