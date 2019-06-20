
const initialState = null

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return action.data
  default:
    return state
  }
}

export const setUserAction = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const removeUserAction = () => {
  return {
    type: 'REMOVE_USER',
    data: null
  }
}

export default UserReducer