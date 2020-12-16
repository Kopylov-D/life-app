import classNames from 'classnames'
import React from 'react'

type Props = {
  onClick():void
  type?: string
}

const Backdrop: React.FC<Props> = ({type, onClick, children}) => {
  return (
    <div className={classNames('backdrop', {[`backdrop-${type}`]: type})} onClick={onClick} >

      {children}
      
    </div>
  )
}

export default Backdrop
