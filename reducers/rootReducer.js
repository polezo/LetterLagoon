// import { combineReducers } from 'redux'


function initState () {
    return {
        level:0,
        misses:0,
        allWords:["but", "very", "not", "it", "nice", "kick", "bike", "go", "ball", "he", "be", "make", "happy", "play", "eat", "pizza",
            "pig", "cat", "dog", "bat", "big", "red", "yes", "fat", "sit", "big", "wig", "mad", "sad", "van", "gum", "hen", "map", "egg", "cow", "car", "hat", "man", "can", "rat", "bus", "bag", "ant", "cut", "log", "win", "mom", "dad", "bug", "sun", "nut", "net", "her", "and", "ran"],
        selectedWord:"GIRAFFE",
        letterHitBoxes:[],
        corralledLetters:[],
        womped:false,
        wompedLettersY:[],
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
    case "ADD_WOMPED_LETTER_Y":
        return {...state, wompedLettersY:state.wompedLettersY.concat(action.payload)}
    default:
        return state
    }
    
}

export default rootReducer
