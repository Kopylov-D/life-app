import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategoriesWithAmount,
	selectIsLoading,
	selectOptions,
} from '../../../store/ducks/budget/selectors';
import { Month } from '../../../types';
import { Loader } from '../../UI';
import Select from '../../UI/Select';
import YearChanger from '../YearChanger';
import AccountingTable from './AccountingTable';

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

const Accounting: React.FC = () => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategoriesWithAmount);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	const currentMonth = new Date().getMonth().toString();
	const [month, setMonth] = useState<string>(currentMonth);
	const [year, setYear] = useState<number>(new Date().getFullYear());

	const { location } = useHistory();

	useEffect(() => {
		dispatch(getBudgetData(year.toString(), month));
		// if (location.pathname === '/budget/expense') {
		// 	setIsExpense(true);
		// } else {
		// 	setIsExpense(false);
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month, location.pathname]);

	const onMonthClickHandler = (id: string) => {
		setMonth(id);
	};

	return (
		// <Loader size='normal' type='spinner' />
		<div className="budget__accounting">
			<div className="budget__panel">
				<Select
					items={months}
					onItemClick={onMonthClickHandler}
					type="month"
					initialId={month}
				/>
				<YearChanger
					startDate={options.startDate}
					changeYear={year => setYear(year)}
					year={year}
				/>
				<div className='budget__diagramm'>
					<div className='budget__diagramm-top'></div>
					<div className='budget__diagramm-bottom'></div>
				</div>
			</div>
			{isLoading ? (
				<Loader size="normal" />
			) : (
				<div className="budget__tables">
					<AccountingTable
						categories={categories}
						isExpense={true}
						title="Расходы"
					/>
					<AccountingTable
						categories={categories}
						isExpense={false}
						title="Доходы"
					/>
				</div>
			)}
		</div>
	);
};

export default Accounting;
