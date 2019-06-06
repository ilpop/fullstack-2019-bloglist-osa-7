
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/BlogReducer'
import notificationReducer from './reducers/NotificationReducer'
import userReducer from './reducers/UserReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
})

const store = createStore(reducer)

export default store