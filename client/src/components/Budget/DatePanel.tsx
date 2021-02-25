import React, { useEffect, useState } from 'react';
import { Month } from '../../types';
import Select from '../UI/Select';
import Toggle from '../UI/Toggle';
import YearChanger from './YearChanger';

export const months: Month[] = [
	{ id: '0', value: 'Январь' },
	{ id: '1', value: 'Февраль' },
	{ id: '2', value: 'Март' },
	{ id: '3', value: 'Апрель' },
	{ id: '4', value: 'Май' },
	{ id: '5', value: 'Июнь' },
	{ id: '6', value: 'Июль' },
	{ id: '7', value: 'Август' },
	{ id: '8', value: 'Сентябрь' },
	{ id: '9', value: 'Октябрь' },
	{ id: '10', value: 'Ноябрь' },
	{ id: '11', value: 'Декабрь' },
];

interface Props {
	startDate: string;
	changeDate(year: string, month: string, all: boolean, fullYear: boolean): void;
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
		<div className="date-panel">
			<Select items={months} onItemClick={onMonthClickHandler} initialId={month} />
			<YearChanger startDate={startDate} changeYear={onChangeYearHandler} year={year} />

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
