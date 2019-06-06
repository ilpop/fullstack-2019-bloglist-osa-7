
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/BlogReducer'
import notificationReducer from './reducers/NotificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

export default store