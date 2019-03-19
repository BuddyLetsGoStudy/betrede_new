import { ADD_ARTOBJECT, GET_ARTOBJECTS, GET_SPACES, GET_SPACE, GET_ARTOBJECT, GET_SCENE, SCENE_LOADING } from '../actions/types.js'

const initialState = {
    artObjects: [],
    spaces: [],
    sceneIsLoading: true
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
        case GET_ARTOBJECT:
            console.log(action.payload)
            return {
                ...state,
                artObjects: action.payload
            }
        case GET_SPACES:
            return {
                ...state,
                spaces: action.payload
            }
        case GET_SPACE:
            return {
                ...state,
                space: action.payload
            }
        case SCENE_LOADING:
            return {
                ...state,
                sceneIsLoading: true
            }
        case GET_SCENE:
            return {
                ...state,
                space: action.payload.sceneData,
                artObjects: action.payload.artObjectsData,
                sceneIsLoading: false
            }
        default:
            return state
    }
}
