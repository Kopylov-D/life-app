import React, { useEffect, useState } from 'react';
import { Month } from '../../types';
import Button from '../UI/Button';
import Select from '../UI/Select';
import Switch from '../UI/Switch';
import Toggle from '../UI/Toggle';
import YearChanger from './YearChanger';

export const months: Month[] = [
	{ _id: '0', name: 'Январь' },
	{ _id: '1', name: 'Февраль' },
	{ _id: '2', name: 'Март' },
	{ _id: '3', name: 'Апрель' },
	{ _id: '4', name: 'Май' },
	{ _id: '5', name: 'Июнь' },
	{ _id: '6', name: 'Июль' },
	{ _id: '7', name: 'Август' },
	{ _id: '8', name: 'Сентябрь' },
	{ _id: '9', name: 'Октябрь' },
	{ _id: '10', name: 'Ноябрь' },
	{ _id: '11', name: 'Декабрь' },
	{ _id: '', name: 'Весь год' },
];

type Props = {
	startDate: string;
	changeDate(year: string, month: string): void;
};

const DatePanel: React.FC<Props> = ({ startDate, changeDate }) => {
	const currentMonth = new Date().getMonth().toString();
	const [month, setMonth] = useState<string>(currentMonth);
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [allTime, setAllTime] = useState<boolean>(false);

	useEffect(() => {
		changeDate(year.toString(), month);
	}, [month, year]);

	const onMonthClickHandler = (id: string) => {
		setMonth(id);
	};

	const allTimeToggle = () => {
		setAllTime(!allTime);
	};

	return (
		<div className="budget__panel-selectors">
			<Select
				items={months}
				onItemClick={onMonthClickHandler}
				initialId={month}
			/>
			<YearChanger
				startDate={startDate}
				changeYear={year => setYear(year)}
				year={year}
			/>

			<Toggle
        colorLeft="primary"
        textLeft='Все время'
				flag={allTime}
				onSwitch={allTimeToggle}
				type="btn"
			/>
		</div>
	);
};

export default DatePanel;
