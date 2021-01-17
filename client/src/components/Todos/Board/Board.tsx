import React from 'react'
import Card from './Card'

type Props = {

}

export const Board: React.FC<Props> = (props) => {
  return (
    <div className='todos__board'>
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}
