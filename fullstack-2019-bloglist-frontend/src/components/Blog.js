import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, user }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogAddedByUser = () => {
    return user.name === blog.user.name //|| user.id === blog.user.id || user.id === blog.user
  }

  const details = () => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blogAddedByUser() &&(<button onClick={() => remove(blog)}>remove </button>)}
    </div>
  )



  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)} className='name'>
        {blog.title} {blog.author}
      </div>
      {expanded && details()}
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog