import React from 'react'
import PropTypes from 'prop-types'
import Texts from '../texts/TextsAndStrings'
import  { inputElementProps } from '../utils'


const LoginForm = ({
  handleLogin,
  usernameField,
  passwordField
}) => {

  return (
    <>
        <h2>{Texts.DISPLAY_TEXT_LOGIN_HEADER}</h2>
        <form onSubmit={handleLogin}>
          <div>
            {Texts.DISPLAY_TEXT_USERNAME}
            <input {...inputElementProps(usernameField)}/>
          </div>
          <div>
            {Texts.DISPLAY_TEXT_PASSWORD}
            <input {...inputElementProps(passwordField)}/>
          </div>
          <button type="submit">{Texts.BUTTON_LABEL_LOGIN}</button>
        </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  usernameField: PropTypes.object.isRequired,
  passwordField: PropTypes.object.isRequired,
}


export default LoginForm
