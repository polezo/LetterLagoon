// import { combineReducers } from 'redux'


function initState () {
    return {
        level:0,
        misses:0,
        allWords:[],
        selectedWord:"START",
        letterHitBoxes:[],
        corralledLetters:[]
    }
}

function rootReducer(state=initState(),action){
    switch (action.type) {
    case "ADD_LETTER_HITBOX":
        if (state.letterHitBoxes.find(hitbox=>action.payload.pageX === hitbox.pageX && hitbox.pageY === action.payload.pageY)){
        return state
    } else {
        return {...state, letterHitBoxes: [...state.letterHitBoxes,action.payload]}}
    case "ADD_CORRALLED_LETTER":
        return {...state, corralledLetters:state.corralledLetters.concat(action.payload)}
    default:
        return state
    }
    
}

export default rootReducer
