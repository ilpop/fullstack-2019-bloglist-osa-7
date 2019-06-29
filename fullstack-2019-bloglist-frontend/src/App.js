import React, { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import { useField } from './hooks'
import { setUserAction, removeUserAction } from './reducers/UserReducer'
import { initBlogsAction, addBlogAction } from './reducers/BlogReducer'
import { newNotificationAction, removeNotificationAction } from './reducers/NotificationReducer'
import BlogList from './components/BlogList'
import { connect } from 'react-redux'


const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')


  useEffect(() => {
    blogService.getAll().then(blogs => {
      props.initBlogsAction(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUserAction(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    props.newNotificationAction(message, type)
    setTimeout(() => props.removeNotificationAction(), 10000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.setUserAction(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    props.removeUserAction()
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    const addedBlog = await blogService.create(blog)

    newBlogRef.current.toggleVisibility()
    props.addBlogAction(addedBlog)

    notify(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
  }

  if (props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username}/>
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      <BlogList />

    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  addBlogAction,
  removeUserAction,
  setUserAction,
  newNotificationAction,
  removeNotificationAction,
  initBlogsAction
}


export default connect(mapStateToProps, mapDispatchToProps)(App)