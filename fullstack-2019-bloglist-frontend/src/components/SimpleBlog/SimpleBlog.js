import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='test-title-and-author-div'>
      {blog.title} {blog.author}
    </div>
    <div className='test-likes-div'>
      blog has {blog.likes} likes
      <button onClick={onClick} className='test-like-button'>like</button>
    </div>
  </div>
)

export default SimpleBlog