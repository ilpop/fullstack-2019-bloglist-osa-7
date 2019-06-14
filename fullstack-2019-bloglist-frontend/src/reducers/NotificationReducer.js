
const initialState = {
  message: null
}


const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export default NotificationReducer