
const updateBlog = (updatedBlog, state) => {
  return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
}


export const initBlogsAction = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const addBlogAction = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: blog
  }
}

export const likeBlogAction = (blog) => {
  return {
    type: 'LIKE_BLOG',
    data: blog
  }
}


const BlogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'LIKE_BLOG':
    return updateBlog(action.data, state)
  default:
    return state
  }
}

export default BlogReducer