import axios from 'axios'
import { createMessage } from './messages'
import { tokenConfig } from './auth'
import { ADD_ARTOBJECT, GET_ERRORS, GET_ARTOBJECTS, GET_SPACES, GET_SPACE, GET_ARTOBJECT, GET_SCENE, SCENE_LOADING } from './types'

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
      dispatch(createMessage({ addSpace: 'Space Added' }))
    })
    .catch(err => {
        console.log(err)
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

export const getScene = id => (dispatch, getState) => {
    dispatch({ type: SCENE_LOADING })

    axios
    .get(`/api/spaces/${id}`, tokenConfig(getState))
    .then(res => {
        const sceneData = res.data
        const artObjectsIDs = res.data.artobjects
        const artObjectsData = []
        artObjectsIDs.map(artObjectID => 
            axios
            .get(`/api/artobjects/${artObjectID}`, tokenConfig(getState))
            .then(res => {
                artObjectsData.push(res.data)
            })
        )
        dispatch({
            type: GET_SCENE,
            payload: { sceneData, artObjectsData }
        })
    })

    .catch(err => console.log(err))
}