import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';
import { parseToDate } from '../../services/utils/dateUtils';
import { addCategory, getBudgetData } from '../../store/ducks/budget/actions';
import {
	selectCategoriesWithAmount,
	selectOptions,
} from '../../store/ducks/budget/selectors';
import { Month } from '../../types';
import { Button } from '../UI';
import Select from '../UI/Select';
import Table from './Table';
import YearChanger from './YearChanger';

type Props = {
	// data: TransactionInterface[];
};

const months: Month[] = [
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
	{ _id: '12', name: 'Весь год' },
];

const Expense: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategoriesWithAmount);
	const options = useSelector(selectOptions);

	const currentMonth = new Date().getMonth().toString();
	const [month, setMonth] = useState<string>(currentMonth);
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [isExpense, setIsExpense] = useState<boolean>(true);

	const { location } = useHistory();

	useEffect(() => {
		dispatch(getBudgetData(year.toString(), month));
		if (location.pathname === '/budget/expense') {
			setIsExpense(true);
		} else {
			setIsExpense(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month, location.pathname]);

	const testHandler = async () => {
		const res = await api.test('qweasd21');
		console.log(res);
	};

	const addCategoryHandler = async () => {
		dispatch(addCategory(isExpense));
	};

	const onMonthClickHandler = (id: string) => {
		setMonth(id);
	};

	// const prevYearHandler = () => {
	// 	const minYear = parseToDate(options.startDate).getFullYear();
	// 	let newYear = year - 1;
	// 	newYear >= minYear && setYear(newYear);
	// };

	// const nextYearHandler = () => {
	// 	const maxYear = new Date().getFullYear();
	// 	let newYear = year + 1;
	// 	newYear <= maxYear && setYear(newYear);
	// };



	return (
		<div className="budget__expense">
			<div className="budget__panel">
				<Select
					items={months}
					onItemClick={onMonthClickHandler}
					type="month"
					initialId={month}
				/>
				{/* <div>
					<button onClick={prevYearHandler}></button>
					<span>{year} </span>
					<button onClick={nextYearHandler}></button>
				</div> */}
				<YearChanger startDate={options.startDate} changeYear={(year) => setYear(year)} year={year} />
			</div>
			<Table categories={categories} isExpense={isExpense} />
			<Button type="primary" disabled={false} onClick={addCategoryHandler}>
				+
			</Button>
			<Button type="secondary" disabled={false} onClick={testHandler} />
		</div>
	);
};

export default Expense;
