

// action creators
export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs
  }
}

// not used
export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: blog
  }
}

// not used
export const removeBlog = () => {
  return {
    type: 'REMOVE_BLOG',
    data: null
  }
}

// the reducer function
const BlogReducer = (state = [], action) => {

  if (action.type === 'SET_BLOGS') {
    return action.data
  }

  if (action.type === 'ADD_BLOG') {
    // return state.concat(action.data)
    return [...state, action.data]
  }
  if (action.type === 'REMOVE_BLOG') {
    return  state.filter(blog => blog.id !== action.data.id)
  }
  return state
}


export default BlogReducer