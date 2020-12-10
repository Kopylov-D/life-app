import React, { useEffect, useState } from 'react';
import { parseToDate } from '../../services/utils/dateUtils';

type Props = {
	startDate: string;
	year: number;
	changeYear(year: number): void;
};

const YearChanger: React.FC<Props> = props => {
	const [year, setYear] = useState<number>(new Date().getFullYear());

	useEffect(() => {
		setYear(props.year);
	}, []);

	const prevYearHandler = () => {
		const minYear = parseToDate(props.startDate).getFullYear();
		let newYear = year - 1;
		if (newYear >= minYear) {
			setYear(newYear);
			props.changeYear(newYear);
		}
	};

	const nextYearHandler = () => {
		const maxYear = new Date().getFullYear();
		let newYear = year + 1;
		if (newYear <= maxYear) {
			setYear(newYear);
			props.changeYear(newYear);
		}
	};

	return (
		<div>
			<button onClick={prevYearHandler}></button>
			<span>{year} </span>
			<button onClick={nextYearHandler}></button>
		</div>
	);
};

export default YearChanger;
