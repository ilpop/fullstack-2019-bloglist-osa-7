const listHelper = require('../utils/list_helper')

describe('dummy stuff', () => {

  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyBlogList = []

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5cd730474584eb16fd36333c',
      title: 'Services are Not a Silver Bullet',
      author: 'Josh Clayton',
      url: 'https://thoughtbot.com/blog/services-are-not-a-silver-bullet',
      likes: 11,
      __v: 0
    }
  ]


  test('of empty blog list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of bigger list is evaluated right', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(16)
  })
})

describe('favorite blog with most likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyBlogList = []

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5cd730474584eb16fd36333c',
      title: 'Services are Not a Silver Bullet',
      author: 'Josh Clayton',
      url: 'https://thoughtbot.com/blog/services-are-not-a-silver-bullet',
      likes: 11,
      __v: 0
    }
  ]


  test('of empty blog list is empty object', () => {
    const result = listHelper.favoriteBlog(emptyBlogList)
    expect(result).toEqual({})
  })

  test('when list has only one blog is that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of bigger list is the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    expect(result).toEqual({
      title: 'Services are Not a Silver Bullet',
      author: 'Josh Clayton',
      likes: 11
    })
  })
})

describe('author with most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyBlogList = []

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5cd730474584eb16fd36333c',
      title: 'Services are Not a Silver Bullet',
      author: 'Josh Clayton',
      url: 'https://thoughtbot.com/blog/services-are-not-a-silver-bullet',
      likes: 11,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
  ]


  test('of empty blog list is undefined', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    expect(result).toEqual(undefined)
  })

  test('when list has only one blog is blog\'s author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of bigger list is the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})


describe('author with most likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyBlogList = []

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5cd730474584eb16fd36333c',
      title: 'Services are Not a Silver Bullet',
      author: 'Josh Clayton',
      url: 'https://thoughtbot.com/blog/services-are-not-a-silver-bullet',
      likes: 11,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
  ]


  test('of empty blog list is undefined', () => {
    const result = listHelper.mostLikes(emptyBlogList)
    expect(result).toEqual(undefined)
  })

  test('when list has only one blog is the author of the blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of bigger list is the author with most likes', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    expect(result).toEqual({
      author: 'Josh Clayton',
      likes: 11
    })
  })
})
