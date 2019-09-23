import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import picture from './picture'
import category from './category'
import author from './author'
import folder from './folder'

const reducer = combineReducers({user, picture, category, author, folder})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './picture'
export * from './category'
export * from './author'
export * from './folder'
