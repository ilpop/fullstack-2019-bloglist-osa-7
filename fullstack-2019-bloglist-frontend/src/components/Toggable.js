import React, { useState, useImperativeHandle } from 'react'


// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef ( (props, ref) => {
  // toggablen oma tila
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // make toggleVisibility "public", visible to the outside world using ref
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {/* "Toisin kuin "normaalit" propsit, children on Reactin
            automaattisesti määrittelemä, aina olemassa oleva propsi" */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
)


export default Togglable
