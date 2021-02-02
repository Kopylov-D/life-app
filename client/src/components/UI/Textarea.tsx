import React from 'react'

interface Props {
  value: string
  onChange(e: React.ChangeEvent<HTMLTextAreaElement> ): void
  
}

const Textarea:React.FC<Props> = (props) => {
  return (
    <textarea className='text-area' value={props.value} onChange={e => props.onChange(e)}>
      
    </textarea>
  )
}

export default Textarea
