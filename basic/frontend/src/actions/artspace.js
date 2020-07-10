import axios from 'axios'
import { createMessage } from './messages'
import { tokenConfig } from './auth'
import { ADD_ARTOBJECT, GET_ERRORS, GET_ARTOBJECTS, GET_SPACES, GET_SPACE, GET_ARTOBJECT, GET_SCENE, SCENE_LOADING, GET_AUTHOR_SPACES, SCENE_LOADED, ARTOBJECT_LOADING } from './types'

export const addArtObject = artObject => (dispatch, getState) => {
    dispatch({
        type: ARTOBJECT_LOADING,
        payload: true
    })
    axios
      .post('/api/artobjects/', artObject, tokenConfig(getState))
      .then(res => {
        dispatch(createMessage({ artObject: 'Art Object Added' }))
          dispatch({
              type: ADD_ARTOBJECT,
              payload: res.data
          })
          dispatch({
            type: ARTOBJECT_LOADING,
            payload: false
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
    .get(`/api/artobjects/${id}/`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_ARTOBJECT,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const deleteArtObject = id => (dispatch, getState) => {
    axios
    .delete(`/api/artobjects/${id}/`, tokenConfig(getState))
    .then(res => {
       console.log('deleted');
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


export const updateSpace = (space, spaceID) => (dispatch, getState) => {
    axios.patch(`/api/spaces/${spaceID}/`, {...space, partial: false}, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({ updateSpace: 'Space Updated' }))
    })
    .catch(error => console.log(error));
}

export const publishSpace = spaceID => (dispatch, getState) => {
    axios.patch(`/api/spaces/${spaceID}/`, {partial: true, publishing: true}, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({ updateSpace: 'Space Published' }))
    })
    .catch(error => console.log(error));
}


export const unpublishSpace = spaceID => (dispatch, getState) => {
    axios.patch(`/api/spaces/${spaceID}/`, {partial: true, publishing: false}, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({ updateSpace: 'Space Unpublished' }))
    })
    .catch(error => console.log(error));
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
    return new Promise((resolve, reject) => {
        axios
        .get(`/api/spaces/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPACE,
                payload: res.data
            })
            resolve(res.data)
        })
        .catch(err => reject(err))
    });
}


export const deleteSpace = id => (dispatch, getState) => {
    axios
    .delete(`/api/spaces/${id}/`, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({ deleteSpace: 'Space deleted' }))
    })
    .catch(err => console.log(err))
}

export const getScene = id => (dispatch, getState) => {
    dispatch({ type: SCENE_LOADING })

    axios
    .get(`/api/spaces/${id}/`, tokenConfig(getState))
    .then(res => {
        const sceneData = res.data
        const artObjectsShadowsIDs = res.data.artobjects
        const artObjectsShadowsData = []
        const artObjectsData = []
        if (artObjectsShadowsIDs.length) {
            artObjectsShadowsIDs.map(artObjectShadowID => {
                axios
                .get(`/api/artobjectsshadows/${artObjectShadowID}/`, tokenConfig(getState))
                .then(res => {
                    console.log(res.data)
                    artObjectsShadowsData.push(res.data)
                    artObjectsData.push(res.data)
                })
                .then(() => {
                    if(artObjectShadowID === artObjectsShadowsIDs[artObjectsShadowsIDs.length - 1]){
                        // console.log(artObjectsData)
                        // console.log(artObjectsShadowsData)
                        dispatch({
                            type: GET_SCENE,
                            payload: { sceneData, artObjectsData, artObjectsShadowsData }
                        })
                    }
                })
            })
        } else {
            dispatch({
                type: GET_SCENE,
                payload: { sceneData, artObjectsData: null, artObjectsShadowsData: null }
            })
        }

        
    })
    // .then(() => {
    //     dispatch({type: SCENE_LOADED})
    // })

    .catch(err => console.log(err))
}




export const resetPassword = email => (dispatch, getState) => {
    axios
    .post(`/api/auth/reset`, email, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({ deleteSpace: 'Space deleted' }))
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