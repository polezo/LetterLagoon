// import { combineReducers } from 'redux'


function initState () {
    return {
        level:0,
        misses:0,
        allWords:[],
        selectedWord:"JULIA",
        letterHitBoxes:[],
        corralledLetters:[],
        womped:false
    }
}

function rootReducer(state=initState(),action){
    switch (action.type) {
    case "ADD_LETTER_HITBOX":
        if (state.letterHitBoxes.find(hitbox=>action.payload.pageX === hitbox.pageX && hitbox.pageY === action.payload.pageY)){
        return state
        }
        return {...state, letterHitBoxes: [...state.letterHitBoxes,action.payload]}
    
        case "REMOVE_LETTER_HITBOX":
        let arr = [...state.letterHitBoxes]
        return {...state, letterHitBoxes: arr.filter((hitbox)=>action.payload!==hitbox.id)}
        
    case "ADD_CORRALLED_LETTER":
        if (state.corralledLetters.find(letter=>action.payload.hitLetterBox===letter.hitLetterBox)){
            return state}
        return {...state, corralledLetters:state.corralledLetters.concat(action.payload)}
    case "TOGGLE_WOMPED":
        return {...state, womped:!state.womped}
    default:
        return state
    }
    
}

export default rootReducer
