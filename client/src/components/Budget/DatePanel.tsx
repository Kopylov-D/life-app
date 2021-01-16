import React, { useEffect, useState } from 'react';
import { Month } from '../../types';
import Select from '../UI/Select';
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
];

type Props = {
	startDate: string;
	changeDate(
		year: string,
		month: string,
		all: boolean,
		fullYear: boolean
	): void;
};

const DatePanel: React.FC<Props> = ({ startDate, changeDate }) => {
	const currentMonth = new Date().getMonth().toString();
	const [month, setMonth] = useState<string>(currentMonth);
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [allTime, setAllTime] = useState<boolean>(false);
	const [fullYear, setFullYear] = useState<boolean>(false);

	useEffect(() => {
		changeDate(year.toString(), month, allTime, fullYear);
	}, [month, year, allTime, fullYear]);

	const onMonthClickHandler = (id: string) => {
		setAllTime(false);
		setFullYear(false);
		setMonth(id);
	};

	const onChangeYearHandler = (year: number) => {
		setAllTime(false);
		setYear(year);
	};

	const allTimeToggle = () => {
		setFullYear(false);
		setAllTime(!allTime);
	};

	const fullYearToggle = () => {
		setAllTime(false);
		setFullYear(!fullYear);
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
				changeYear={onChangeYearHandler}
				year={year}
			/>

			<Toggle
				type="btn"
				colorPrimary="primary"
				textPrimary="Все время"
				flag={allTime}
				onSwitch={allTimeToggle}
			/>

			<Toggle
				type="btn"
				colorPrimary="primary"
				textPrimary="Весь год"
				flag={fullYear}
				onSwitch={fullYearToggle}
			/>
		</div>
	);
};

export default DatePanel;
