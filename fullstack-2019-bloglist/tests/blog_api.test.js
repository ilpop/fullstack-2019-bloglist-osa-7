const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

// https://github.com/visionmedia/superagent
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(helper.initialBlogs[0])
  await noteObject.save()

  noteObject = new Blog(helper.initialBlogs[1])
  await noteObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('check the id attribute is id', async () => {
  const blogs = await helper.blogsInDb()
  // https://jestjs.io/docs/en/expect#tobedefined
  expect(blogs[0].id).toBeDefined()
})

test('there is right amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('there is a blog about HTML', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].title).toBe('HTML on helppoa')
})

test('a specific blog is within the returned blogs', async () => {
  const blogs = await helper.blogsInDb()

  const titles = blogs.map(blog => blog.title)

  expect(titles).toContain(
    'HTTP-protokollan tärkeimmät metodit ovat GET ja POST'
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
    author: 'hesus',
    url: 'https://internet',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  const titles = blogs.map(blog => blog.title)
  expect(titles).toContain(
    'async/await yksinkertaistaa asynkronisten funktioiden kutsua'
  )
})

test('likes attribute has value 0 if not given', async () => {
  const newBlog = {
    title: 'How to initialize attributes with default values',
    author: 'Mad Belmond',
    url: 'https://internet'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const addedBlogArr = blogs.filter(blog => blog.title === 'How to initialize attributes with default values')
  expect(addedBlogArr[0].likes).toBe(0)
})

test('400 Bad request received it title and url not given', async () => {
  const newBlog = {
    author: 'Mad Belmond',
    likes: 100000000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})