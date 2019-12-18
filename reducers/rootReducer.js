// import { combineReducers } from 'redux'


function initState () {
    return {
        misses:0,
        level:1,
        allWords:["BUT", "VERY", "NOT", "IT", "NICE", "KICK", "BIKE", "GO", "BALL", "HE", "BE", "MAKE", "HAPPY", "PLAY", "EAT", "PIZZA",
            "PIG", "CAT", "DOG", "BAT", "BIG", "RED", "YES", "FAT", "SIT", "BIG", "WIG", "MAD", "SAD", "VAN", "GUM", "HEN", "MAP", "EGG", "COW", "CAR", "HAT", "MAN", "CAN", "RAT", "BUS", "BAG", "ANT", "CUT", "LOG", "WIN", "MOM", "DAD", "BUG", "SUN", "NUT", "NET", "HER", "AND", "RAN"],
        selectedWord:"START",
        letterHitBoxes:[],
        corralledLetters:[],
        womped:false,
        wompedLettersY:[],
        spelledWords:[]
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

    case "UPDATE_SELECTED_WORD":
        return {...state, selectedWord:action.payload}   
    case "NUKE_THE_STORE":
        return {...state,
        corralledLetters:[],
        womped:false,
        wompedLettersY:[],} 
    case "ADD_WORD_TO_SPELLED":
        return {...state,spelledWords:(state.spelledWords.concat(action.payload)),
        level:state.level+1}
    case "NUKE_LETTER_HITBOXES":
        return {...state,letterHitBoxes:[]}
    default:
        return state
    }
    
}

export default rootReducer
