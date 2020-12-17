import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategories,
	selectCurrentCategory,
	selectOptions,
	selectTransactions,
} from '../../../store/ducks/budget/selectors';
import OperationsTable from './OperationsTable';
import YearChanger from '../YearChanger';

interface Props {
	// transactions: TransactionInterface[];
	// categories: CategoryInterface[]
	// currentCategory: CategoryInterface
}

const Operations: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const [year, setYear] = useState<number>(new Date().getFullYear());

	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const currentCategory = useSelector(selectCurrentCategory);
	const options = useSelector(selectOptions);

	useEffect(() => {
		dispatch(getBudgetData(year.toString(), '12'));
	}, [year]);

	return (
		<div>
			<YearChanger
				startDate={options.startDate}
				changeYear={year => setYear(year)}
				year={year}
			/>
			<OperationsTable
				transactions={transactions}
				categories={categories}
				currentCategory={currentCategory}
				// onDeleteTransaction={onDeleteTransactionHandler}
			/>
		</div>
	);
};

export default Operations;
