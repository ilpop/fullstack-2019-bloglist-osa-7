import React from 'react'
import { connect } from 'react-redux'


const Notification = ({ notification }) => {

  if (notification === null) {
    return null
  }

  const successStyle = {
    color: 'rgb(72, 187, 72)',
    background: 'lightgrey',
    fontSize: '10',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'rgb(211, 72, 72)',
    background: 'lightgrey',
    fontSize: '15',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={notification.type === 'success' ? successStyle : errorStyle}>
      {notification.message}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification