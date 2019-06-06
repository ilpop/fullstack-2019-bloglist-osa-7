const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const reducer = (sum, blogPost) => {
    return sum + blogPost.likes
  }
  return blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
  let blogWithMostLikes

  if(!blogs || blogs.length === 0){
    return {}
  }

  blogs.forEach(blog => {
    if(!blogWithMostLikes){
      blogWithMostLikes = blog
    }else{
      if(blog.likes > blogWithMostLikes.likes){
        blogWithMostLikes = blog
      }
    }
  })
  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }
}

const mostBlogs = (blogs) => {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  let authors = new Map()

  blogs.forEach(blog => {
    let value = authors.get(blog.author)
    if(value){
      authors.set(blog.author, ++value)
    }else{
      authors.set(blog.author, 1)
    }
  })

  let author
  authors.forEach((value, key) => {
    if(!author){
      author = {
        author: key,
        blogs: value
      }
    } else {
      if(value > author.blogs){
        author = {
          author: key,
          blogs: value
        }
      }
    }
  })
  return author
}

const mostLikes = (blogs) => {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  let authors = new Map()

  blogs.forEach(blog => {
    let value = authors.get(blog.author)
    if(value){
      authors.set(blog.author, (value + blog.likes))
    }else{
      authors.set(blog.author, blog.likes)
    }
  })

  let author
  authors.forEach((value, key) => {
    if(!author){
      author = {
        author: key,
        likes: value
      }
    } else {
      if(value > author.likes){
        author = {
          author: key,
          likes: value
        }
      }
    }
  })
  return author
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}