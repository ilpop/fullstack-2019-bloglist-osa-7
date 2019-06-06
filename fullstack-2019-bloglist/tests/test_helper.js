const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML on helppoa',
    author: 'Doepsy',
    url: 'Ddoddodod',
    likes: 10
  },
  {
    title: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    author: 'Jepo',
    url: 'dadaadaa',
    likes: 11
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}