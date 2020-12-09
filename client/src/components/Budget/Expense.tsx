import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';
import { addCategory, getBudgetData } from '../../store/ducks/budget/actions';
import { selectCategoriesWithAmount } from '../../store/ducks/budget/selectors';
import { Month } from '../../types';
import { Button } from '../UI';
import Select from '../UI/Select';
import Table from './Table';

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
];

const years = [2018, 2019, 2020, 2021];

const Expense: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const { location } = useHistory();

	const currentMonth = new Date().getMonth().toString();
	const [month, setMonth] = useState<string>(currentMonth);
	const [year, setYear] = useState<string>(new Date().getFullYear().toString());
	const [isExpense, setIsExpense] = useState<boolean>(true);
	const categories = useSelector(selectCategoriesWithAmount)
	// const [month, setMonth] = useState<number>(new Date().getMonth());
	// const [year, setYear] = useState<number>(new Date().getFullYear());



	useEffect(() => {
		dispatch(getBudgetData('2020', month));
		if (location.pathname === '/budget/expense') {
			setIsExpense(true);
		} else {
			setIsExpense(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month, location.pathname]);

	const testHandler = async () => {
		const res = await api.getUser();
		console.log(res);
	};

	const addCategoryHandler = async () => {
		dispatch(addCategory());
	};

	const onMonthClickHandler = (id: string) => {
		setMonth(id);
	};

	// const onYearClickHandler = (year: number) => {
	// 	setYear(year);
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
				{/* <Select
					years={years}
					onItemClick={onYearClickHandler}
					type="year"
					initialLabel={year}
				/> */}
			</div>
			<Table categories={categories}/>
			<Button type="primary" disabled={false} onClick={addCategoryHandler}>
				+
			</Button>
			<Button type="secondary" disabled={false} onClick={testHandler} />
		</div>
	);
};

export default Expense;
