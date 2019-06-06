import React from 'react'
import PropTypes from 'prop-types'
import  { inputElementProps } from '../utils'


const AddBlogForm  = ({
  handleCreate,
  titleField,
  authorField,
  urlField
}) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input {...inputElementProps(titleField)} />
        </div>
        <div>
          author
          <input {...inputElementProps(authorField)} />
        </div>
        <div>
          url
          <input {...inputElementProps(urlField)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AddBlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  titleField: PropTypes.object.isRequired,
  authorField: PropTypes.object.isRequired,
  urlField: PropTypes.object.isRequired
}


export default AddBlogForm