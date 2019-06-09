import React, { useEffect } from 'react'
import { connect } from 'react-redux'

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
import { setUser } from './reducers/UserReducer'


const App = (props) => {

  // form fields
  const usernameField = useField('text')
  const passwordField = useField('password')
  // create blog form fields in react state
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

      props.setUser(user)
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
      props.setUser(user)
      usernameField.reset('')
      passwordField.reset('')
    } catch (exception) {
      props.createErrorNotification(ERROR_MSG_LOGIN)
      setTimeout(() => {
        props.removeNotification()
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    props.setUser(null)
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
      props.setBlogs(props.blogs.concat(response))

      props.createSuccessNotification(
        `a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        props.removeNotification()
      }, 3000)
    }catch (exception) {
      props.createErrorNotification(ERROR_MSG_CREATE_BLOG)
      setTimeout(() => {
        props.removeNotification()
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

      props.setBlogs(props.blogs.map(
        blog => blog.id !== id ? blog : response))
      props.createSuccessNotification(
        `blog ${response.title} was updated`)
      setTimeout(() => {
        props.removeNotification()
      }, 3000)
    } catch (exception) {
      props.createErrorNotification(ERROR_MSG_UPDATE_BLOG)
      setTimeout(() => {
        props.removeNotification()
      }, 3000)
    }
  }

  const removeBlog = async (id) => {
    if (window.confirm(CONFIRMATION_MSG_REMOVE_BLOG)) {
      try {
        const response = await blogService.deleteBlog(id)
        if(response.status === 204){
          const blogs = await blogService.getAll()
          props.setBlogs(blogs)
        }
      } catch (exception) {
        props.createErrorNotification(ERROR_MSG_REMOVE_BLOG)
        setTimeout(() => {
          props.removeNotification()
        }, 3000)
      }
    }
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {props.user === null ?
        <LoginForm
          passwordField={passwordField}
          usernameField={usernameField}
          handleLogin={handleLogin}
        /> :
        <div>
          <p>{props.user.name} logged in</p>
          <LogoutForm handleLogout={handleLogout}/>
          <Toggable buttonLabel={BUTTON_LABEL_ADD_BLOG} ref={saveBlogFormRef}>
            <AddBlogForm
              titleField = {titleField}
              urlField = {urlField}
              authorField ={authorField}
              handleCreate={handleCreate}
            />
          </Toggable>
          <BlogList likeHandler={addLike} deleteHandler={removeBlog}/>
        </div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
  createErrorNotification,
  createSuccessNotification,
  removeNotification,
  setBlogs
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp