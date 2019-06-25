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


const App = ({ store }) => {
  const [username] = useField('text')
  const [password] = useField('password')


  useEffect(() => {
    blogService.getAll().then(blogs => {
      store.dispatch(initBlogsAction(blogs))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      store.dispatch(setUserAction(user))
      blogService.setToken(user.token)
    }
  }, [])

  // TODO mvoe to notification reducer
  const notify = (message, type = 'success') => {
    store.dispatch(newNotificationAction(message, type))
    setTimeout(() => store.dispatch(removeNotificationAction()), 10000)
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
      store.dispatch(setUserAction(user))
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    store.dispatch(removeUserAction())
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    const addedBlog = await blogService.create(blog)

    newBlogRef.current.toggleVisibility()
    store.dispatch(addBlogAction(addedBlog))

    notify(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
  }

  if (store.getState().user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification notification={store.getState().notification} />

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

      <Notification notification={store.getState().notification} />

      <p>{store.getState().user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      <BlogList store={store}/>

    </div>
  )
}

export default App