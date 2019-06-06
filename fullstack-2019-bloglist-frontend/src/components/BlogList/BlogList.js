import React from 'react'
import PropTypes from 'prop-types'
import Blog from '../Blog/Blog'


const BlogList = ({ blogs, likeHandler, deleteHandler, user }) => {

  const sortByLikes = (blogs) => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
  }

  sortByLikes(blogs)

  const renderBlogs = () => blogs.map(blog => (
    <Blog key={blog.id}
      blog={blog}
      likeHandler={likeHandler}
      deleteHandler={deleteHandler}
      user={user}/>
  ))

  return (
    <div className='test-blog-list-div'>
      {renderBlogs()}
    </div>
  )
}

BlogList.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default BlogList

