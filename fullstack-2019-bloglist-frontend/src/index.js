import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import notificationReducer from './reducers/NotificationReducer'
import blogsReducer from './reducers/BlogReducer'


const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)