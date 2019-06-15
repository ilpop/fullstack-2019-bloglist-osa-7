
const updateBlog = (updatedBlog, state) => {
  return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
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