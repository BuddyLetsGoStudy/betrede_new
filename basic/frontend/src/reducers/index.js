import { combineReducers } from 'redux'
import auth from './auth'
import errors from './errors'
import messages from './messages'
import artspace from './artspace'


export default combineReducers({
    artspace,
    errors,
    messages,
    auth
})
