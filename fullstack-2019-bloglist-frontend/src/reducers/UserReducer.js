
// action creators
export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

// the reducer function
const UserReducer = (state = null, action) => {
  if (action.type === 'SET_USER') {
    return action.data
  }
  return state
}

export default UserReducer