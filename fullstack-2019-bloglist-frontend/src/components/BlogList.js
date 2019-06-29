import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { initBlogsAction, likeBlogAction } from '../reducers/BlogReducer'
import { newNotificationAction, removeNotificationAction } from '../reducers/NotificationReducer'
import { connect } from 'react-redux'

const BlogList = (props) => {

  const blogs = props.blogs

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const notify = (message, type = 'success') => {
    props.newNotificationAction(message, type)
    setTimeout(() => props.removeNotificationAction(), 10000)
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    props.likeBlogAction(updatedBlog)
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const title = blog.title
    const author = blog.author
    const ok = window.confirm(`remove blog ${title} by ${author}`)
    if (ok) {
      await blogService.remove(blog)
      const blogs = props.blogs
      props.initBlogsAction(blogs.filter(b => b.id !== blog.id))
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
          user={props.user}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  likeBlogAction,
  newNotificationAction,
  removeNotificationAction,
  initBlogsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)