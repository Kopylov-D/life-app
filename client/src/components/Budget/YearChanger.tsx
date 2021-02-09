import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { parseToDate, toDate } from '../../services/utils/dateUtils';
import { selectIsLoading } from '../../store/ducks/budget/selectors';
import Button from '../UI/Button';
// import shevron from '../../assets/icons/Shevron-down.svg';
import arrow from '../../assets/icons/Arrow-down.svg';
import classNames from 'classnames';
import { toDate } from '../../services/utils/dateUtils';

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
		const minYear = toDate(props.startDate).getFullYear();
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
				<img className={classNames('arrow', 'arrow--left')} src={arrow} alt="" />
			</Button>
			<span>{year} </span>
			<Button onClick={nextYearHandler} type="count" disabled={isLoading}>
				<img className={classNames('arrow', 'arrow--right')} src={arrow} alt="" />
			</Button>
		</div>
	);
};

export default YearChanger;
