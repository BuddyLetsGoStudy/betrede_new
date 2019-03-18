import { ADD_ARTOBJECT, GET_ARTOBJECTS } from '../actions/types.js'

const initialState = {
    artObjects: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case ADD_ARTOBJECT:
            return{
                ...state,
                artObjects: action.payload
            }
        case GET_ARTOBJECTS:
            console.log(action.payload)
            return {
                ...state,
                artObjects: action.payload
            }
        default:
            return state
    }
}
