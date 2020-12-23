import React, { useEffect, useState } from 'react'
import { months } from '../../pages/BudgetPage';
import Select from '../UI/Select';
import YearChanger from './YearChanger';

type Props = {
  startDate: string
  changeBudgetData(year: string, month: string): void
}

const Panel: React.FC<Props> = (props) => {
  const currentMonth = new Date().getMonth().toString();
	const [month, setMonth] = useState<string>(currentMonth);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    props.changeBudgetData(year.toString(), month)
  }, [month, year])
  
  const onMonthClickHandler = (id: string) => {
		setMonth(id);
  };
  
  return (
    <div className="budget__panel-selectors">
    <Select
      items={months}
      onItemClick={onMonthClickHandler}
      initialId={month}
    />
    <YearChanger
      startDate={props.startDate}
      changeYear={year => setYear(year)}
      year={year}
    />
  </div>
  )
}

export default Panel
