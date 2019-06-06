const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  const token = req.token

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    if ( blog.user.toString() === user.id.toString() ) {
      const result = await Blog.findByIdAndRemove(req.params.id)
      res.status(204).json(result.toJSON())
    } else {
      return res.status(401).json({
        error: 'invalid access rights'
      })
    }

  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try{
    const body = req.body
    const blog = {
      title: body.title,
      likes: body.likes,
      author: body.author,
      url: body.url,
    }

    const result = await Blog.findByIdAndUpdate(
      req.params.id, blog, { new: true })
    res.json(result.toJSON())
  }catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter