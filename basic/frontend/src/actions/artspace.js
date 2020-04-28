import axios from 'axios'
import { createMessage } from './messages'
import { tokenConfig } from './auth'
import { ADD_ARTOBJECT, GET_ERRORS, GET_ARTOBJECTS, GET_SPACES, GET_SPACE, GET_ARTOBJECT, GET_SCENE, SCENE_LOADING, GET_AUTHOR_SPACES } from './types'

export const addArtObject = artObject => (dispatch, getState) => {
    axios
      .post('/api/artobjects/', artObject, tokenConfig(getState))
      .then(res => {
        dispatch(createMessage({ artObject: 'Art Object Added' }))
          dispatch({
              type: ADD_ARTOBJECT,
              payload: res.data
          })
      })
      .catch(err => {
          const errors = {
              msg: err.response.data,
              status: err.response.status
          }
          dispatch({
              type: GET_ERRORS,
              payload: errors
          })
      })
}

export const getArtObjects = () => (dispatch, getState) => {
    if (getState().auth.isAuthenticated){
        const user_id = getState().auth.user.id
        axios
        .get(`/api/artobjects/?author=${user_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ARTOBJECTS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
    } 
}

export const getArtObject = id => (dispatch, getState) => {
    axios
    .get(`/api/artobjects/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_ARTOBJECT,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const addSpace = space => (dispatch, getState) => {
    axios
    .post('/api/spaces/', space, tokenConfig(getState))
    .then(res => {
        console.log(space)
        console.log(res.data)

      dispatch(createMessage({ addSpace: 'Space Added' }))
    })
    .catch(err => {
        console.log(err.response.data)
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}


export const getSpaces = () => (dispatch, getState) => {
    axios
    .get(`/api/spaces/`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_SPACES,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const getAuthorSpaces = () => (dispatch, getState) => {
    if (getState().auth.isAuthenticated){
        const user_id = getState().auth.user.id
        axios
        .get(`/api/spaces/?author=${user_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_AUTHOR_SPACES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
    } 
}


export const getSpace = id => (dispatch, getState) => {
    axios
    .get(`/api/spaces/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_SPACE,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const deleteSpace = id => (dispatch, getState) => {
    axios
    .delete(`/api/spaces/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({ deleteSpace: 'Space deleted' }))
    })
    .catch(err => console.log(err))
}

export const getScene = id => (dispatch, getState) => {
    dispatch({ type: SCENE_LOADING })

    axios
    .get(`/api/spaces/${id}`, tokenConfig(getState))
    .then(res => {
        const sceneData = res.data
        const artObjectsShadowsIDs = res.data.artobjects
        const artObjectsShadowsData = []
        const artObjectsData = []
        artObjectsShadowsIDs.map(artObjectShadowID => 
            axios
            .get(`/api/artobjectsshadows/${artObjectShadowID}`, tokenConfig(getState))
            .then(res => {
                artObjectsShadowsData.push(res.data)
                let artObjectID = res.data.artobject
                axios
                .get(`/api/artobjects/${artObjectID}`, tokenConfig(getState))
                .then(res => {
                    artObjectsData.push(res.data)
                })
            })
            .then(() => {
                if(artObjectShadowID === artObjectsShadowsIDs[artObjectsShadowsIDs.length - 1]){
                    console.log(artObjectsData)
                    console.log(artObjectsShadowsData)
                    dispatch({
                        type: GET_SCENE,
                        payload: { sceneData, artObjectsData, artObjectsShadowsData }
                    })
                }
            })
        )
        
    })

    .catch(err => console.log(err))
}




// export const getScene = id => (dispatch, getState) => {
//     dispatch({ type: SCENE_LOADING })

//     axios
//     .get(`/api/spaces/${id}`, tokenConfig(getState))
//     .then(res => {
//         const sceneData = res.data
//         const artObjectsIDs = res.data.artobjects
//         const artObjectsData = []
//         artObjectsIDs.map(artObjectID => 
//             axios
//             .get(`/api/artobjects/${artObjectID}`, tokenConfig(getState))
//             .then(res => {
//                 artObjectsData.push(res.data)
//             })
//             .then(() => {
//                 if(artObjectID === artObjectsIDs[artObjectsIDs.length - 1]){
//                     dispatch({
//                         type: GET_SCENE,
//                         payload: { sceneData, artObjectsData }
//                     })
//                 }
//             })
//         )
        
//     })

//     .catch(err => console.log(err))
// }