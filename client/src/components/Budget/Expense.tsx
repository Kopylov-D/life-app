import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../services/api';
import { addCategory, getBudgetData } from '../../store/ducks/budget/actions';
import { Month } from '../../types';
import { Button } from '../UI';
import Select from '../UI/Select';
import Table from './Table';

type Props = {
	// data: TransactionInterface[];
};

const months: Month[] = [
	{ id: 0, name: 'Январь' },
	{ id: 1, name: 'Февраль' },
	{ id: 2, name: 'Март' },
	{ id: 3, name: 'Апрель' },
	{ id: 4, name: 'Май' },
	{ id: 5, name: 'Июнь' },
	{ id: 6, name: 'Июль' },
	{ id: 7, name: 'Август' },
	{ id: 8, name: 'Сентябрь' },
	{ id: 9, name: 'Октябрь' },
	{ id: 10, name: 'Ноябрь' },
	{ id: 11, name: 'Декабрь' },
];

const years = [2018, 2019, 2020, 2021];

const Expense: React.FC<Props> = props => {
	const [month, setMonth] = useState<number>(new Date().getMonth());
	const [year, setYear] = useState<number>(new Date().getFullYear());

	useEffect(() => {
		dispatch(getBudgetData(year, month));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month]);

	const dispatch = useDispatch();

	const testHandler = async () => {
		const res = await api.getUser();
		console.log(res);
	};

	const addCategoryHandler = async () => {
		dispatch(addCategory());
	};

	const onMonthClickHandler = (id: number) => {
		setMonth(id);
	};

	const onYearClickHandler = (year: number) => {
		setYear(year);
	};

	return (
		<div className="budget__expense">
			<div className="budget__panel">
				<Select
					months={months}
					onItemClick={onMonthClickHandler}
					type="month"
					initialLabel={month}
				/>
				<Select
					years={years}
					onItemClick={onYearClickHandler}
					type="year"
					initialLabel={year}
				/>
			</div>
			<Table />
			<Button type="primary" disabled={false} onClick={addCategoryHandler}>
				+
			</Button>
			<Button type="secondary" disabled={false} onClick={testHandler} />
		</div>
	);
};

export default Expense;
