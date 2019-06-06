import { createStore } from 'redux'

// action creators
export const createErrorNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message: content,
      type: 'error'
    }
  }
}

export const createSuccessNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message: content,
      type: 'success'
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: null
  }
}

// the reducer function
const notificationReducer = (state = null, action) => {
  if (action.type === 'NEW_NOTIFICATION') {
    return action.data
  }
  if (action.type === 'REMOVE_NOTIFICATION') {
    return null
  }
  return state
}

const store = createStore(notificationReducer)

export default store