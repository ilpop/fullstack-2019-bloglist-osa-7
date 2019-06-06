import React from 'react'
import PropTypes from 'prop-types'


const LogoutForm = ({ handleLogout }) => {

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">kirjaudu ulos</button>
      </form>
    </div>
  )
}

LogoutForm.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default LogoutForm