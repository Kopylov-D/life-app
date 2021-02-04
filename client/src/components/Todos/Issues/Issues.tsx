import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTasks } from '../../../store/ducks/todos/selectors'
import Table from '../../Table'

interface Props {
  
}

const Issues:React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()

  const tasks = useSelector(selectTasks) 


  return (
    <div className="issues">

      <Table class='issues' headerItems={["Статус", 'Задача', 'Приоритет', 'Дата']} >

        {/* {tasks.map} */}




      </Table>
      
    </div>
  )
}

export default Issues
