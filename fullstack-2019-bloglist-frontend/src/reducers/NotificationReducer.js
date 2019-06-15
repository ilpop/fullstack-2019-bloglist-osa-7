
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

export const newNotificationAction = (message, type) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message,
      type
    }
  }
}

export const removeNotificationAction = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      message: null
    }
  }
}

export default NotificationReducer