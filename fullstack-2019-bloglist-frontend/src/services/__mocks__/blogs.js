



const testUser = {
  _id: '5a437a9e514ab7f168ddf138',
  username: 'xulos',
  name: 'Mix Dinners'
}


const testBlogs = [
  { id: '5ce00f77d35af30fa96bcbaa',
    likes:30,
    title:'Test title 1',
    url:'test url 1',
    author:'Test author 2',
    user: testUser,
    __v:0
  },
  { id: '5ce00f77d35af30fa96bcbee',
    likes:11,
    title:'Test title 2',
    url:'test url 2',
    author:'Test author 2',
    user: testUser,
    __v:0
  },
  { id: '5ce00f77d35af30fa96bcbii',
    likes:300,
    title:'Test title 3',
    url:'test url 3',
    author:'Test author 3',
    user: testUser,
    __v:0
  }
]


const getAll = () => {
  return Promise.resolve(testBlogs)
}


const setToken = () => {
  // just an empty mock
  // return undefined is fine
}

export default { getAll, setToken }