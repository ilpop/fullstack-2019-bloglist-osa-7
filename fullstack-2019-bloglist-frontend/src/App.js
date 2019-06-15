import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import { useField } from './hooks'

const App = ({ store }) => {
  const [username] = useField('text')
  const [password] = useField('password')
  const [user, setUser] = useState(null)


  const initBlogsAction = (blogs) => {
    console.log('INIT', blogs)

    return {
      type: 'INIT_BLOGS',
      data: blogs
    }
  }

  const addBlogAction = (blog) => {
    console.log('ADD', blog)

    return {
      type: 'ADD_BLOG',
      data: blog
    }
  }

  const likeBlogAction = (blog) => {
    return {
      type: 'LIKE_BLOG',
      data: blog
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs => {
      store.dispatch(initBlogsAction(blogs))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {

    const newNotificationAction = (message, type) => {
      return {
        type: 'NEW_NOTIFICATION',
        data: {
          message,
          type
        }
      }
    }

    const removeNotificationAction = () => {
      return {
        type: 'REMOVE_NOTIFICATION',
        data: {
          message: null
        }
      }
    }

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
      setUser(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    const addedBlog = await blogService.create(blog)

    newBlogRef.current.toggleVisibility()
    store.dispatch(addBlogAction(addedBlog))

    notify(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    store.dispatch(likeBlogAction(updatedBlog))
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const title = blog.title
    const author = blog.author
    const ok = window.confirm(`remove blog ${title} by ${author}`)
    if (ok) {
      await blogService.remove(blog)
      const blogs = store.getState().blogs
      store.dispatch(initBlogsAction(blogs.filter(b => b.id !== blog.id)))
      notify(`blog ${title} by ${author} removed!`)
    }
  }

  if (user === null) {
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

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={store.getState().notification} />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {store.getState().blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App