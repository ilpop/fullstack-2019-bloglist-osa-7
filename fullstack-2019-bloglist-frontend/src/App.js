import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlogForm from './components/SaveBlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogList from './components/BlogList/BlogList'
import Toggable from './components/Toggable'
import  { useField } from './hooks'
import { removeNotification,
  createErrorNotification,
  createSuccessNotification } from './reducers/NotificationReducer'
import { setBlogs } from './reducers/BlogReducer'


const App = ({ store }) => {
  // app state
  const [user, setUser] = useState(null)
  // form fields
  const usernameField = useField('text')
  const passwordField = useField('password')
  const titleField = useField('text')
  const urlField = useField('text')
  const authorField = useField('text')
  // misc variables
  const LOCAL_STORAGE_USER_KEY = 'loggedBlogAppUser'
  // texts
  const ERROR_MSG_LOGIN = 'käyttäjätunnus tai salasana virheellinen'
  const ERROR_MSG_CREATE_BLOG = 'failed to create blog link'
  const ERROR_MSG_UPDATE_BLOG = 'failed to update blog link'
  const ERROR_MSG_REMOVE_BLOG = 'failed to remove blog'
  const BUTTON_LABEL_ADD_BLOG = 'add blog'
  const CONFIRMATION_MSG_REMOVE_BLOG = 'Do you really want to remove blog?'


  // ref haxx
  // https://reactjs.org/docs/refs-and-the-dom.html
  const saveBlogFormRef = React.createRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) // executed only on first render []

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = usernameField.value
    const password = passwordField.value

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        LOCAL_STORAGE_USER_KEY, JSON.stringify(user)
      )
      setUser(user)
      usernameField.reset('')
      passwordField.reset('')
    } catch (exception) {
      store.dispatch(createErrorNotification(ERROR_MSG_LOGIN))
      setTimeout(() => {
        store.dispatch(removeNotification())
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    // ref haxx
    // https://reactjs.org/docs/refs-and-the-dom.html
    saveBlogFormRef.current.toggleVisibility()

    try {
      const response = await blogService.create({
        title: titleField.value,
        url: urlField.value,
        author: authorField.value,
        likes: 0
      })
      titleField.reset('')
      urlField.reset('')
      authorField.reset('')
      store.dispatch(setBlogs(store.getState().blogs.concat(response)))

      store.dispatch(createSuccessNotification(
        `a new blog ${response.title} by ${response.author} added`))
      setTimeout(() => {
        store.dispatch(removeNotification())
      }, 3000)
    }catch (exception) {
      store.dispatch(createErrorNotification(ERROR_MSG_CREATE_BLOG))
      setTimeout(() => {
        store.dispatch(removeNotification())
      }, 3000)
    }
  }


  const addLike = async (blog) => {
    const id = blog.id

    try {
      const response = await blogService.update({
        id: blog.id,
        title: blog.title,
        url: blog.url,
        author: blog.author,
        user: blog.user,
        likes: blog.likes + 1
      })

      store.dispatch(setBlogs(store.getState().blogs.map(
        blog => blog.id !== id ? blog : response)))
      store.dispatch(createSuccessNotification(
        `blog ${response.title} was updated`))
      setTimeout(() => {
        store.dispatch(removeNotification())
      }, 3000)
    } catch (exception) {
      store.dispatch(createErrorNotification(ERROR_MSG_UPDATE_BLOG))
      setTimeout(() => {
        store.dispatch(removeNotification())
      }, 3000)
    }
  }

  const removeBlog = async (id) => {
    if (window.confirm(CONFIRMATION_MSG_REMOVE_BLOG)) {
      try {
        const response = await blogService.deleteBlog(id)
        if(response.status === 204){
          const blogs = await blogService.getAll()
          store.dispatch(setBlogs(blogs))
        }
      } catch (exception) {
        store.dispatch(createErrorNotification(ERROR_MSG_REMOVE_BLOG))
        setTimeout(() => {
          store.dispatch(removeNotification())
        }, 3000)
      }
    }
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification notification={store.getState().notification} />
      {user === null ?
        <LoginForm
          passwordField={passwordField}
          usernameField={usernameField}
          handleLogin={handleLogin}
        /> :
        <div>
          <p>{user.name} logged in</p>
          <LogoutForm handleLogout={handleLogout}/>
          <Toggable buttonLabel={BUTTON_LABEL_ADD_BLOG} ref={saveBlogFormRef}>
            <AddBlogForm
              titleField = {titleField}
              urlField = {urlField}
              authorField ={authorField}
              handleCreate={handleCreate}
            />
          </Toggable>
          <BlogList blogs={store.getState().blogs} likeHandler={addLike} deleteHandler={removeBlog} user={user}/>
        </div>}
    </div>
  )
}

export default App