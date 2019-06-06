import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import AddBlogForm from './components/SaveBlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogList from './components/BlogList/BlogList'
import Toggable from './components/Toggable'
import  { useField } from './hooks'


const App = () => {
  // app state
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])  // executed only on first render []

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
      setErrorMessage(ERROR_MSG_LOGIN)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      setBlogs(blogs.concat(response))
      setSuccessMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }catch (exception) {
      setErrorMessage(ERROR_MSG_CREATE_BLOG)
      setTimeout(() => {
        setErrorMessage(null)
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

      setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
      // setSuccessMessage(`blog ${response.title} was updated`)
      // setTimeout(() => {
      //   setSuccessMessage(null)
      // }, 3000)
    } catch (exception) {
      setErrorMessage(ERROR_MSG_UPDATE_BLOG)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const remoteBlog = async (id) => {
    if (window.confirm(CONFIRMATION_MSG_REMOVE_BLOG)) {
      try {
        const response = await blogService.deleteBlog(id)
        if(response.status === 204){
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        }
      } catch (exception) {
        setErrorMessage(ERROR_MSG_REMOVE_BLOG)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <h1>blogs</h1>
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
          <BlogList blogs={blogs} likeHandler={addLike} deleteHandler={remoteBlog} user={user}/>
        </div>}
    </div>
  )
}

export default App