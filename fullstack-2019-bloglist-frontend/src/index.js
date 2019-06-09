import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import blogService from './services/blogs'
import { setBlogs } from './reducers/BlogReducer'


blogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))