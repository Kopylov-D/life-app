import React from 'react'

type Props = {
  text: string | null
}

const Toast: React.FC<Props> = (props) => {
  return (
    <div className='toast'>
      {props.text}
    </div>
  )
}

export default Toast
