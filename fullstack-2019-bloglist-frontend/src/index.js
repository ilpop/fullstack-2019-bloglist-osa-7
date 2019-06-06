import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import blogService from './services/blogs'
import { setBlogs } from './reducers/BlogReducer'


blogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)


const renderApp = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}



renderApp()
store.subscribe(renderApp)