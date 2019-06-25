import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { initBlogsAction, likeBlogAction } from '../reducers/BlogReducer'
import { newNotificationAction, removeNotificationAction } from '../reducers/NotificationReducer'


const BlogList = ({ store }) => {

  const blogs = store.getState().blogs

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const notify = (message, type = 'success') => {
    store.dispatch(newNotificationAction(message, type))
    setTimeout(() => store.dispatch(removeNotificationAction()), 10000)
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


  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={store.getState().user}
        />
      )}
    </div>
  )
}

export default BlogList