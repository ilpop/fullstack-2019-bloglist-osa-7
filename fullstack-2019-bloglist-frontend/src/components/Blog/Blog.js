import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, likeHandler, deleteHandler, user }) => {

  const [fullView, setFullView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleViewType = () => {
    if(fullView){
      setFullView(false)
    }else{
      setFullView(true)
    }
  }

  const blogAddedByUser = () => {
    // smallish haxx
    return user.name === blog.user.name || user.id === blog.user.id || user.id === blog.user
  }

  return (
    <div style={blogStyle}>
      {fullView === false ?
        <div className='test-short-view-div'>
          <div onClick={() => toggleViewType()} className='test-short-view-clickable-div'>
            {blog.title} {blog.author}
          </div>
        </div>
        :
        <div className='test-full-view-div'>
          <div onClick={() => toggleViewType()} className='test-full-view-clickable-div'>
            {blog.title} {blog.author}
          </div>
          <div><a href={blog.url} target='_blank' rel="noopener noreferrer">{blog.url}</a></div>
          <div>{blog.likes} likes <button onClick={() => likeHandler(blog)}>like</button></div>
          <div>added by {user.name}</div>
          {blogAddedByUser() ?
            <div><button onClick={() => deleteHandler(blog.id)}>remove blog</button></div>
            :
            <div></div>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog