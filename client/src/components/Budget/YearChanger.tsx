import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { parseToDate } from '../../services/utils/dateUtils';
import { selectIsLoading } from '../../store/ducks/budget/selectors';
import Button from '../UI/Button';

type Props = {
	startDate: string;
	year: number;
	changeYear(year: number): void;
};

const YearChanger: React.FC<Props> = props => {
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const isLoading = useSelector(selectIsLoading);

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
		<div className="year-changer">
			<Button onClick={prevYearHandler} type="count" disabled={isLoading}>
				<span className="material-icons">chevron_left</span>
			</Button>
			<span>{year} </span>
			<Button onClick={nextYearHandler} type="count" disabled={isLoading}>
				<span className="material-icons">chevron_right</span>
			</Button>
		</div>
	);
};

export default YearChanger;
