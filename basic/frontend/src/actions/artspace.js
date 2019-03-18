import axios from 'axios'
import { createMessage } from './messages'
import { tokenConfig } from './auth'
import { ADD_ARTOBJECT, GET_ERRORS, GET_ARTOBJECTS } from './types'

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
    } else {
        dispatch({
            type: GET_ARTOBJECTS,
            payload: []
        })
    }
   
    
}
