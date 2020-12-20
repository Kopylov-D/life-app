import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategoriesWithAmount,
	selectIsLoading,
	selectOptions,
	// selectSumAmount,
} from '../../../store/ducks/budget/selectors';
import { Month } from '../../../types';
import Loader from '../../UI/Loader';
import Select from '../../UI/Select';
import YearChanger from '../YearChanger';
import AccountingTable from './AccountingTable';
import Proportion from './Proportion';

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
	const { categories, proportion } = useSelector(selectCategoriesWithAmount);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	const currentMonth = new Date().getMonth().toString();
	const [month, setMonth] = useState<string>(currentMonth);
	const [year, setYear] = useState<number>(new Date().getFullYear());

	const { location } = useHistory();

	console.log(proportion);

	useEffect(() => {
		dispatch(getBudgetData(year.toString(), month));

		// if (proportion) {
		// 	const newPercent = (proportion.expense * 100) / proportion.income;
		// 	setPercent(newPercent)
		// }
		// if (location.pathname === '/budget/expense') {
		// 	setIsExpense(true);
		// } else {
		// 	setIsExpense(false);
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month, location.pathname]);

	// const calcSum = () => {
	// 	const fullSum = sum.sumExpense + sum.sumIncome

	// 	const
	// }

	const onMonthClickHandler = (id: string) => {
		setMonth(id);
	};

	return (
		// <Loader size='normal' type='spinner' />
		<div className="budget__accounting">
			<div className="budget__panel">
				<div className="budget__panel-selectors">
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
				</div>
				<Proportion proportion={proportion} />
			</div>
			{isLoading ? (
				<Loader size="small" type='cube-grid' />
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
